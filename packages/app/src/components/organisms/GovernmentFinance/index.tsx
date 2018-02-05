// @flow
import * as React from 'react';
import { LightBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { graphql } from 'react-apollo';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import {errorHandler} from '@devinit/dh-base/lib/utils';
import config from '@devinit/dh-ui/lib/visboxConfigs/linePartition';
import QUERY from './query.graphql';

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) errorHandler(error, 'error in government finance chart');

    const {
      startYear,
      currencyCode,
      currencyUSD,
      expenditure = [],
      revenueAndGrants = [],
      finance = [],
    } = data.governmentFinance || {};
    return {
      loading,
      config,
      currencyCode,
      currencyUSD,
      startYear,
      items: [
        {
          title: 'Revenue And Grants',
          data: revenueAndGrants,
        },
        {
          title: 'Financing',
          inverted: true,
          withoutOptions: true,
          data: finance,
        },
        {
          title: 'Expenditure',
          data: expenditure,
        },
      ]
    };
  },
});

export default withData(props => <LightBg><Chart {...props} /></LightBg>);
