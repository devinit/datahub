import gql from 'graphql-tag';

export const UNBUNDLING_QUERY = gql`
  query UnbundlingAidCache($aidType: String!, $args: UnbundlingAidToTalQuery) {
    selections: unbundlingSelectionData(aidType: $aidType) {
      to {
        id
        name
      }
      from {
        id
        name
      }
      channels {
        id
        name
      }
      sectors {
        id
        name
      }
      bundles {
        id
        name
      }
      years
    }
    yearTotal: unbundlingAidDataTotal(args: $args) {
      year
      total
    }
  }`;
