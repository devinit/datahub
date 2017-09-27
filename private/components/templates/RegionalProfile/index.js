// @flow
import React, {Component} from 'react';
import { Div, Hr} from 'glamorous';
import { Container, Header} from 'semantic-ui-react';
import { lighterGrey } from 'components/theme/semantic';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import SpotLightTabs from 'components/organisms/SpotLightTabs';
import ProfileHeader from 'components/molecules/ProfileHeader';
import {getDistrict, getCountry, createCurrencyOptions} from 'lib/utils';
import type {CurrencyOption} from 'lib/utils';
import { connect } from 'react-redux';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { State as ReduxState } from 'lib/reducers';
import dynamic from 'next/dynamic';
import Generic from '../Generic';
import data from './data';

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

  onChangeCurrency(currency: string) {
    this.setState({currency});
  }

  lowerTabs: HTMLElement

  render() {
    return (
      <Generic pathname={`/${this.state.country.slug}`} query={this.state.district.slug}>
        <ProfileHeader
          currency={this.state.currency}
          currencyOptions={this.state.currencyOptions}
          entity={this.state.district}
          spotlightCountry={this.state.country}
          onChangeCurrency={(currency) => this.onChangeCurrency(currency)}
        />
        <SpotLightTabs
          id={this.state.district.slug}
          currency={this.state.currency}
          country={this.state.country.slug}
        />
        <Div paddingTop={'4em'} paddingBottom={'1em'}>
          <Container textAlign="center">
            <Header ref={node => { this.lowerTabs = node; }} >
              <Header.Content as="h2">Revenue and Expenditure</Header.Content>
            </Header>
            <Hr borderTop={`2px solid ${lighterGrey}`} />
          </Container>
        </Div>
        {process.env.NODE_ENV !== 'test' ?
          <DynamicRegionalLowerTabs
            id={this.props.id}
            currency={this.state.currency}
            country={this.state.country.slug}
            {...this.props.state}
          /> : ''
        }
        <ProfileDataSourceTable data={data.dataSources} />
      </Generic>);
  }
}

const mapStateToProps = ({ app: { rehydrated } }: ReduxState) => ({ rehydrated });
const ProfileWithRedux = connect(mapStateToProps)(RegionalProfile);

export default ProfileWithRedux;
