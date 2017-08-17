// @flow
import { Grid, Button, Icon } from 'semantic-ui-react';
import {printDiv as print} from 'lib/utils';
// import { lighterGrey} from 'components/theme/semantic';
import React from 'react';
import glamorous from 'glamorous';
import {lightSecondaryColor} from 'components/theme/semantic';
import type {StateToShare} from '../ChartShare';
import ChartShare from '../ChartShare';

type Props = {
  printDiv: string,
  onViewVisualization?: () => void,
  stateToShare?: StateToShare // state to serialise
}
const Wrapper = glamorous.div({
  '& i': {
    fontSize: '1.48em'
  },
  '& .no-background:hover': {
    boxShadow: '0 1px 6px rgba(0,0,0,.3)'
  },
  '& .no-background': {
    backgroundColor: 'transparent !important',
    color: `${lightSecondaryColor} !important`,
  }
});
const ExportChart = ({printDiv, stateToShare, onViewVisualization}: Props) =>
  (<Wrapper>
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column>
          <ChartShare className="no-background" label="Share" color="grey" stateToShare={stateToShare} size="medium" />
          <Button onClick={() => print(printDiv)} className="no-background" size="medium"color="grey">
            <Icon name="print" />
          </Button>
          <Button
            size="medium"
            color="grey"
            onClick={() => {
              if (onViewVisualization) {
                onViewVisualization();
              }
            }
            }
          >
            Using this visualisation
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>
  );

export default ExportChart;
