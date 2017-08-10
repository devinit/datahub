// @flow
import glamorous from 'glamorous';
import { Button, Grid } from 'semantic-ui-react';
import React from 'react';
import YearSlider from '../PoorVizYearSlider';

const LabelFilter = glamorous.div({
  fontStyle: 'italic',
  fontSize: '12px',
});
type Props = {
  year: string,
  level: string,
  scenario: string,
  onLevelChange: (value: string | void) => void,
  onScenarioChange: (value: string | void) => void,
  onYearChange: (value: number) => void,
};
const controls = ({ level, scenario, onLevelChange, onYearChange, onScenarioChange }: Props) =>
  (<Grid>
    <Grid.Row>
      <Grid.Column width="5">
        <LabelFilter>Level</LabelFilter>
        <Button.Group basic>
          <Button onClick={() => onLevelChange('global')} active={level === 'global'}>
            Global
          </Button>
          <Button onClick={() => onLevelChange('regional')} active={level === 'regional'}>
            Regional
          </Button>
        </Button.Group>
      </Grid.Column>
      <Grid.Column width="5">
        <LabelFilter>Scenario</LabelFilter>
        <Button.Group basic>
          <Button onClick={() => onScenarioChange('Worst case')} active={scenario === 'Worst case'}>
            Worst case
          </Button>
          <Button onClick={() => onScenarioChange('Baseline')} active={scenario === 'Baseline'}>
            Baseline
          </Button>
          <Button onClick={() => onScenarioChange('Best case')} active={scenario === 'Best case'}>
            Best case
          </Button>
        </Button.Group>
      </Grid.Column>
      <Grid.Column width="5">
        <LabelFilter>Year</LabelFilter>
        <YearSlider onYearChange={year => onYearChange(year)} />
      </Grid.Column>
    </Grid.Row>
  </Grid>);

export default controls;
