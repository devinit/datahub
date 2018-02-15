import * as React from 'react';
import { LightBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { graphql, ChildProps } from 'react-apollo';
import Chart, {Props as MProps} from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import {errorHandler} from '@devinit/dh-base/lib/utils';
import config from '@devinit/dh-ui/lib/visbox/linePartition';
import { GvmtFinanceQuery,  GvmtFinanceQueryVariables } from '../../../types';
import { GVNMT_QUERY} from './query.graphql';

type QueryVarTs = GvmtFinanceQueryVariables & MProps & {
  loading: boolean;
  error?: string;
};

type TChildProps = ChildProps<QueryVarTs, GvmtFinanceQuery>;

const withData = graphql<GvmtFinanceQuery, GvmtFinanceQueryVariables, TChildProps>(GVNMT_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data, error, loading}) => {

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

export default withData((props: TChildProps) => <LightBg><Chart {...props} /></LightBg>);
