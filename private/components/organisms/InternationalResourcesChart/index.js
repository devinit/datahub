// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/InternationalResourcesChart';
import type {Props} from 'components/molecules/InternationalResourcesChart';
import LoadingBar from 'components/molecules/LoadingBar';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';

type WrapperProps = Props & {
  loading: boolean
}

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return (<LoadingBar loading={props.loading} />);
  return (<InternationalResourcesChart
    startYear={props.startYear}
    data={props.data}
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
    const {error, loading} = data;
    if (error) throw new Error(error);
    return loading || !data.internationalResources ? {loading} : {
      startYear: data.internationalResources.startYear,
      data: data.internationalResources.resourcesOverTime.data
        .map(d => ({
          ...d,
          flow_group: `${d.flow_category}-${d.flow_type}`
        })),
      config
    };
  }});

export default withData(internationalResourcesChartWrapper);
