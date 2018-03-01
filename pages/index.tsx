import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import {StateToShare} from '../src/components/molecules/ChartShare';
import App from '../src/components/templates/Front';

interface Props  {
  url: {
    pathname: string;
    query: { state: StateToShare};
  };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return <App state={props.url.query.state} />;
});
