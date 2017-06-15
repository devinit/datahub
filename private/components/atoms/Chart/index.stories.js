import React from 'react';

import {storiesOf} from '@storybook/react';
import poverty from './poverty.story';
import resources from './resources.story';
import govtrfe from './govt-revenue-finance-expenditure.story';

const chartStories = storiesOf('Chart', module)
  .add('Poverty', () => poverty)
  .add('International Resources', () => resources)
  .add('Government revenue, financing and expenditure', () => govtrfe);

export default chartStories;
