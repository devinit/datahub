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
    landingPage: globalPicturePageData {
      id
      title
      narrative
    }
    povertyBubbleChart: povertyBubbleChartPageData {
      id
      title
      narrative
    }
    unbundlingOda: unbundlingOdaPageData{
      id
      title
      narrative
    }
    unbundingOOf: unbundlingOOfPageData {
      id
      title
      narrative
    }
    whereThePoor: whereThePoorPageData {
      id
      title
      narrative
    }
    about: aboutPageData {
      id
      title
      narrative
    }
    front: frontPageDaa {
      id
      title
      narrative
    }
    spotlight: spotlightPageData {
      id
      title
      narrative
    }
    unbundlingAid: unbundlingAidPageData {
      id
      title
      narrative
    }
  }`;
