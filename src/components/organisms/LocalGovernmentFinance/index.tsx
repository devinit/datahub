import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { WhiteBg } from '../../atoms/Container';
import { LGvmntFinanceQuery, LGvmntFinanceQueryVariables } from '../../gql-types';
import { StateToShare } from '../../molecules/ChartShare';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';
import Chart from '../../molecules/MultiLinePartition';
import config from '../../visbox/localLinePartition';
import { LOC_GVMT_QUERY } from './query.graphql';

export type QueryVarTs = LGvmntFinanceQueryVariables & {
  state?: StateToShare
};

export type TChildProps = ChildProps<QueryVarTs, LGvmntFinanceQuery>;

const withData = graphql<LGvmntFinanceQuery, LGvmntFinanceQueryVariables, TChildProps>(LOC_GVMT_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    }
  })
});

export default withData(({ data }: TChildProps) => {
  const loading = data && data.loading;
  const governmentFinance = data && data.localGovernmentFinance;
  if (!governmentFinance || loading) {
    return <LoadingIndicator height={ '550px' }/>;
  }
  // TODO: Report apollo codegen error; a nested error is sometimes stated as null eg levels in domestic
  // type even when stated to be non nullable
  const items: Array<{title: string, data: DH.IDomestic[], inverted?: boolean}> = [];
  const revenueAndGrants = governmentFinance.revenueAndGrants as DH.IDomestic[];
  const expenditure = governmentFinance.expenditure as DH.IDomestic[];
  if (revenueAndGrants.length) {
    items.push({ title: 'Revenue', data: revenueAndGrants });
  }
  if (expenditure.length) {
    items.push({ title: 'Expenditure', data: expenditure, inverted: false });
  }
  const props = {
    loading: loading === undefined ? true : loading, // TODO: not useful
    chartId: 'localGovmntChart',
    config,
    currencyCode: governmentFinance.currencyCode || '',
    currencyUSD: governmentFinance.currencyUSD || '' ,
    supportLocalCurrencyOnly: !!governmentFinance.supportLocalCurrencyOnly,
    startYear: governmentFinance.startYear,
    items
  };

  return <WhiteBg><Chart { ...props } /></WhiteBg>;
});
