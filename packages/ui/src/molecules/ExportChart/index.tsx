import { Grid, Button, Icon } from 'semantic-ui-react';
import {printDiv as print} from '@devinit/dh-base/lib/utils';
import * as React from 'react';
import glamorous from 'glamorous';
import ChartShare, {NoBackground} from '../ChartShare';
import {StateToShare} from '../ChartShare';

type ViewFn = () => void;

interface Props  {
  printDiv?: string;
  onViewVisualization?: ViewFn;
  stateToShare?: StateToShare; // state to serialise
}

const Wrapper = glamorous.div({
  '& i': {
    fontSize: '1.48em'
  },
  ...NoBackground,
});

const onPrintClick = (divElem: string) => () => print(divElem);

const shouldVisualise = (onViewVisualization?: ViewFn) =>
  () => onViewVisualization ? onViewVisualization() : null;

const ExportChart = ({printDiv, stateToShare, onViewVisualization}: Props) =>
  (<Wrapper>
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column>
          <ChartShare className="no-background" label="Share" color="grey" stateToShare={stateToShare} size="medium" />
          {printDiv ?
            <Button onClick={onPrintClick(printDiv)} className="no-background" size="medium"color="grey">
              <Icon name="print" />
            </Button> : ''
          }
          <Button
            size="medium"
            color="grey"
            onClick={shouldVisualise(onViewVisualization)}
          >
            Using this visualisation
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>
  );

export default ExportChart;
