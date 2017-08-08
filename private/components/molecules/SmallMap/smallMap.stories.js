import React from 'react';
import { storiesOf } from '@storybook/react';
import SmallMap from '.';


storiesOf('Base Maps', module)
  .add('world map centered on uganda', () => <SmallMap slug={'uganda'} />)
  .add('uganda map centered on wakiso', () => <SmallMap slug={'wakiso'} spotlightCountry={'uganda'} />)
  .add('world map centered on inda', () => <SmallMap slug={'india'} />);

