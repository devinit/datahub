import gql from 'graphql-tag';

export const METHODOLOGY_QUERY = gql`
query Methodology($moduleName: String!) {
  methodology(moduleName: $moduleName){
    name
    description
    methodology
    uom
    csv
    zip
    source {
      name
      link
    }
  }
}`;
