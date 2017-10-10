// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { WhiteBg } from 'components/atoms/Backgrounds';
import Chart from 'components/molecules/MultiLinePartition';
import config from 'visboxConfigs/localLinePartition';
import {errorHandler} from 'lib/utils';
import QUERY from './query.graphql';

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) errorHandler(error, 'error in localgovernment finance chart');

    const {
      currencyCode = '',
      startYear = data.startYear,
      currencyUSD,
      expenditure = [],
      revenueAndGrants = [],
    } = data.localGovernmentFinance || {};
    return {
      loading,
      currencyUSD,
      currencyCode,
      startYear,
      config,
      items: [
        {
          title: 'Revenue',
          data: revenueAndGrants,
        },
        {
          title: 'Expenditure',
          data: expenditure,
          inverted: false
        },
      ]
    };
  },
});

export default withData(props => {
  return <WhiteBg><Chart {...props} /></WhiteBg>;
});
