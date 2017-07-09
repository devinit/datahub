import React from 'react';
import { graphql, OperationComponent } from 'react-apollo';
import SearchInput from 'components/molecules/SearchInput';
import COUNTRIES_QUERY from './countries.graphql';

const withData = graphql(COUNTRIES_QUERY, {
  props: ({ data }) => {
    console.log('graphql data: ', data.bubbleChartIndicatorsList);
    return {
      loading: data.loading,
      countries: data.bubbleChartIndicatorsList,
      visible: true,
      placeholder: 'Type Your Country Name'
    };
  }})(SearchInput);

export default withData;
