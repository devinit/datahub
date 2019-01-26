import Tabs from '../../molecules/Tabs';
import * as React from 'react';
import { getCountry, shouldShowTabData } from '../../../utils';
import { DONOR } from '../../../utils/constants';
import Pane from '../../atoms/Pane';
import { TabDataQuery, TabDataQueryVariables } from '../../gql-types';
import * as CountryTabs from '../../molecules/CountryProfileTabs';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';
import { ChildProps, graphql } from 'react-apollo';
import { PageUnit, getCountryProfileData } from '../../pageData';
import { Country } from '../../types';
import govtFinanceConfig from '../../visbox/governmentFinanceTabCharts';
import internationalResourcesConfig from '../../visbox/internationalResourceTabCharts';
import overviewConfig from '../../visbox/overviewTabCharts';
import populationConfig from '../../visbox/populationTabCharts';
import povertyConfig from '../../visbox/povertyTabCharts';
import { TAB_QUERY } from './query.graphql';

type TChildProps = ChildProps<TabDataQueryVariables, TabDataQuery>;

class CountryProfileTabs extends React.Component<TChildProps> {
  render() {
    const { data, id } = this.props;

    if (!data || data.loading) {
      return <LoadingIndicator height={ '300px' }/>;
    }
    const variables = data.variables;
    if (!variables) {
      throw new Error('country profile variable id missing');
    }
    const pageData = getCountryProfileData(id);
    const country = getCountry(id);
    const props = data as TabDataQuery; // make typescript happy

    return (
      <Tabs selected={ 0 }>
        { this.renderOverviewTab(country, props, pageData) }
        { this.renderPovertyTab(country, props, pageData) }
        { this.renderPopulationTab(props, pageData) }
        { this.renderGovernmentFinanceTab(country, props, pageData) }
        { this.renderInternationalResourcesTab(country, props, pageData) }
      </Tabs>
    );
  }

  private renderOverviewTab(country: Country, data: TabDataQuery, pageData: PageUnit[]) {
    return (
      <Pane label="Overview" id={ 'overview-tab' }>
          <ErrorBoundary>
            <CountryTabs.Overview
              { ...data }
              pageData={ pageData }
              countryType={ country.countryType }
              config={ overviewConfig }
            />
          </ErrorBoundary>
        </Pane>
    );
  }

  private renderPovertyTab(country: Country, data: TabDataQuery, pageData: PageUnit[]) {
    if (country.countryType !== DONOR && data.povertyTab && shouldShowTabData(data.povertyTab)) {
      return (
        <Pane label="Poverty" id={ 'poverty-tab' }>
          <ErrorBoundary>
            <CountryTabs.Poverty pageData={ pageData } config={ povertyConfig } { ...data } />
          </ErrorBoundary>
        </Pane>
      );
    }

    return null;
  }

  private renderPopulationTab(data: TabDataQuery, pageData: PageUnit[]) {
    if (data.populationTab && shouldShowTabData(data.populationTab)) {
      return (
        <Pane label="Population" id={ 'population-tab' }>
          <ErrorBoundary>
            <CountryTabs.Population pageData={ pageData } config={ populationConfig } { ...data } />
          </ErrorBoundary>
        </Pane>
      );
    }

    return null;
  }

  private renderGovernmentFinanceTab(country: Country, data: TabDataQuery, pageData: PageUnit[]) {
    if (Number(country.has_domestic_data) && data.governmentFinance && shouldShowTabData(data.governmentFinance)) {
      return (
        <Pane label="Government Finance" id={ 'govt-finance-tab' }>
        <ErrorBoundary>
          <CountryTabs.GovernmentFinance pageData={ pageData } config={ govtFinanceConfig } { ...data } />
          </ErrorBoundary>
        </Pane>
      );
    }

    return null;
  }

  private renderInternationalResourcesTab(country: Country, data: TabDataQuery, pageData: PageUnit[]) {
    if (data.internationalResources && shouldShowTabData(data.internationalResources)) {
      return (
        <Pane label="International Resources" id={ 'internantion-reseources-tab' }>
          <ErrorBoundary>
            <CountryTabs.InternationalResources
              pageData={ pageData }
              countryType={ country.countryType }
              config={ internationalResourcesConfig }
              { ...data }
            />
          </ErrorBoundary>
        </Pane>
      );
    }

    return null;
  }
}

const withData = graphql<TabDataQuery, TabDataQueryVariables, TChildProps>(TAB_QUERY, {
  options: props => {
    return {
      variables: { id: props.id }
    };
  }
});

export default withData(CountryProfileTabs);
