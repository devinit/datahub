import React from 'react';
import { graphql } from 'react-apollo';
import Chart from './wrapper';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';
import config from '../../../visboxConfigs/dualbarChart';

const withData = graphql(RESOURCES_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw new Error(error);
    return loading || !data.internationalResources ? {loading, config} : {
      data: data.internationalResources.resourcesOverTime,
      config
    };
  }});


export default withData(Chart);
