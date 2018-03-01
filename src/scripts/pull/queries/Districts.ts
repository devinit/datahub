import gql from 'graphql-tag';

export default gql`
  query Districts($country: String!) {
    districts(country: $country) {
      id
      name
    }
  }`;
