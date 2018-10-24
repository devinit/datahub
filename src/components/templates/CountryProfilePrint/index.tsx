import * as React from 'react';
import {
  ContentWrapper,
  CountryProfileLink,
  CountryProfileLinkDescription,
  CountryProfileLinkText,
  PageTable,
  URLWrapper
} from '../../atoms/CountryProfilePrint';
import { StateToShare } from '../../molecules/ChartShare';
import PrintProfileHeader from '../../molecules/CountryProfilePrint/PrintProfileHeader';
import { SectionOne } from '../../molecules/CountryProfilePrint/SectionOne';
import { Country } from '../../types';
interface Props {
  id?: string;
  country: Country;
  rehydrated?: boolean;
  state?: StateToShare;
}

class CountryProfilePrint extends React.Component<Props> {
  render() {
    const { name, slug } = this.props.country;

    return (
      <ContentWrapper>
        <div>
          <URLWrapper>
            <CountryProfileLink href={ `http://data.devinit.org/country/${slug}` }>
              <CountryProfileLinkText>{ name } profile on the Development Data Hub:</CountryProfileLinkText>
              <CountryProfileLinkDescription>http://data.devinit.org/country/{ slug }</CountryProfileLinkDescription>
            </CountryProfileLink>
          </URLWrapper>
          <PageTable>
            <tbody>
              <PrintProfileHeader id={ slug } country={ this.props.country }/>
              <SectionOne/>
            </tbody>
          </PageTable>
        </div>
      </ContentWrapper>
    );
  }
}

export default CountryProfilePrint;
