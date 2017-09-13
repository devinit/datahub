// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { WhiteBg } from 'components/atoms/Backgrounds';
import Chart from 'components/molecules/MultiLinePartition';
import config from 'visboxConfigs/localLinePartition';
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

    if (error) throw new Error(error);

    const {
      currencyCode = '',
      startYear = 2015,
      currencyUSD,
      expenditure = [],
      revenueAndGrants = [],
    } = data.localGovernmentFinance || {};
    return {
      loading,
      config,
      currencyUSD,
      currencyCode,
      startYear,
      items: [
        {
          title: 'Revenue',
          data: revenueAndGrants,
        },
        {
          title: 'Expenditure',
          data: expenditure,
        },
      ]
    };
  },
});

export default withData(props => <WhiteBg><Chart {...props} /></WhiteBg>);
