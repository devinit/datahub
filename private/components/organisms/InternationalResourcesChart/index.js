// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/InternationalResourcesChart';
import type {Props} from 'components/molecules/InternationalResourcesChart';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';

type WrapperProps = Props & {
  loading: boolean,
  ...ResourcesOverTimeQuery
}

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading || !props.internationalResources || !props.internationalResources.startYear
    || !props.internationalResources.resourcesOverTime
    || !props.internationalResources.resourcesOverTime.data) {
    return (<p>Loading..</p>);
  }
  return (<InternationalResourcesChart
    startYear={props.internationalResources.startYear}
    data={props.internationalResources.resourcesOverTime.data}
    config={config}
  />);
};

const withData = graphql(RESOURCES_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error} = data;
    if (error) console.error(error);
    return data;
  }});

export default withData(internationalResourcesChartWrapper);
