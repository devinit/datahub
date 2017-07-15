import React from 'react';
import { graphql} from 'react-apollo';
import SpotLightTabs from './wrapper';
import TABS_QUERY from '../../../graphql/SpotlightTabData.graphql';

const withData = graphql(TABS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id,
      country: props.country
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }});


export default withData(SpotLightTabs);
