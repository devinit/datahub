import React from 'react';
import { graphql} from 'react-apollo';
import InternationalResourcesChart from './wrapper';
import TABS_QUERY from '../../../graphql/InternationalResourcesTab.graphql';

const withData = graphql(TABS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw new Error(error);
    console.log('resourcesOverTime', data.internationalResources);
    return {
      loading,
      startYear: 2015,
      data: data.internationalResources ? data.internationalResources : null,
    };
  }});


export default withData(InternationalResourcesChart);
