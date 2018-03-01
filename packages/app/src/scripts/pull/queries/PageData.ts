import gql from 'graphql-tag';

export const PAGES_DATA_QUERY = gql`
  query pageData {
    countryProfile: countryProfilePageData {
      id
      title
      narrative
      donor_title
    }
    uganda: districtPageData (country: "uganda") {
      id
      title
      narrative
    }
    kenya: districtPageData (country: "kenya") {
      id
      title
      narrative
    }
  }`;
