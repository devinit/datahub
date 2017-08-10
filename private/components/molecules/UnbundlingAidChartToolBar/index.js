// @flow
import React from 'react';
import glamorous from 'glamorous';
import { lightGrey } from 'components/theme/semantic';
import { Container, Grid } from 'semantic-ui-react';
import ToolBar from 'components/molecules/UnbundlingAidToolBarItem';

const ToolBarContainer = glamorous.div(
  {
    background: lightGrey,
    '& i.icon': {
      margin: '0 !important',
    },
  },
  props => ({
    fontSize: props.compact ? '1em' : '1.7em',
    paddingLeft: '0.5em',
    paddingTop: props.compact ? '.85em' : '.5em',
    paddingBottom: props.compact ? '.85em' : '.5em',
  }),
);

type Props = {
  compact?: boolean, // is in compare mode
  toolBarOptions: Object,
  position?: number,
  rightPosition?: number,
  values?: string[],
  rightValues?: string[],
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
              position={position}
              values={values}
              onChange={props.onChange}
              data={props.toolBarOptions}
              textAlign={compact ? 'left' : 'right'}
              width={compact ? 16 : 10}
            />
          </Grid.Row>
        </Grid>
      </Container>
    </ToolBarContainer>
  );
};

export default InteractiveChartToolBar;
