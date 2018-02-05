// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Props } from '@devinit/dh-ui/lib/molecules/SlidingDualSidebar';
import SlidingDualSidebar from '@devinit/dh-ui/lib/molecules/SlidingDualSidebar';
import {getCountryName, errorHandler} from '@devinit/dh-base/lib/utils';
import config from '@devinit/dh-ui/lib/visboxConfigs/dualbarChart';
import RESOURCES_QUERY from '../../InternationalResourcesChart/query.graphql';

type WrapperProps = Props & {
  loading: boolean
};

const Chart = (props: WrapperProps) => {
  if (props.loading) return <p>Loading...</p>;
  return (
    <SlidingDualSidebar
      country={props.country}
      countryType={props.countryType}
      startYear={props.startYear}
      year={props.year}
      shouldScrollIntoView={props.shouldScrollIntoView}
      chartId={props.chartId}
      data={props.data}
      config={config}
    />
  );
};


const withData = graphql(RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;
    if (error) errorHandler(error, 'error in inflow outflow chart');
    return loading || !data.internationalResources
      ? { loading }
      : {
        country: getCountryName(data.variables.id),
        startYear: data.internationalResources.startYear,
        data: data.internationalResources.resourcesOverTime.data
      };
  },
});

export default withData(Chart);
