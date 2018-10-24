import gql from 'graphql-tag';
import { ChildProps } from 'react-apollo';

export const PRINT_NARRATIVES_QUERY = gql`
  query PrintNarratives($id: String!) {
    printNarratives(id: $id) {
      key
      value
      type
      next
    }
  }`;

export interface PrintNarrativesQueryVariables {
  id: string;
}

export interface PrintNarrative {
  key: string;
  value: string;
  type: string;
  next: string;
}

export interface PrintNarrativesQuery {
  printNarratives: [ PrintNarrative ];
}

export type PrintNarrativeProps = ChildProps<PrintNarrativesQueryVariables, PrintNarrativesQuery>;
