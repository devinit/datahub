import {Container, Grid} from 'semantic-ui-react';
import Contents from 'components/atoms/TooltipContents';
import Tooltip from 'components/atoms/Tooltip';
import Trigger from 'components/atoms/TooltipClickTrigger';
import React from 'react';

const logo = () => (
  <Tooltip>
    <Trigger>
      <div className="help-tip">?</div>
    </Trigger>
    <Contents>
      <div>
        <h1>This is the tooltip!</h1>
        <p>Tooltip body is a bit longer than title</p>
      </div>
    </Contents>
  </Tooltip>
);

export default logo;
