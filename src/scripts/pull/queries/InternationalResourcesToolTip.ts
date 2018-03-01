import gql from 'graphql-tag';

export const INTL_RESOURCES_TOOLTIP_QUERY = gql`
  query ResourcesOverTimeToolTip($id: String!) {
    internationalResources(id: $id) {
      resourcesOverTime {
        toolTip {
          heading
          source
        }
      }
    }
  }`;
