import gql from 'graphql-tag';

export default gql`
  query MapData($id: String!) {
    mapData(id: $id) {
      map {
        id
        name
        color
        year
        uid
        detail
        value
        slug
      }
      start_year
      end_year
      country
      uom_display
      name
      theme
      heading
      default_year
      description
      map_style
      id
      legend {
        label
        color
        backgroundColor
      }
    }
  }`;
