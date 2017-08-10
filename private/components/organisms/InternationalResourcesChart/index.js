import React from 'react';
import { graphql } from 'react-apollo';
import Chart from './wrapper';
import QUERY from './query.graphql';
import config from '../../../visboxConfigs/areaTreemapChart';

const withData = graphql(QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;

    if (error) throw new Error(error);

    return loading || !data.internationalResources ? {loading, config} : {
      data: data.internationalResources.resourcesOverTime
        .map(d => ({
          ...d,
          flow_group: `${d.flow_category}-${d.flow_type}`
        })),
      config
    };
  }});


export default withData(Chart);
