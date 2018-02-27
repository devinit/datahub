import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from 'semantic-ui-react';
import TooltipTest from '.';

storiesOf('Tooltip', module).add('Tooltip Test', () =>
  <TooltipTest trigger={<span><Icon name="file" />File </span>}>Simple Tooltip</TooltipTest>,
);
