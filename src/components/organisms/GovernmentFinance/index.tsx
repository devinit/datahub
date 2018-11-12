import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { LightBg } from '../../atoms/Container';
import { GovernmentFinanceQuery, GovernmentFinanceQueryVariables } from '../../gql-types';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';
import config from '../../visbox/linePartition';
import { GOVERNMENT_FINANCE_QUERY } from './query.graphql';

type QueryVarTs = GovernmentFinanceQueryVariables & Props & {
  chartId: string,
  year?: number,
  shouldScrollIntoView?: boolean;
  budgetType?: string,
};

interface Props {
  children: React.ReactChild;
}

type TChildProps = ChildProps<QueryVarTs, GovernmentFinanceQuery>;

const withData = graphql<GovernmentFinanceQuery, QueryVarTs, TChildProps>(GOVERNMENT_FINANCE_QUERY, {
  options: props => ({
    variables: {
      id: props.id
    }
  })
});

export default withData(({ data, chartId, year, shouldScrollIntoView, budgetType, children }: TChildProps) => {
  const loading = data && data.loading;
  const governmentFinance = data && data.governmentFinance;
  if (!governmentFinance) {
    return <LoadingIndicator height={ '600px' }/>;
  }
  // TODO: Report apollo codegen error; a nested error is sometimes stated as null eg levels in domestic
  // type even when stated to be non nullable
  const props = {
    loading: loading === undefined ? true : loading,
    config,
    chartId,
    year,
    shouldScrollIntoView,
    budgetType,
    currencyCode: governmentFinance.currencyCode || '',
    currencyUSD: governmentFinance.currencyUSD || '' ,
    supportLocalCurrencyOnly: governmentFinance.supportLocalCurrencyOnly || false,
    startYear: governmentFinance.startYear,
    items: [
      {
        title: 'Revenue And Grants',
        data:  (governmentFinance.revenueAndGrants as DH.IDomestic[]) || []
      },
      {
        title: 'Financing',
        inverted: false,
        withoutOptions: true,
        data: (governmentFinance.finance as DH.IDomestic[]) || []
      },
      {
        title: 'Expenditure',
        data: (governmentFinance.expenditure as DH.IDomestic[]) || []
      }
    ]
  };

  return <LightBg>{ React.cloneElement(children as React.ReactElement<any>, props) }</LightBg>;
});
