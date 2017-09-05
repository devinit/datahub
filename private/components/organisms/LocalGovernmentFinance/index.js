// @flow
import { graphql } from 'react-apollo';
import Chart from 'components/molecules/TripleLinePartition';
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

    return {
      loading,
      config,
      ...(data.localGovernmentFinance || {
        revenueAndGrants: [],
        expenditure: [],
        finance: [],
        currencyCode: '',
        startYear: 2015,
      }),
    };
  },
});

export default withData(Chart);
