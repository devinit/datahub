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
    if (error) console.error(error);
    return {
      loading,
      data: data.internationalResources ? data.internationalResources : null,
    };
  }});


export default withData(InternationalResourcesChart);
