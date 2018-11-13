import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { Narrative, SectionTitle } from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';

export interface SectionThreeProps {
  country?: Country;
  narratives: PrintNarrative[];
}

export class SectionThree extends React.Component<SectionThreeProps> {
  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            <SectionTitle>ODA</SectionTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={ { paddingTop: 0 } }>
          <Grid.Column>
            <Narrative>{ getNarrativeValueByKey(this.props.narratives, 'page3_section1_narrative') }</Narrative>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
