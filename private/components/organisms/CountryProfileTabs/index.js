import React from 'react';
import { graphql} from 'react-apollo';
import CountryProfileTabs from './wrapper';
import TABS_QUERY from '../../../graphql/TabData.graphql';

const withData = graphql(TABS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }});


export default withData(CountryProfileTabs);
