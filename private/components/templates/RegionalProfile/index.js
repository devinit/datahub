// @flow
import React, {Component} from 'react';
import { Div, P, H4, Span} from 'glamorous';
import { Container, Grid, Icon, Button, Dropdown, Segment, Header} from 'semantic-ui-react';
import { red, white } from 'components/theme/semantic';
import { SectionHeader, Lead } from 'components/atoms/Header';
import { BodyLink } from 'components/atoms/Link';
import { DarkBg } from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountrySearch from 'components/organisms/CountrySearchInput';
import SpotLightTabs from 'components/organisms/SpotLightTabs';
import { CardContainer, ProfileHeader } from 'components/atoms/Container';
import {getDistrict, getCountry, createCurrencyOptions} from 'lib/utils';
import type {CurrencyOption} from 'lib/utils';
import Link from 'next/link';
import { connect } from 'react-redux';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { State as ReduxState } from 'lib/reducers';
import dynamic from 'next/dynamic';
import Generic from '../Generic';
import data from './data';
/* eslint-disable react/no-danger */
/* eslint-disable max-len */

const DynamicMapComponent = dynamic(
  import('components/molecules/SmallMap'), {
    ssr: false,
    loading: () => (<p>Loading...</p>)
  });

const DynamicRegionalLowerTabs = dynamic(
  import('components/organisms/LocalGovernmentFinance'), { ssr: false });

type Props = {
  id: string,
  rehydrated?: boolean, // TODO: use this for client caching
  country: string,
  currencyCode: string,
  currencyUSD: string,
  state?: StateToShare,
};

type State = {
  district: District,
  currency: string,
  country: Country,
  currencyOptions: CurrencyOption[]
}
class RegionalProfile extends Component {
  static init(props): State {
    const district = getDistrict(props.id, props.country);
    const country = getCountry(props.country);
    const currencyOptions = createCurrencyOptions(props.currencyCode, props.currencyUSD);
    return {district, country, currencyOptions, currency: currencyOptions[0].value};
  }
  constructor(props: Props) {
    super(props);
    this.state = RegionalProfile.init(props);
  }
  state: State
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState(RegionalProfile.init(nextProps));
  }
  onChangeCurrency = (currency: string) => this.setState({currency});

  lowerTabs: HTMLElement

  render() {
    return (<Generic>
      <ProfileHeader>
        <DynamicMapComponent
          slug={this.state.district.slug}
          spotlightCountry={this.state.country.slug}
        />
        <Div width="100%" position="absolute" top="0">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <CardContainer>
                    <H4 color={red}>
                      <Icon name="globe" color={'red'} />
                      <Link href="/spotlight-on-uganda">
                        <a role="link" style={{color: red}}>Spotlight on uganda</a>
                      </Link>
                    </H4>
                    <CountrySearch visible placeholder={this.props.id} profile country="uganda" />
                    <Lead>
                      Explore this in-depth profile to find out about poverty, population, education, health, water,
                      sanitation and hygiene, and district public resources in {this.state.district.name}.
                      <Span fontWeight={500} lineHeight="3" fontSize="0.7em" display="block">
                          Visit the {' '}
                        <BodyLink href={`/country/${this.state.country.slug}`}>
                          {this.state.country.name} country Profile
                        </BodyLink>
                        {' '}to explore national-level data.
                      </Span>
                    </Lead>
                    <P fontWeight={500} fontSize="1.2em" lineHeight="0">View all financial data in: </P>
                    <Dropdown
                      compact
                      selection
                      value={this.state.currency}
                      options={this.state.currencyOptions}
                      onChange={(e, data) => this.onChangeCurrency(data.value)}
                    />
                    {process.browser ?
                      <Div marginTop={'1.5em'}>
                        <a href={`http://www.facebook.com/share.php?u=${window.location.href}`}>
                          <Button icon="facebook f" />
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"`}
                        >
                          <Button icon="twitter" />
                        </a>
                        <a href={`https://plus.google.com/share?url=${window.location.href}`}>
                          <Button icon="google plus" />
                        </a>
                        <a
                          href={`mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives: Uganda — ${window.location.href}`}
                        >
                          <Button icon="mail outline" />
                        </a>
                      </Div>
                      : ''
                    }
                  </CardContainer>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Div>
      </ProfileHeader>
      <SpotLightTabs id={this.state.district.slug} country={this.state.country.slug} />
      <Div paddingTop={'4em'} paddingBottom={'1em'}>
        <Container textAlign="center">
          <Segment basic ref={node => { this.lowerTabs = node; }}>
            <Header>
              <Header.Content as="h2">Revenue</Header.Content>
            </Header>
          </Segment>
        </Container>
      </Div>
      <DynamicRegionalLowerTabs
        id={this.props.id}
        currency={this.state.currency}
        country={this.state.country.slug}
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

const mapStateToProps = ({ app: { rehydrated } }: ReduxState) => ({ rehydrated });
const ProfileWithRedux = connect(mapStateToProps)(RegionalProfile);

export default ProfileWithRedux;
