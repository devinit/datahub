// @flow
import { graphql } from 'react-apollo';
import Chart from 'components/molecules/MultiLinePartition';
import config from 'visboxConfigs/linePartition';
import QUERY from './query.graphql';

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) throw new Error(error);

    const {
      currencyCode = '',
      expenditure = [],
      revenueAndGrants = [],
    } = data.localGovernmentFinance || {};
    return {
      loading,
      config,
      currencyCode,
      items: [
        {
          title: 'Revenue And Grants',
          data: revenueAndGrants,
        },
        {
          title: 'Expenditure',
          data: expenditure,
        },
      ]
    };
  },
});

export default withData(Chart);
