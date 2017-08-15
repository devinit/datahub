// @flow
import React from 'react';
import { P } from 'glamorous';
import { Icon } from 'semantic-ui-react';
import ToolTip from 'components/molecules/ToolTip';

type Props = {
  source: ?string,
  heading: ?string,
  color?: string
};

const TabsToolTip = (props: Props) => {
  return (
    <ToolTip color={props.color || 'black'} trigger={<Icon name="info circle" />}>
      <P textAlign={'center'}>
        {props.heading}
      </P>
      <P>
        <b>source</b>: {props.source}
      </P>
    </ToolTip>
  );
};

export default TabsToolTip;
