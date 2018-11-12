import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { getNarrativeByKey } from '../../../utils/print-narratives';
import { List, ListItem, Narrative, PrintHeader } from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';
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
        <Grid.Row style={ { paddingTop: 0, paddingBottom: 0 } }>
          <Grid.Column>
            <PrintHeader>{ name }</PrintHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={ { paddingTop: 0 } }>
          <Grid.Column>
            <Narrative>{ pageIntro ? pageIntro.value : '' }</Narrative>
            <List>
              { this.getIntroBulletPoints() }
            </List>
          </Grid.Column>
        </Grid.Row>
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
