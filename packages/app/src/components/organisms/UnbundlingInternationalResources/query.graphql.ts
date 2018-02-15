import gql from 'graphql-tag';

export default gql`
query UnbundlingInternationalResources($resourceId: String!, $countryId: String!, $groupById: String!) {
  singleResource(resourceId: $resourceId, countryId: $countryId, groupById: $groupById) {
    color
    resources {
      id
      name
      value
      year
    }
  }
}`;
