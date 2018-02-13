import '@devinit/datahub-api';
import * as React from 'react';
import { LightBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { graphql } from 'react-apollo';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import {errorHandler} from '@devinit/dh-base/lib/utils';
import config from '@devinit/dh-ui/lib/visbox/linePartition';
import { GvmtFinanceQuery } from 'gql-types';

const QUERY = require('./query.graphql');

// interface Result {
//   data: {governmentFinance: DH.IGovernmentFinance};
// }
// raphql<TResult = {}, TProps = {}, TChildProps = ChildProps<TProps, TResult>, TGraphQLVariables = {}>
const withData = graphql<GvmtFinanceQuery & {error: any, loading: boolean}, {id: string}>(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) errorHandler(error, 'error in government finance chart');

    const {
      startYear = '',
      currencyCode = '',
      currencyUSD = '',
      expenditure = [],
      revenueAndGrants = [],
      finance = [],
    } = data && data.governmentFinance || {};
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
