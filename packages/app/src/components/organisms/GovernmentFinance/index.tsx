import * as React from 'react';
import { LightBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { graphql } from 'react-apollo';
import Chart, {Props as MProps} from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import {errorHandler} from '@devinit/dh-base/lib/utils';
import config from '@devinit/dh-ui/lib/visbox/linePartition';
import { GvmtFinanceQuery,  GvmtFinanceQueryVariables } from '../gql-types';
import GvtQUERY from './query.graphql';

export type Props = MProps  & GvmtFinanceQueryVariables;

const withData = graphql<GvmtFinanceQuery, MProps>(GvtQUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {

    if (data && data.error) errorHandler(data.error, 'error in government finance chart');
    const loading: boolean | undefined = data && data.loading;

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

export default withData((props: MProps) => <LightBg><Chart {...props} /></LightBg>);
