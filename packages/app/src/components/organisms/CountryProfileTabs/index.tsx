import * as React from 'react';
import {TabDataQuery} from '../../../types';
import { graphql } from 'react-apollo';
import {
  GovernmentFinance,
  InternationalResources,
  Overview,
  Population,
  Poverty,
} from '@devinit/dh-ui/lib/molecules/CountryProfileTabs';
import povertyConfig from '@devinit/dh-ui/lib/visbox/povertyTabCharts';
import populationConfig from '@devinit/dh-ui/lib/visbox/populationTabCharts';
import govtFinanceConfig from '@devinit/dh-ui/lib/visbox/governmentFinanceTabCharts';
import internationalResourcesConfig from '@devinit/dh-ui/lib/visbox/internationalResourceTabCharts';
import Tabs from '@devinit/dh-ui/lib/molecules/Tabs';
import Pane from '@devinit/dh-ui/lib/atoms/Pane';
import { DONOR } from '@devinit/dh-base/lib/utils/constants';
import { getCountry } from '../utils';
import { shouldShowTabData, errorHandler } from '@devinit/dh-base/lib/utils';
import LoadingPlaceholder from '@devinit/dh-ui/lib/molecules/LoadingPlaceholder';
import overviewConfig from '@devinit/dh-ui/lib/visbox/overviewTabCharts';
import {getCountryProfileData} from '../PagesData';
import {TAB_QUERY} from './query.graphql';

type TabsProps = TabDataQuery & {
  loading: boolean;
  variables: { id: string};
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
const withData = graphql(TAB_QUERY, {
  options: props => {
    return {
      variables: { id: props.id },
    };
  },
  props: ({ data }) => {
    const { error } = data;
    if (error) {
      errorHandler(error, 'error in country profile tabs');
    }
    return data;
  },
});

export default withData(countryProfileTabs);
