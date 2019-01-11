import * as React from 'react';
import {
  ContentWrapper,
  CountryProfileLink,
  CountryProfileLinkDescription,
  CountryProfileLinkText,
  URLWrapper
} from '../../atoms/CountryProfilePrint';
import { StateToShare } from '../../molecules/ChartShare';
import PrintProfileHeader from '../../molecules/CountryProfilePrint/PrintProfileHeader';
import { SectionOne, SectionOneProps } from '../../molecules/CountryProfilePrint/SectionOne';
import { Country } from '../../types';
import {
  PRINT_PAGE_QUERY,
  PrintNarrative,
  PrintPageQuery,
  PrintPageQueryVariables
} from '../../molecules/CountryProfilePrint/graphql';
import { ChildProps, graphql } from 'react-apollo';
import { SectionTwo, SectionTwoProps } from '../../molecules/CountryProfilePrint/SectionTwo';
import { Container, Grid } from 'semantic-ui-react';
import { SectionThree, SectionThreeProps } from '../../molecules/CountryProfilePrint/SectionThree';

type QLPrintPageProps = ChildProps<PrintPageQueryVariables, PrintPageQuery>;
interface Props extends QLPrintPageProps {
  country: Country;
  rehydrated?: boolean;
  state?: StateToShare;
}
class CountryProfilePrint extends React.Component<Props> {
  // private version = '2018-30-12';
  // private footerText = 'Country Profiles By Development Initiatives';

  render() {
    const { name, slug } = this.props.country;

    return (
      <ContentWrapper>
        <div>
          <Container>
            <Grid>
              <Grid.Row style={ { paddingBottom: 0 } }>
                <Grid.Column>
                  <URLWrapper>
                    <CountryProfileLink href={ `http://data.devinit.org/country/${slug}` }>
                      <CountryProfileLinkText>{ name } profile on the Development Data Hub:</CountryProfileLinkText>
                      <CountryProfileLinkDescription>http://data.devinit.org/country/{ slug }</CountryProfileLinkDescription>
                    </CountryProfileLink>
                  </URLWrapper>
                </Grid.Column>
              </Grid.Row>
              <PrintProfileHeader country={ this.props.country } printNarratives={ this.getPrintNarratives() }/>
              <SectionOne { ...this.getSectionOneProps() }/>
              <SectionTwo { ...this.getSectionTwoProps() }/>
              <SectionThree { ...this.getSectionThreeProps() }/>
            </Grid>
          </Container>
        </div>
      </ContentWrapper>
    );
  }

  private getPrintNarratives(): PrintNarrative[] {
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
        incomeDistributionTrend: povertyTab && povertyTab.incomeDistTrend ? povertyTab.incomeDistTrend.data : [],
        narratives: this.getPrintNarratives()
      };
    }

    return { narratives: [] };
  }

  private getSectionTwoProps(): SectionTwoProps {
    return {
      country: this.props.country,
      narratives: this.getPrintNarratives()
    };
  }

  private getSectionThreeProps(): SectionThreeProps {
    if (this.props.data) {
      const { recipientODAProfiles } = this.props.data;

      return {
        country: this.props.country,
        narratives: this.getPrintNarratives(),
        ODAProfiles: recipientODAProfiles
      };
    }

    return { narratives: [] };
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