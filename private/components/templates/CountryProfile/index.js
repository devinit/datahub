// @flow
import React, {Component} from 'react';
import { Div, A, Span, H4, Img} from 'glamorous';
import { Container, Grid, Icon, Button } from 'semantic-ui-react';
import { red, white } from 'components/theme/semantic';
import { SectionHeader, Lead } from 'components/atoms/Header';
import { DarkBg } from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountrySearch from 'components/organisms/CountrySearchInput';
import CountryProfileTopTabs from 'components/organisms/CountryProfileTabs';
import { CardContainer, ProfileHeader } from 'components/atoms/Container';
import NoSSR from 'react-no-ssr';
import SmallMap from 'components/molecules/SmallMap';
import CountryProfileLowerTabs from 'components/organisms/CountryProfileLowerTabs';
import LoadingPlaceholder from 'components/molecules/LoadingPlaceholder';
import {getCountry} from 'lib/utils';
import { connect } from 'react-redux';
import {RECIPIENT, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS} from 'lib/utils/constants';
import type {StateToShare} from 'components/molecules/ChartShare';
import {small} from 'components/theme';
import type { State } from 'lib/reducers';
import Generic from '../Generic';
import data from './data';
/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */
type Props = {
  id: string,
  rehydrated: boolean,
  state: StateToShare,
};
class Profile extends Component {
  constructor(props: Props) {
    super(props);
    this.country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId && props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;
    this.state = {selectedTab};
  }
  state: {
    selectedTab: number,
  }
  country: Country
  countryId: string
  countryName: string
  lowerTabs: HTMLElement
  jumpToSection = (sectionId: string) => {
    const selectedTab = sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1;
    console.log('lower tabs', this.lowerTabs);
    this.setState({selectedTab});
    if (this.lowerTabs) this.lowerTabs.scrollIntoView();
  }
  render() {
    return (<Generic>
      <ProfileHeader>
        <SmallMap slug={this.props.id} />
        <Div width="100%" position="absolute" top="0">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <CardContainer>
                    <H4 color={red}>
                      <Icon name="globe" color={'red'} />General Picture
                    </H4>
                    <CountrySearch visible placeholder={this.props.id} profile />
                    <Lead>
                      {this.country.countryType === RECIPIENT ?
                        `Explore this in-depth profile of ${this.country.name} to find out overall levels of poverty,
                        income distribution, division of wealth and more. Discover how national and
                        sub-national revenue is generated.` :
                        `Explore this in-depth profile of ${this.country.name} to see the international resources it directs to developing countries.
                        Get an overview of government spending, population and income distribution.`
                      }
                      <Img marginLeft="10px" width="32px" src={`/flags/svg/${this.country.id}.svg`} />
                      {this.country.slug === 'uganda' ?
                        <Span fontSize={small} display={'inline-block'} fontWeight={500} >
                          Visit our new <A color={red} href="/spotlight-on-uganda">
                            Spotlight on Uganda</A> to explore data by district.</Span> : ''
                      }
                    </Lead>
                    <Span>
                      Jump to {
                        this.country.countryType === RECIPIENT ?
                          <span>
                            <A
                              onClick={() => this.jumpToSection(GOVERNMENT_FINANCE_LOWER)}
                              color={red}
                            >governement finance </A> or </span> : ''
                      }
                      <A
                        color={red}
                        onClick={() => this.jumpToSection(INFLOWS_VS_OUTFLOWS)}
                      >International resources</A>
                    </Span>
                    <Div marginTop={'1.5em'}>
                      <Button icon="facebook f" />
                      <Button icon="twitter" />
                      <Button icon="google plus" />
                      <Button icon="mail outline" />
                      <Button size="medium"><Span fontWeight={500}>Download and Print</Span></Button>
                    </Div>
                  </CardContainer>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Div>
      </ProfileHeader>
      <CountryProfileTopTabs id={this.props.id} />
      <Div paddingTop={'4em'} paddingBottom={'4em'}>
        <Container textAlign="center">
          <SectionHeader innerRef={node => { this.lowerTabs = node; }}>
            EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
          </SectionHeader>
        </Container>
      </Div>
      <NoSSR onSSR={<LoadingPlaceholder height="40em" loading />} >
        <CountryProfileLowerTabs
          id={this.props.id}
          selectedTab={this.state.selectedTab}
          {...this.props.state}
        />
      </NoSSR>
      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          MORE FROM DI ON {this.country.name && this.country.name.toUpperCase()}
        </SectionHeader>
      </DarkBg>
      <ProfileDataSourceTable data={data.dataSources} />
    </Generic>);
  }
}

const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });
const ProfileWithRedux = connect(mapStateToProps)(Profile);

export default ProfileWithRedux;
