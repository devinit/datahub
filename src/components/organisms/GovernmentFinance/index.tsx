import * as React from 'react';
import { LightBg } from '../../atoms/Container';
import { graphql, ChildProps } from 'react-apollo';
import Chart from '../../molecules/MultiLinePartition';
import config from '../../visbox/linePartition';
import { GvmtFinanceQuery,  GvmtFinanceQueryVariables } from '../../gql-types';
import { GVNMT_QUERY} from './query.graphql';

type QueryVarTs = GvmtFinanceQueryVariables & {
  chartId: string,
  year?: number,
  shouldScrollIntoView?: boolean;
  budgetType?: string,
};

type TChildProps = ChildProps<QueryVarTs, GvmtFinanceQuery>;

const withData = graphql<GvmtFinanceQuery,  QueryVarTs,  TChildProps>(GVNMT_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  })
});

export default withData(({data,  chartId, year, shouldScrollIntoView, budgetType}: TChildProps) => {
  const loading = data && data.loading;
  const governmentFinance =  data && data.governmentFinance;
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
        title: 'Financing',
        inverted: false,
        withoutOptions: true,
        data: (governmentFinance.finance as DH.IDomestic[]) || [],
      },
      {
        title: 'Expenditure',
        data: (governmentFinance.expenditure as DH.IDomestic[]) || [],
      },
    ]
  };
  return <LightBg><Chart {...props} /></LightBg>;
});
