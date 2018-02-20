import * as React from 'react';
import { Div, Img} from 'glamorous';
import { Container } from 'semantic-ui-react';
import { red, white } from '@devinit/dh-ui/lib/theme/semantic';
import { SectionHeader } from '@devinit/dh-ui/lib/atoms/Header';
import { DarkBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import ProfileDataSourceTable from '@devinit/dh-ui/lib/molecules/ProfileDataSourceTable';
import CountryProfileTopTabs from '../../organisms/CountryProfileTabs';
import {Props as CLProps} from '../../organisms/CountryProfileLowerTabs';
import ProfileHeader from '@devinit/dh-ui/lib/molecules/ProfileHeader';
import {getCountry} from '@devinit/dh-base/lib/utils';
import CountrySearch from '../../organisms/CountrySearchInput';
import { GOVERNMENT_FINANCE_LOWER } from '@devinit/dh-base/lib/utils/constants';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import dynamic from 'next/dynamic';
import methodologyData from '../../organisms/Methodology/country-profile';
import {Country} from '@devinit/dh-base/lib/types';
import Generic from '../Generic';

const DynamicCountryProfileLowerTabs = dynamic<{}, CLProps>(
  import('../../organisms/CountryProfileLowerTabs') as Promise<any>, { ssr: true });

interface Props  {
  id: string;
  rehydrated?: boolean;
  state?: StateToShare;
}

export default class Profile extends React.Component<Props> {
  public static init(props) {
    const country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId &&
      props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;
    return {selectedTab, country};
  }
  public state: {
    selectedTab: number,
    country: Country
  };
  public lowerTabs: HTMLElement;
  constructor(props: Props) {
    super(props);
    this.state = Profile.init(props);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState(Profile.init(nextProps));
  }

  public jumpToSection = (sectionId: string) => {
    const selectedTab = sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1;
    this.setState({selectedTab});
    if (this.lowerTabs) this.lowerTabs.scrollIntoView();
  }
  public setLowerTabs = (node) => {
    this.lowerTabs = node;
  }
  public render() {
    return (
      <Generic pathname="/country" query={this.props.id}>
        <ProfileHeader
          entity={this.state.country}
          countrySearch={CountrySearch}
          jumpToSection={this.jumpToSection}
        />
        <CountryProfileTopTabs id={this.props.id} />
        <Div paddingTop={'4em'} paddingBottom={'4em'}>
          <Container textAlign="center">
            <SectionHeader innerRef={this.setLowerTabs}>
              <Img
                width="32px"
                verticalAlign="middle"
                src={`/flags/svg/${this.state.country.id}.svg`}
              /> EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
            </SectionHeader>
          </Container>
        </Div>
        {process.env.NODE_ENV !== 'test' ?
          <DynamicCountryProfileLowerTabs
            id={this.props.id}
            selectedTab={this.state.selectedTab}
            {...this.props.state}
          /> : ''}
        <DarkBg>
          <SectionHeader color={red} fontColor={white}>
          MORE FROM DI ON {this.state.country.name && this.state.country.name.toUpperCase()}
          </SectionHeader>
        </DarkBg>
        <ProfileDataSourceTable data={methodologyData.methodology} />
      </Generic>);
  }
}
