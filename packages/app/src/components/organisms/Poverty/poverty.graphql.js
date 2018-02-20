import gql from 'graphql-tag';
export default gql `
query Poverty {
  bubbleChartOptions {
      indicators {
        id
        name
      }
    }
}`;
