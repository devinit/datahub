import * as React from 'react';
import { Div, Hr} from 'glamorous';
import { Container, Header} from 'semantic-ui-react';
import { lighterGrey } from '@devinit/dh-ui/lib/theme/semantic';
import ProfileDataSourceTable from '@devinit/dh-ui/lib/molecules/ProfileDataSourceTable';
import SpotLightTabs from '../../organisms/SpotLightTabs';
import ProfileHeader from '@devinit/dh-ui/lib/molecules/ProfileHeader';
import {createCurrencyOptions} from '@devinit/dh-base/lib/utils';
import {CurrencyOption} from '@devinit/dh-base/lib/utils';
import {Country, District} from '@devinit/dh-base/lib/types';
import {getDistrict, getCountry} from '../../../utils';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import methodologyDataUg from '../../organisms/Methodology/spotlight-uganda';
import methodologyDataKe from '../../organisms/Methodology/spotlight-kenya';
import CountrySearch from '../../organisms/CountrySearchInput';
import dynamic from 'next/dynamic';
import Generic from '../Generic';

const DynamicRegionalLowerTabs = dynamic(
  import('../../organisms/LocalGovernmentFinance'), { ssr: true });

interface Props  {
  id: string;
  rehydrated?: boolean; // TODO: use this for client caching
  country: string;
  currencyCode: string;
  currencyUSD: string;
  state?: StateToShare;
}

interface State  {
  district: District;
  currency: string;
  country: Country;
  currencyOptions: CurrencyOption[];
}
export default class RegionalProfile extends React.Component<Props, State> {
  public static init(props): State {
    const district = getDistrict(props.id, props.country);
    const country: Country = getCountry(props.country);
    const currencyOptions = createCurrencyOptions(props.currencyCode, props.currencyUSD);
    return {district, country, currencyOptions, currency: currencyOptions[0].value};
  }
  constructor(props) {
    super(props);
    this.state = RegionalProfile.init(props);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState(RegionalProfile.init(nextProps));
  }

  public onChangeCurrency(currency: string) {
    this.setState({currency});
  }

  public render() {
    const methodology = this.state.country.slug === 'kenya' ?
      methodologyDataKe.methodology : methodologyDataUg.methodology;
    return (
      <Generic pathname={`/${this.state.country.slug}`} query={this.state.district.slug}>
        <ProfileHeader
          currency={this.state.currency}
          countrySearch={CountrySearch}
          currencyOptions={this.state.currencyOptions}
          entity={this.state.district}
          spotlightCountry={this.state.country}
          onChangeCurrency={this.onChangeCurrency}
        />
        <SpotLightTabs
          id={this.state.district.slug || ''}
          currency={this.state.currency || ''}
          country={this.state.country.slug}
        />
        <Div paddingTop={'4em'} paddingBottom={'1em'}>
          <Container textAlign="center">
            <Header>
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
        <ProfileDataSourceTable data={methodology} noDownloads />
      </Generic>);
  }
}
