import gql from 'graphql-tag';

export const BUBBLE_INDICATORS_QUERY = gql`
  query BubbleChartIndicatorList {
    bubbleChartOptions {
      indicators {
        id
        name
      }
      incomeGroups {
        id
        name
      }
      regions {
        id
        name
      }
    }
  }`;
