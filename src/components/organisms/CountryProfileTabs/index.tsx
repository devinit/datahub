import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { getCountry, shouldShowTabData } from '../../../utils';
import { DONOR } from '../../../utils/constants';
import Pane from '../../atoms/Pane';
import { TabDataQuery, TabDataQueryVariables } from '../../gql-types';
import * as CountryTabs from '../../molecules/CountryProfileTabs';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';
import Tabs from '../../molecules/Tabs';
import { getCountryProfileData } from '../../pageData';
import govtFinanceConfig from '../../visbox/governmentFinanceTabCharts';
import internationalResourcesConfig from '../../visbox/internationalResourceTabCharts';
import overviewConfig from '../../visbox/overviewTabCharts';
import populationConfig from '../../visbox/populationTabCharts';
import povertyConfig from '../../visbox/povertyTabCharts';
import { TAB_QUERY } from './query.graphql';

type TChildProps = ChildProps<TabDataQueryVariables, TabDataQuery>;

const CountryProfileTabs: React.SFC<TChildProps> = ({ data, id }) => {
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
      <Pane label="Overview" id={ 'overview-tab' }>
        <ErrorBoundary>
          <CountryTabs.Overview
            { ...props }
            pageData={ pageData }
            countryType={ country.countryType }
            config={ overviewConfig }
          />
        </ErrorBoundary>
      </Pane>
      { country.countryType !== DONOR && props.povertyTab && shouldShowTabData(props.povertyTab)
        ? <Pane label="Poverty" id={ 'poverty-tab' }>
        <ErrorBoundary>
          <CountryTabs.Poverty pageData={ pageData } config={ povertyConfig } { ...props } />
          </ErrorBoundary>
        </Pane>
        : '' }
      {
        props.populationTab && shouldShowTabData(props.populationTab) ?
          <Pane label="Population" id={ 'population-tab' }>
          <ErrorBoundary>
            <CountryTabs.Population pageData={ pageData } config={ populationConfig } { ...props } />
            </ErrorBoundary>
          </Pane> : ''
      }

      { Number(country.has_domestic_data) && props.governmentFinance
      && shouldShowTabData(props.governmentFinance) ?
        <Pane label="Government Finance" id={ 'govt-finance-tab' }>
        <ErrorBoundary>
          <CountryTabs.GovernmentFinance pageData={ pageData } config={ govtFinanceConfig } { ...props } />
          </ErrorBoundary>
        </Pane>
        : '' }
      {
        props.internationalResources && shouldShowTabData(props.internationalResources) ?
          <Pane label="International Resources" id={ 'internantion-reseources-tab' }>
          <ErrorBoundary>
            <CountryTabs.InternationalResources
              pageData={ pageData }
              countryType={ country.countryType }
              config={ internationalResourcesConfig }
              { ...props }
            />
            </ErrorBoundary>
          </Pane> : ''
      }
    </Tabs>
  );
};

const withData = graphql<TabDataQuery, TabDataQueryVariables, TChildProps>(TAB_QUERY, {
  options: props => {
    return {
      variables: { id: props.id }
    };
  }
});

export default withData(CountryProfileTabs);
