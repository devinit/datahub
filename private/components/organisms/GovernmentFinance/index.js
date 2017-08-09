// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import Chart from 'components/molecules/TripleLinePartition';
import QUERY from '../../../graphql/governmentFinance.graphql';
import config from '../../../visboxConfigs/linePartition';

const withData = graphql(QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;

    if (error) throw new Error(error);

    return {
      loading,
      config,
      ...(data.governmentFinance || {
        revenueAndGrants: [],
        expenditure: [],
        finance: [],
        currencyCode: '',
      }),
    };
  }});


export default withData(Chart);
