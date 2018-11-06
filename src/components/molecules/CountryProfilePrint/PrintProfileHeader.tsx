import * as React from 'react';
import { List, ListItem, Narrative, PrintHeader, TableCell } from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';
import { getNarrativeByKey } from '../../../utils/print-narratives';
interface Props {
  country: Country;
  printNarratives: PrintNarrative[];
}
export class PrintProfileHeader extends React.Component<Props> {
  render() {
    const { name } = this.props.country;
    const pageIntro = getNarrativeByKey(this.props.printNarratives, 'page1_intro');

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

  private getIntroBulletPoints() {
    let activePointKey = 'page1_intro_bullet1';
    const bulletPoints: string[] = [];
    while (activePointKey) {
      const point = getNarrativeByKey(this.props.printNarratives, activePointKey);
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

export default PrintProfileHeader;
