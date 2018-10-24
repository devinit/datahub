import * as React from 'react';
import { graphql } from 'react-apollo';
import { List, ListItem, Narrative, PrintHeader, TableCell } from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import {
  PRINT_NARRATIVES_QUERY,
  PrintNarrative,
  PrintNarrativeProps,
  PrintNarrativesQuery
} from './graphql';
interface Props extends PrintNarrativeProps {
  country: Country;
}
export class PrintProfileHeader extends React.Component<Props> {
  render() {
    const { name } = this.props.country;
    const pageIntro = this.getNarrativeByKey('page1_intro');

    return (
      <React.Fragment>
        <tr>
            <TableCell colSpan={ 4 }>
              <PrintHeader>{ name }</PrintHeader>
            </TableCell>
          </tr>
          <tr>
            <TableCell colSpan={ 4 }>
              <Narrative>{ pageIntro ? pageIntro.value : '' }</Narrative>
              <List>
                { this.getIntroBulletPoints() }
              </List>
            </TableCell>
          </tr>
      </React.Fragment>
    );
  }

  private getNarrativeByKey(key: string): PrintNarrative | null {
    if (this.props.data) {
      const { printNarratives } = this.props.data;

      if (printNarratives) {
        return printNarratives.find(item => item.key === key) || null;
      }
    }

    return null;
  }

  private getIntroBulletPoints() {
    let activePointKey = 'page1_intro_bullet1';
    const bulletPoints: string[] = [];
    while (activePointKey) {
      const point = this.getNarrativeByKey(activePointKey);
      if (point) {
        bulletPoints.push(point.value);
        activePointKey = point.next;
      } else {
        activePointKey = '';
      }
    }

    return bulletPoints.map((point, index) => <ListItem key={ index }>{ point }</ListItem>);
  }
}

const withData = graphql<PrintNarrativesQuery, Props, PrintNarrativeProps>(
  PRINT_NARRATIVES_QUERY,
  {
    options: props => {
      return {
        variables: { id: props.id }
      };
    }
  });

export default withData(PrintProfileHeader);
