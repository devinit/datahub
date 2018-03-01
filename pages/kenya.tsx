import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import {StateToShare} from '../src/components/molecules/ChartShare';
import App from '../src/components/templates/RegionalProfile';

interface Props  {
  url: {
    pathname: string;
    query: { id: string, state: StateToShare};
  };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData((props: Props) =>
  (<App
    id={props.url.query.id}
    state={props.url.query.state}
    currencyCode="KES"
    currencyUSD="constant 2015 USD"
    country="kenya"
  />));
