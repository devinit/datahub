// @flow
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {Button, Grid} from 'semantic-ui-react';
import React from 'react';

const LabelFilter = glamorous.div({
  fontStyle: 'italic',
  fontSize: '12px'
});
type Props = {
  onLevelChange: (value: string | void) => void,
  onScenarioChange: (value: string | void) => void,
  onYearChange: (value: string | void) => void
};
const controls = ({onLevelChange, onScenarioChange}: Props) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width="5">
        <LabelFilter>Level</LabelFilter>
        <Button attached="left" onClick={() => onLevelChange('global')}>Global</Button>
        <Button attached="right" basic onClick={() => onLevelChange('regional')}>Regional</Button>
      </Grid.Column>
      <Grid.Column width="5">
        <LabelFilter>Scenario</LabelFilter>
        <Button.Group>
          <Button onClick={() => onScenarioChange('worst')}>Worst case</Button>
          <Button onClick={() => onScenarioChange('baseline')} basic>Baseline</Button>
          <Button onClick={() => onScenarioChange('best')} basic>Best case </Button>
        </Button.Group>
      </Grid.Column>
      <Grid.Column width="5">
        <LabelFilter>Year</LabelFilter>
        Year
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default controls;
