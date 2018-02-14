import gql from 'graphql-tag';

export default gql
`query DifferentProvidersDifferentPriotities {
  bubbleChartOptions {
    indicators {
      id
      name
    }
  }
}`;
