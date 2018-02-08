import { Grid, Button, Icon } from 'semantic-ui-react';
import {printDiv as print} from '@devinit/dh-base/lib/utils';
// import { lighterGrey} from '../../theme/semantic';
import * as React from 'react';
import glamorous from 'glamorous';
import ChartShare, {NoBackground} from '../ChartShare';
import {StateToShare} from '../ChartShare';

type _click = (value: string) => void;
type view = () => void;
interface Props  {
  printDiv: _click;
  onViewVisualization?: view;
  stateToShare?: StateToShare; // state to serialise
}
const Wrapper = glamorous.div({
  '& i': {
    fontSize: '1.48em'
  },
  ...NoBackground,
});
const click = (onClick: _click) => (e, item) => onClick(item.value);
const visualisation = () => (e, onClick: view) => { if (onClick) onClick(); };

const ExportChart = ({printDiv, stateToShare, onViewVisualization}: Props) =>
  (<Wrapper>
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column>
          <ChartShare className="no-background" label="Share" color="grey" stateToShare={stateToShare} size="medium" />
          <Button onClick={click(printDiv)} className="no-background" size="medium"color="grey">
            <Icon name="print" />
          </Button>
          <Button
            size="medium"
            color="grey"
            onClick={visualisation}
          >
            Using this visualisation
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>
  );

export default ExportChart;
