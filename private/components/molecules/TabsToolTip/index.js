// @flow
import React from 'react';
import {Div} from 'glamorous';
import {Icon} from 'semantic-ui-react';
import ToolTip from 'components/molecules/ToolTip';

type Props = {
  source: ? string,
  heading: ? string
}

const TabsToolTip = (props: Props) => {
  return (
    <Div display="inline-block">
      <ToolTip trigger={<Icon name="info circle" />}>
        <div textAlign={'center'}>
          <p>{props.heading}</p>
          <p><b>source</b>: {props.source}</p>
        </div>
      </ToolTip>
    </Div>
  );
};

export default TabsToolTip;
