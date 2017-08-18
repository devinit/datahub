// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/AreaPartitionChart';
import type { Props } from 'components/molecules/AreaPartitionChart';
import LoadingBar from 'components/molecules/LoadingBar';
import {getCountryName} from 'lib/utils';
import flowCache from './data';
import countryCache from '../CountrySearchInput/data';
import QUERY from './query.graphql';

type WrapperProps = Props & {
  loading: boolean
};

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return <LoadingBar loading={props.loading} />;
  return (
    <InternationalResourcesChart
      id={props.id}
      startYear={props.startYear}
      data={props.data}
      config={config}
      year={props.year} // look in countryProfile lower tabs
      shouldScrollIntoView={props.shouldScrollIntoView}
      chartId={props.chartId}
      country={props.country}
      inflows={props.inflows}
      outflows={props.outflows}
    />
  );
};

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id
    },
  }),
  props: ({ data, ownProps }) => {
    const [countryType = 'recipient'] = countryCache.countries
      .filter(country => country.id === ownProps.id)
      .map(country => country.countryType);

    const { inflows, outflows } = flowCache[countryType];

    const { error, loading } = data;
    if (error) throw new Error(error);
    return loading || !data.internationalResources ?
      { loading } :
      {
        id: data.variables.id,
        country: getCountryName(data.variables.id),
        startYear: data.internationalResources.startYear,
        data: data.internationalResources.resourcesOverTime.data,
        inflows,
        outflows,
      };
  },
});

export default withData(internationalResourcesChartWrapper);
