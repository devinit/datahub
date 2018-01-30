// @flow
import React from 'react';
import glamorous from 'glamorous';
import { lighterGrey } from 'components/theme/semantic';
import { Container, Grid } from 'semantic-ui-react';
import type {Value} from 'components/molecules/UnbundlingAidToolBarItem';
import ToolBar from 'components/molecules/UnbundlingAidToolBarItem';

const ToolBarContainer = glamorous.div(
  {
    background: lighterGrey,
    '& i.icon': {
      margin: '0 !important',
    },
  },
  props => ({
    padding: props.compact ? '1.76em 0' : '1em 0',
    fontSize: props.compact ? '1em' : '1.7em',
  }),
);

type Props = {
  aidType: string,
  compact?: boolean, // is in compare mode
  toolBarOptions: Object,
  position?: number,
  rightPosition?: number,
  values?: Value[],
  rightValues?: string[],
  onMove?: (key: string) => void,
  onChange?: (key: string, value: string) => void,
  onRightChange?: (key: string, value: string) => void,
};
const InteractiveChartToolBar = (props: Props) => {
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
