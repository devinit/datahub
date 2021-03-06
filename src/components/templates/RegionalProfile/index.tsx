import { StateToShare } from '../../molecules/ChartShare';
import { Div, Hr } from 'glamorous';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { CurrencyOption, createCurrencyOptions, getCountry, getDistrict } from '../../../utils';
import methodologyDataKe from '../../MethodologyData/spotlight-kenya';
import methodologyDataUg from '../../MethodologyData/spotlight-uganda';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';
import ProfileDataSourceTable from '../../molecules/ProfileDataSourceTable';
import ProfileHeader from '../../molecules/ProfileHeader';
import { QueryVarTs } from '../../organisms/LocalGovernmentFinance';
import SpotLightTabs from '../../organisms/SpotLightTabs';
import { lighterGrey } from '../../theme/semantic';
import { Country, District } from '../../types';
import Generic from '../Generic';

const dynamicOpts: DynamicOptions<any, QueryVarTs> = {
  ssr: true,
  loading: () => <LoadingIndicator height={ '600px' }/>,
  modules: () => ({
    LocalGovernmentFinance: import('../../organisms/LocalGovernmentFinance') as Promise<any>
    }),
  render: (props, { LocalGovernmentFinance }) => <LocalGovernmentFinance { ...props } />
};

const DynamicRegionalLowerTabs = dynamic(dynamicOpts as any) as any;

interface Props {
  id: string;
  rehydrated?: boolean; // TODO: use this for client caching
  country: string;
  currencyCode: string; // TODO: get from a data file
  currencyUSD: string;
  supportLocalCurrencyOnly: boolean;
  state?: StateToShare;
}

interface State {
  district: District;
  currency: string;
  country: Country;
  currencyOptions: CurrencyOption[];
}
export default class RegionalProfile extends React.Component<Props, State> {
  static init(props): State {
    const district = getDistrict(props.id, props.country);
    const country: Country = getCountry(props.country);
    const currencyOptions = createCurrencyOptions(
      props.currencyCode,
      props.currencyUSD,
      props.supportLocalCurrencyOnly
    );

    return { district, country, currencyOptions, currency: currencyOptions[0].value };
  }

  constructor(props) {
    super(props);

    this.state = RegionalProfile.init(props);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
  }

  render() {
    const methodology = this.state.country.slug === 'kenya'
      ? methodologyDataKe.methodology
      : methodologyDataUg.methodology;

    return (
      <Generic>
        { this.renderProfileHeader() }
        <SpotLightTabs
          id={ this.state.district.slug || '' }
          currency={ this.state.currency || '' }
          country={ this.state.country.slug }
        />
        <Div paddingTop={ '4em' } paddingBottom={ '1em' }>
          <Container textAlign="center">
            <Header>
              <Header.Content as="h2">Revenue and Expenditure</Header.Content>
            </Header>
            <Hr borderTop={ `2px solid ${lighterGrey}` } />
          </Container>
        </Div>
        { this.renderDynamicRegionalTabs() }
        <ProfileDataSourceTable data={ methodology } noDownloads />
      </Generic>);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) { this.setState(RegionalProfile.init(nextProps)); }
  }

  private renderProfileHeader() {
    if (process.env.NODE_ENV !== 'test') {
      return (
        <ProfileHeader
          currency={ this.state.currency }
          router={ Router }
          nextLink={ Link }
          currencyOptions={ this.state.currencyOptions }
          entity={ this.state.district }
          spotlightCountry={ this.state.country }
          onChangeCurrency={ this.onChangeCurrency }
        />
      );
    }

    return '';
  }

  private renderDynamicRegionalTabs() {
    if (process.env.NODE_ENV !== 'test') {
      return (
        <DynamicRegionalLowerTabs
          id={ this.props.id }
          country={ this.state.country.slug }
          { ...this.props.state }
        />
      );
    }

    return '';
  }

  private onChangeCurrency(currency: string) {
    this.setState({ currency });
  }
}
