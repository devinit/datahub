import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ChartShare from '.';

storiesOf('Chart share', module).add('ChatShare', () =>
  <ChartShare size="big" color="black" />,
);
