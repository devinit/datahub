import React from 'react';
import { storiesOf } from '@storybook/react';
import SmallMap from '.';


storiesOf('Base Maps', module)
  .add('world map centered on uganda', () => <SmallMap slug={'uganda'} />);

