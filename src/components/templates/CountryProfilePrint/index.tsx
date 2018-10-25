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
import { SectionOne, SectionOneProps } from '../../molecules/CountryProfilePrint/SectionOne';
import { Country } from '../../types';
import { PRINT_PAGE_QUERY, PrintPageQuery, PrintPageQueryVariables } from '../../molecules/CountryProfilePrint/graphql';
import { ChildProps, graphql } from 'react-apollo';

type QLPrintPageProps = ChildProps<PrintPageQueryVariables, PrintPageQuery>;
interface Props extends QLPrintPageProps {
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
              <PrintProfileHeader country={ this.props.country } printNarratives={ this.getPrintNarratives() }/>
              <SectionOne { ...this.getSectionOneProps() }/>
            </tbody>
          </PageTable>
        </div>
      </ContentWrapper>
    );
  }

  private getPrintNarratives() {
    if (this.props.data) {
      const { printNarratives } = this.props.data;

      return printNarratives || [];
    }

    return [];
  }

  private getSectionOneProps(): SectionOneProps {
    if (this.props.data) {
      const { overviewTab, populationTab, povertyTab } = this.props.data;

      return {
        poorestPeople: overviewTab && overviewTab.poorestPeople ? overviewTab.poorestPeople.value : undefined,
        population: populationTab && populationTab.population ? populationTab.population.value : undefined,
        domesticResources: overviewTab && overviewTab.domesticResources
          ? `US$ ${overviewTab.domesticResources.value}`
          : undefined,
        internationalResources: overviewTab && overviewTab.internationalResources
          ? `US$ ${overviewTab.internationalResources.value}`
          : undefined,
        governmentSpendPerPerson: overviewTab && overviewTab.governmentSpendPerPerson
          ? `PPP$ ${overviewTab.governmentSpendPerPerson.value}`
          : undefined,
        depthOfExtremePoverty: povertyTab && povertyTab.depthOfExtremePoverty
          ? `${povertyTab.depthOfExtremePoverty.value}%`
          : undefined,
        poverty190Trend: povertyTab && povertyTab.poverty190Trend ? povertyTab.poverty190Trend.data : [],
        incomeDistributionTrend: povertyTab && povertyTab.incomeDistTrend ? povertyTab.incomeDistTrend.data : []
      };
    }

    return {};
  }
}

const withData = graphql<PrintPageQuery, Props, QLPrintPageProps>(
  PRINT_PAGE_QUERY,
  {
    options: props => {
      return {
        variables: { id: props.id }
      };
    }
  });

export default withData(CountryProfilePrint);
