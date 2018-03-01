import gql from 'graphql-tag';

export default gql`
  query Countries {
    countries {
      id
      name
      slug
      has_domestic_data
      countryType
      hasPDF
    }
  }`;
