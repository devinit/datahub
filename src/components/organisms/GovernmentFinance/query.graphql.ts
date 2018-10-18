import gql from 'graphql-tag';

export const GOVERNMENT_FINANCE_QUERY = gql`
query governmentFinance($id: String!) {
  governmentFinance(id: $id) {
    startYear,
    currencyCode,
    currencyUSD,
    supportLocalCurrencyOnly,
    expenditure {
      uid,
      year,
      levels,
      color,
      budget_type,
      value,
      value_ncu
    },
    revenueAndGrants {
      uid,
      year,
      levels,
      color,
      budget_type,
      value,
      value_ncu
    },
    finance {
      uid,
      color,
      year,
      levels,
      budget_type,
      value,
      value_ncu
    },
  }
}`;
