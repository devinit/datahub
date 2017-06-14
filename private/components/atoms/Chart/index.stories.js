import React from 'react';

import {storiesOf} from '@storybook/react';
import poverty from './poverty.story';
import resources from './resources.story';

const chartStories = storiesOf('Chart', module)
  .add('Poverty', () => poverty)
  .add('International Resources', () => resources);

export default chartStories;
