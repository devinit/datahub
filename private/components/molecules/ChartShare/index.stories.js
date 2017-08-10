import React from 'react';

import { storiesOf } from '@storybook/react';
import ChatShare from '.';

storiesOf('Chart share DontTest', module).add('ChatShare', () =>
  <ChatShare size="big" color="black" />,
);
