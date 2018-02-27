import * as React from 'react';
import { P } from 'glamorous';
import { Icon } from 'semantic-ui-react';
import ToolTip from '../Basic';

export interface Props  {
  source?: string;
  heading?: string;
  color?: string;
}

export const RegularToolTip = (props: {color?: string, text: string}) => {
  return (
    <ToolTip color={props.color || 'black'} trigger={<Icon name="info circle" />}>
      {props.text}
    </ToolTip>
  );
};

const TabsToolTip = (props) => {
  if (props === null) return <p>''</p>;
  return (
      <ToolTip color={props.color || 'black'} trigger={<Icon name="info circle" />}>
        <P textAlign={'center'}>
          {props.heading}
        </P>
        <P fontSize="0.8em">
          <b>Source</b>: {props.source}
        </P>
      </ToolTip>
  );
};
export default TabsToolTip;
