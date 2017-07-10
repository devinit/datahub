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
  year: string,
  level: string,
  scenario: string,
  onLevelChange: (value: string | void) => void,
  onScenarioChange: (value: string | void) => void,
  onYearChange: (value: string | void) => void
};
const controls = ({year, level, scenario, onLevelChange, onScenarioChange}: Props) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width="5">
        <LabelFilter>Level</LabelFilter>
        <Button
          attached="left"
          onClick={() => onLevelChange('global')}
          basic={level === 'regional'}
        >
          Global
        </Button>
        <Button
          attached="right"
          onClick={() => onLevelChange('regional')}
          basic={level === 'global'}
        >
          Regional
        </Button>
      </Grid.Column>
      <Grid.Column width="5">
        <LabelFilter>Scenario</LabelFilter>
        <Button.Group>
          <Button
            onClick={() => onScenarioChange('Worst case')}
            basic={scenario !== 'Worst case'}
          >
            Worst case
          </Button>
          <Button
            onClick={() => onScenarioChange('Baseline')}
            basic={scenario !== 'Baseline'}
          >
            Baseline
          </Button>
          <Button
            onClick={() => onScenarioChange('Best case')}
            basic={scenario !== 'Best case'}
          >
            Best case
          </Button>
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
