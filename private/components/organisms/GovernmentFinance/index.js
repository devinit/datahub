// @flow
import { graphql } from 'react-apollo';
import Chart from 'components/molecules/TripleLinePartition';
import config from 'visboxConfigs/linePartition';
import QUERY from '../../../graphql/governmentFinance.graphql';

const withData = graphql(QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;

    if (error) throw new Error(error);

    return {
      loading,
      config,
      ...(data.governmentFinance || {
        revenueAndGrants: [],
        expenditure: [],
        finance: [],
        currencyCode: '',
        startYear: 2015 // got from api
      }),
    };
  }});


export default withData(Chart);
