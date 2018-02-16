import * as React from 'react';
import glamorous, {GlamorousComponent} from 'glamorous';
import { lighterGrey } from '../../theme/semantic';
import { Container, Grid } from 'semantic-ui-react';
import {KeyValue} from '../UnbundlingAidToolBarItem';
import ToolBar from '../UnbundlingAidToolBarItem';

const ToolBarContainer: GlamorousComponent<any, any> = glamorous.div<{compact?: boolean}>(
  {
    'background': lighterGrey,
    '& i.icon': {
      margin: '0 !important',
    },
  },
  props => ({
    padding: props.compact ? '1.76em 0' : '1em 0',
    fontSize: props.compact ? '1em' : '1.7em',
  }),
);

export interface Props  {
  aidType: string;
  compact?: boolean; // is in compare mode
  toolBarOptions: any;
  position?: number;
  rightPosition?: number;
  values?: KeyValue[];
  rightValues?: string[];
  onMove: (key: string) => void;
  onChange: (key: string) => (value: string) => void;
}

const InteractiveChartToolBar: React.SFC<Props> = (props) => {
  const { compact = false, position = 1, values = [] } = props;
  return (
    <ToolBarContainer compact={compact}>
      <Container>
        <Grid>
          <Grid.Row>
            <ToolBar
              aid={props.aidType.toUpperCase()}
              position={position}
              values={values}
              onChange={props.onChange}
              onMove={props.onMove}
              data={props.toolBarOptions}
              textAlign="center"
              width={16}
            />
          </Grid.Row>
        </Grid>
      </Container>
    </ToolBarContainer>
  );
};

export default InteractiveChartToolBar;
