import gql from 'graphql-tag';
export default gql `
query UnbundlingIntlResources($resourceId: String!, $countryId: String!, $groupById: String!) {
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
