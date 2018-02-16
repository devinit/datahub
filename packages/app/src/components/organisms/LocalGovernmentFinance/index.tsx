import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { WhiteBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import config from '@devinit/dh-ui/lib/visbox/localLinePartition';
import {GovernmentFinanceQuery,  GovernmentFinanceQueryVariables} from '../../../types';
import {LOC_GVMT_QUERY} from './query.graphql';

type QueryVarTs =  GovernmentFinanceQueryVariables & {
  chartId: string,
  year?: number,
  shouldScrollIntoView?: boolean;
  budgetType?: string,
};

type TChildProps = ChildProps<QueryVarTs, GovernmentFinanceQuery>;

const withData = graphql<GovernmentFinanceQuery, GovernmentFinanceQueryVariables, TChildProps>(LOC_GVMT_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    },
  }),
});
export default withData(({data,  chartId, year, shouldScrollIntoView, budgetType}: TChildProps) => {
  const loading = data && data.loading;
  const governmentFinance =  data && data.localGovernmentFinance;
  if (!governmentFinance) return <p>loading ...</p>;
  // TODO: Report apollo codegen error; a nested error is sometimes stated as null eg levels in domestic
  // type even when stated to be non nullable
  const props =  {
    loading: loading === undefined ? true : loading,
    config,
    chartId,
    year,
    shouldScrollIntoView,
    budgetType,
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
