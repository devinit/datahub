import { Div, Img } from 'glamorous';
import dynamic, { DynamicOptions } from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { getCountry } from '../../../utils';
import { GOVERNMENT_FINANCE_LOWER } from '../../../utils/constants';
import { DarkBg } from '../../atoms/Container';
import { SectionHeader } from '../../atoms/Header';
import methodologyData from '../../MethodologyData/country-profile';
import { StateToShare } from '../../molecules/ChartShare';
import ProfileDataSourceTable from '../../molecules/ProfileDataSourceTable';
import ProfileHeader from '../../molecules/ProfileHeader';
import CountryProfileTopTabs from '../../organisms/CountryProfileTabs';
import { red, white } from '../../theme/semantic';
import { Country } from '../../types';
import Generic from '../Generic';

// TODO: the dynamic types are a pain to work with, need to get improved submit PR
const dynamicOpts: DynamicOptions<any, any> = {
  ssr: true,
  loading: () => <p>Loading...</p>,
  modules: () => ({
    CountryProfileLowerTabs: import('../../organisms/CountryProfileLowerTabs') as Promise<any>
  }),
  render: (props, { CountryProfileLowerTabs }) => <CountryProfileLowerTabs { ...props } />
};

const DynamicCountryProfileLowerTabs = dynamic(dynamicOpts as any) as any;

interface Props {
  id: string;
  rehydrated?: boolean;
  state?: StateToShare;
}

interface ProfileState {
  selectedTab: number;
  country: Country;
}

export default class Profile extends React.Component<Props, ProfileState> {
  lowerTabs: HTMLElement;

  static getStateFromProps(props: Props) {
    const country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId && props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;

    return { selectedTab, country };
  }

  constructor(props: Props) {
    super(props);

    this.state = Profile.getStateFromProps(props);
    this.jumpToSection = this.jumpToSection.bind(this);
    this.setLowerTabs = this.setLowerTabs.bind(this);
  }

  render() {
    return (
      <Generic>
        { this.renderProfileHeader() }
        <CountryProfileTopTabs id={ this.props.id } />
        <Div paddingTop={ '4em' } paddingBottom={ '4em' }>
          <Container textAlign="center">
            <SectionHeader innerRef={ this.setLowerTabs }>
              <Img
                width="32px"
                verticalAlign="middle"
                src={ `/flags/svg/${this.state.country.id}.svg` }
              />{ ' ' }
              EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
            </SectionHeader>
          </Container>
        </Div>
        { this.renderDynamicCountryProfileLowerTabs() }
        <DarkBg>
          <SectionHeader color={ red } fontColor={ white }>
          MORE FROM DI ON { this.state.country.name && this.state.country.name.toUpperCase() }
          </SectionHeader>
        </DarkBg>
        <ProfileDataSourceTable data={ methodologyData.methodology } />
      </Generic>);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) { this.setState(Profile.getStateFromProps(nextProps)); }
  }

  private renderProfileHeader(): React.ReactNode {
    if (process.env.NODE_ENV !== 'test') {
      return (
        <ProfileHeader
          entity={ this.state.country }
          router={ Router }
          nextLink={ Link }
          jumpToSection={ this.jumpToSection }
        />
      );
    }

    return null;
  }

  private renderDynamicCountryProfileLowerTabs(): React.ReactNode {
    if (process.env.NODE_ENV !== 'test') {
      return (
          <DynamicCountryProfileLowerTabs
            id={ this.props.id }
            selectedTab={ this.state.selectedTab }
            { ...this.props.state }
          />
      );
    }

    return null;
  }

  private jumpToSection = (sectionId: string) => {
    this.setState({ selectedTab: sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1 });
    if (this.lowerTabs) { this.lowerTabs.scrollIntoView(); }
  }

  private setLowerTabs = (node) => {
    this.lowerTabs = node;
  }
}
