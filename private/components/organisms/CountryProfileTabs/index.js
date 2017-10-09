// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import {
  GovernmentFinance,
  InternationalResources,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/CountryProfileTabs';
import povertyConfig from 'visboxConfigs/povertyTabCharts';
import populationConfig from 'visboxConfigs/populationTabCharts';
import govtFinanceConfig from 'visboxConfigs/governmentFinanceTabCharts';
import internationalResourcesConfig from 'visboxConfigs/internationalResourceTabCharts';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import { DONOR } from 'lib/utils/constants';
import { getCountry, shouldShowTabData, errorHandler } from 'lib/utils';
import LoadingPlaceholder from 'components/molecules/LoadingPlaceholder';
import overviewConfig from 'visboxConfigs/overviewTabCharts';
import {getCountryProfileData} from 'components/organisms/PagesData';
import TABS_QUERY from './query.graphql';


type TabsProps = {
  loading: boolean,
  variables: { id: string},
  ...TabDataQuery,
};

const countryProfileTabs = (props: TabsProps) => {
  if (props.loading || !props.overviewTab) {
    return <LoadingPlaceholder loading={props.loading} />;
  }
  const pagesData = getCountryProfileData(props.variables.id);
  const country = getCountry(props.variables.id);
  return (
    <Tabs selected={0}>
      <Pane label="Overview" id={'overview-tab'}>
        <Overview
          {...props}
          pagesData={pagesData}
          countryType={country.countryType}
          config={overviewConfig}
        />
      </Pane>
      {country.countryType !== DONOR && props.povertyTab && shouldShowTabData(props.povertyTab)
        ? <Pane label="Poverty" id={'poverty-tab'}>
          <Poverty pagesData={pagesData} config={povertyConfig} {...props} />
        </Pane>
        : ''}
      {
        props.populationTab && shouldShowTabData(props.populationTab) ?
          <Pane label="Population" id={'population-tab'}>
            <Population pagesData={pagesData} config={populationConfig} {...props} />
          </Pane> : ''
      }

      {Number(country.has_domestic_data) && props.governmentFinance
      && shouldShowTabData(props.governmentFinance) ?
        <Pane label="Government Finance" id={'govt-finance-tab'}>
          <GovernmentFinance pagesData={pagesData} config={govtFinanceConfig} {...props} />
        </Pane>
        : ''}
      {
        props.internationalResources && shouldShowTabData(props.internationalResources) ?
          <Pane label="International Resources" id={'internantion-reseources-tab'}>
            <InternationalResources
              pagesData={pagesData}
              countryType={country.countryType}
              config={internationalResourcesConfig}
              {...props}
            />
          </Pane> : ''
      }
    </Tabs>
  );
};
const withData = graphql(TABS_QUERY, {
  options: props => {
    return {
      variables: { id: props.id },
    };
  },
  props: ({ data }) => {
    const { error } = data;
    if (error) {
      errorHandler(error);
    }
    return data;
  },
});

export default withData(countryProfileTabs);
