import gql from 'graphql-tag';

export const LOC_GVMT_QUERY = gql`
query LGvmntFinance($id: String!, $country: String!) {
  localGovernmentFinance(id: $id, country: $country) {
    startYear,
    currencyCode,
    currencyUSD,
    supportLocalCurrencyOnly,
    expenditure {
      uid,
      year,
      color,
      levels,
      budget_type,
      value,
      value_ncu
    },
    revenueAndGrants {
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
