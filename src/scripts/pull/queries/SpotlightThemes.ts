import gql from 'graphql-tag';

export const SPOTLIGHT_THEMES_QUERY = gql`
  query SpotlightThemes($country: String!) {
    spotlightThemes(country: $country){
      id
      name
      indicators {
        id
        name
        heading
        tooltip
        source
      }
      default_indicator
    }
  }`;
