// @flow
import React from 'react';
import { P } from 'glamorous';
import { Icon } from 'semantic-ui-react';
import ToolTip from 'components/molecules/ToolTip';

export type Props = {
  source?: string,
  heading?: string,
  color?: string
};

export const RegularToolTip = (props: {color?: string, text: string}) => {
  return (
    <ToolTip color={props.color || 'black'} trigger={<Icon name="info circle" />}>
      {props.text}
    </ToolTip>
  );
};
// $FlowFixMe
const TabsToolTip = (props: Props) => {
  return (
    props ?
      <ToolTip color={props.color || 'black'} trigger={<Icon name="info circle" />}>
        <P textAlign={'center'}>
          {props.heading}
        </P>
        <P fontSize="0.8em">
          <b>Source</b>: {props.source}
        </P>
      </ToolTip>
      : ''
  );
};
export default TabsToolTip;
