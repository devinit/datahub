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
import { PrintProfileHeader } from '../../molecules/CountryProfilePrint/PrintProfileHeader';
import { SectionOne } from '../../molecules/CountryProfilePrint/SectionOne';
interface Props {
  id?: string;
  rehydrated?: boolean;
  state?: StateToShare;
}

class CountryProfilePrint extends React.Component<Props> {
  render() {
    return (
      <ContentWrapper>
        <div>
          <URLWrapper>
            <CountryProfileLink href="http://data.devinit.org/country/canada">
              <CountryProfileLinkText>Canada profile on the Development Data Hub:</CountryProfileLinkText>
              <CountryProfileLinkDescription>http://data.devinit.org/country/canada</CountryProfileLinkDescription>
            </CountryProfileLink>
          </URLWrapper>
          <PageTable>
            <tbody>
              <PrintProfileHeader/>
              <SectionOne/>
            </tbody>
          </PageTable>
        </div>
      </ContentWrapper>
    );
  }
}

export default CountryProfilePrint;
