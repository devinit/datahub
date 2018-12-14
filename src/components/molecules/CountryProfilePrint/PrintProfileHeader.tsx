import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
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
    const pageIntro = getNarrativeValueByKey(this.props.printNarratives, 'p1_intro');

    return (
      <React.Fragment>
        <Grid.Row style={ { paddingTop: 0, paddingBottom: 0 } }>
          <Grid.Column>
            <PrintHeader>{ name }</PrintHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={ { paddingTop: 0 } }>
          <Grid.Column>
            <Narrative>{ pageIntro }</Narrative>
            <List>
              { this.getIntroBulletPoints() }
            </List>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }

  private getIntroBulletPoints() {
    const bulletPoints: string[] = [ 'p1_bullet1', 'p1_bullet2', 'p1_bullet3' ];

    return bulletPoints.map((point, index) =>
      <ListItem key={ index }>{ getNarrativeValueByKey(this.props.printNarratives, point) }</ListItem>
    );
  }
}

export default PrintProfileHeader;
