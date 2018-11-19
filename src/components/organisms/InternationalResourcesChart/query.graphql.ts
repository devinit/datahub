import gql from 'graphql-tag';

export const INTL_RESOURCES_QUERY =  gql`
  query ResourcesOverTime($id: String!) {
    internationalResources(id: $id) {
      startYear
      resourcesOverTime {
        data {
          uid
          year
          value
          flow_id
          flow_name
          short_name
          flow_category
          flow_type
          direction
          color
        }
        toolTip {
          heading
          source
        }
      }
    }
  }
`;
