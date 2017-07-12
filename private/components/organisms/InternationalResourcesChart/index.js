import React from 'react';
import { graphql} from 'react-apollo';
import InternationalResourcesChart from 'components/molecules/InternationalResourcesChart';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';
import config from '../../../visboxConfigs/areaTreemapChart';

const withData = graphql(RESOURCES_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, internationalResources, loading} = data;
    console.log('resourcesOverTime', data);
    if (!internationalResources) throw new Error('error getting data');
    return {
      loading,
      startYear: 2015,
      data: internationalResources.resourcesOverTime,
      config
    };
  }});


export default withData(InternationalResourcesChart);
