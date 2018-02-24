import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { WhiteBg } from '@devinit/dh-ui/lib/atoms/Container';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import config from '@devinit/dh-ui/lib/visbox/localLinePartition';
import {LGvmntFinanceQuery, LGvmntFinanceQueryVariables} from '../../../types';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {LOC_GVMT_QUERY} from './query.graphql';

export type QueryVarTs =  LGvmntFinanceQueryVariables & {
  state?: StateToShare
};

export type TChildProps = ChildProps<QueryVarTs, LGvmntFinanceQuery>;

const withData = graphql<LGvmntFinanceQuery, LGvmntFinanceQueryVariables, TChildProps>(LOC_GVMT_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    },
  }),
});

export default withData(({data, country, id}: TChildProps) => {
  const loading = data && data.loading;
  const governmentFinance =  data && data.localGovernmentFinance;
  if (!governmentFinance || loading) return <p>loading ...</p>;
  // TODO: Report apollo codegen error; a nested error is sometimes stated as null eg levels in domestic
  // type even when stated to be non nullable
  const props =  {
    loading: loading === undefined ? true : loading, // TODO: not useful
    chartId: 'localGovmntChart',
    config,
    currencyCode: governmentFinance.currencyCode || '',
    currencyUSD: governmentFinance.currencyUSD || '' ,
    startYear: governmentFinance.startYear,
    items: [
      {
        title: 'Revenue And Grants',
        data:  (governmentFinance.revenueAndGrants as DH.IDomestic[]) || [],
      },
      {
        title: 'Expenditure',
        data: (governmentFinance.expenditure as DH.IDomestic[]) || [],
      },
    ]
  };
  return <WhiteBg><Chart {...props} /></WhiteBg>;
});
