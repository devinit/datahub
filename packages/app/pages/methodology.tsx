import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import App from '../src/components/templates/Methodology';

interface Props  {
  url: { pathname: string };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return <App />;
});
