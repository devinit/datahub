import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SmallMap from '.';

storiesOf('Base Maps', module)
  .add('world map centered on uganda', () => <SmallMap slug={'uganda'} />)
  .add('uganda map centered on wakiso', () =>
    <SmallMap slug={'wakiso'} spotlightCountry={'uganda'} />,
  )
  .add('kenya map centered on nairobi', () =>
    <SmallMap slug={'nairobi'} spotlightCountry="kenya" />,
  )
  .add('world map centered on inda', () => <SmallMap slug={'india'} />);
