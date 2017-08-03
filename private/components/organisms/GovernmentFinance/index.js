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

    return loading || !data.governmentFinance ? {
      loading,
      config,
      currencies: [],
      revenueAndGrants: [],
      expenditure: [],
      finance: [],
    } : {
      currencies: [
        {text: 'Constant 2015 US$', value: 'US$'},
        {text: `Current ${data.governmentFinance.currencyCode}`, value: data.governmentFinance.currencyCode},
      ],
      revenueAndGrants: data.governmentFinance.revenueAndGrants,
      expenditure: data.governmentFinance.expenditure,
      finance: data.governmentFinance.finance,
      config
    };
  }});


export default withData(Chart);
