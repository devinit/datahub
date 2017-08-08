// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/InternationalResourcesChart';
import type {Props} from 'components/molecules/InternationalResourcesChart';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';

type WrapperProps = Props & {
  loading: boolean
}

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return (<p>Loading..</p>);
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
    if (!data.internationalResources || !data.internationalResources.startYear
      || !data.internationalResources.resourcesOverTime) {
      throw new Error('internation resources data missing start year and resource overtime data');
    }
    if (!data.internationalResources.resourcesOverTime.data) throw new Error('international resourcesOverTime data missing');
    return {
      loading,
      startYear: data.internationalResources.startYear,
      data: data.internationalResources.resourcesOverTime.data
    };
  }});

export default withData(internationalResourcesChartWrapper);
