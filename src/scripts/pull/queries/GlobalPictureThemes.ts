import gql from 'graphql-tag';

export const GLOBAL_PICTURE_THEMES_QUERY = gql`
  query GlobalPictureThemes {
    globalPictureThemes {
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
