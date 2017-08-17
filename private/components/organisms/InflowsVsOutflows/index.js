// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import type { Props } from 'components/molecules/SlidingDualSidebar';
import SlidingDualSidebar from 'components/molecules/SlidingDualSidebar';
import {getCountryName} from 'lib/utils';
import config from 'visboxConfigs/dualbarChart';
import RESOURCES_QUERY from '../InternationalResourcesChart/query.graphql';

type WrapperProps = Props & {
  loading: boolean
};

const Chart = (props: WrapperProps) => {
  if (props.loading) return <p>Loading...</p>;
  return (
    <SlidingDualSidebar
      {...props}
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
    if (error) throw new Error(error);
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
