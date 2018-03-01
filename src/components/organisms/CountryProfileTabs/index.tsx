import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import * as CTabs from '../../molecules/CountryProfileTabs';
import povertyConfig from '../../visbox/povertyTabCharts';
import populationConfig from '../../visbox/populationTabCharts';
import govtFinanceConfig from '../../visbox/governmentFinanceTabCharts';
import internationalResourcesConfig from '../../visbox/internationalResourceTabCharts';
import Tabs from '../../molecules/Tabs';
import Pane from '../../atoms/Pane';
import { DONOR } from '../../../../utils/constants';
import {getCountry} from '../../../../utils';
import { shouldShowTabData} from '../../..//utils';
import LoadingPlaceholder from '../../molecules/LoadingPlaceholder';
import overviewConfig from '../../visbox/overviewTabCharts';
import {getCountryProfileData} from '../../../pageData';
import { TabDataQuery,  TabDataQueryVariables } from '../../gql-types';
import {TAB_QUERY} from './query.graphql';

type TChildProps = ChildProps<TabDataQueryVariables, TabDataQuery>;

const CountryProfileTabs: React.SFC<TChildProps> = ({data, id}) => {
  if (!data || data.loading) {
    return <LoadingPlaceholder loading />;
  }
  const variables = data.variables;
  if (!variables) throw new Error ('country profile variable id missing');
  const pageData = getCountryProfileData(id);
  const country = getCountry(id);
  const props = data as TabDataQuery; // make typescript happy
  return (
    <Tabs selected={0}>
      <Pane label="Overview" id={'overview-tab'}>
        <CTabs.Overview
          {...props}
          pageData={pageData}
          countryType={country.countryType}
          config={overviewConfig}
        />
      </Pane>
      {country.countryType !== DONOR && props.povertyTab && shouldShowTabData(props.povertyTab)
        ? <Pane label="Poverty" id={'poverty-tab'}>
          <CTabs.Poverty pageData={pageData} config={povertyConfig} {...props} />
        </Pane>
        : ''}
      {
        props.populationTab && shouldShowTabData(props.populationTab) ?
          <Pane label="Population" id={'population-tab'}>
            <CTabs.Population pageData={pageData} config={populationConfig} {...props} />
          </Pane> : ''
      }

      {Number(country.has_domestic_data) && props.governmentFinance
      && shouldShowTabData(props.governmentFinance) ?
        <Pane label="Government Finance" id={'govt-finance-tab'}>
          <CTabs.GovernmentFinance pageData={pageData} config={govtFinanceConfig} {...props} />
        </Pane>
        : ''}
      {
        props.internationalResources && shouldShowTabData(props.internationalResources) ?
          <Pane label="International Resources" id={'internantion-reseources-tab'}>
            <CTabs.InternationalResources
              pageData={pageData}
              countryType={country.countryType}
              config={internationalResourcesConfig}
              {...props}
            />
          </Pane> : ''
      }
    </Tabs>
  );
};

const withData = graphql<TabDataQuery, TabDataQueryVariables, TChildProps>(TAB_QUERY, {
  options: props => {
    return {
      variables: { id: props.id },
    };
  }
});

export default withData(CountryProfileTabs);
