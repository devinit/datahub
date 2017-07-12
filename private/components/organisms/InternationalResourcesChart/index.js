import React from 'react';
import { graphql} from 'react-apollo';
import InternationalResourcesChart from './wrapper';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';
import config from '../../../visboxConfigs/areaTreemapChart';

const withData = graphql(RESOURCES_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    console.log('resourcesOverTime', data.internationalResources);
    return {
      loading,
      startYear: 2015,
      data: data.internationalResources ? data.internationalResources.resourcesOverTime : [],
      config
    };
  }});


export default withData(InternationalResourcesChart);
