// @flow
import React, {Component} from 'react';
import { Div, Img} from 'glamorous';
import { Container } from 'semantic-ui-react';
import { red, white } from 'components/theme/semantic';
import { SectionHeader } from 'components/atoms/Header';
import { DarkBg } from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountryProfileTopTabs from 'components/organisms/CountryProfileTabs';
import ProfileHeader from 'components/molecules/ProfileHeader';
import {getCountry} from 'lib/utils';
import { connect } from 'react-redux';
import { GOVERNMENT_FINANCE_LOWER } from 'lib/utils/constants';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { State } from 'lib/reducers';
import dynamic from 'next/dynamic';
import Generic from '../Generic';
import data from './data';
/* eslint-disable max-len */

const DynamicCountryProfileLowerTabs = dynamic(
  import('components/organisms/CountryProfileLowerTabs'), { ssr: false });

type Props = {
  id: string,
  rehydrated?: boolean,
  state?: StateToShare,
};
class Profile extends Component {
  static init(props) {
    const country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId &&
      props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;
    return {selectedTab, country};
  }
  constructor(props: Props) {
    super(props);
    this.state = Profile.init(props);
  }

  state: {
    selectedTab: number,
    country: Country
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState(Profile.init(nextProps));
  }
  lowerTabs: HTMLElement

  jumpToSection = (sectionId: string) => {
    const selectedTab = sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1;
    this.setState({selectedTab});
    if (this.lowerTabs) this.lowerTabs.scrollIntoView();
  }
  render() {
    return (
      <Generic pathname="/country" query={this.props.id}>
        <ProfileHeader
          entity={this.state.country}
          jumpToSection={(sectionId) => this.jumpToSection(sectionId)}
        />
        <CountryProfileTopTabs id={this.props.id} />
        <Div paddingTop={'4em'} paddingBottom={'4em'}>
          <Container textAlign="center">
            <SectionHeader innerRef={node => { this.lowerTabs = node; }}>
              <Img
                width="32px"
                verticalAlign="middle"
                src={`/flags/svg/${this.state.country.id}.svg`}
              /> EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
            </SectionHeader>
          </Container>
        </Div>
        <DynamicCountryProfileLowerTabs
          id={this.props.id}
          selectedTab={this.state.selectedTab}
          {...this.props.state}
        />
        <DarkBg>
          <SectionHeader color={red} fontColor={white}>
          MORE FROM DI ON {this.state.country.name && this.state.country.name.toUpperCase()}
          </SectionHeader>
        </DarkBg>
        <ProfileDataSourceTable data={data.dataSources} />
      </Generic>);
  }
}

const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });
const ProfileWithRedux = connect(mapStateToProps)(Profile);

export default ProfileWithRedux;
