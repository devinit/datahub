import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import App from '../src/components/templates/WhereAreThePoor';

if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData(() => {
  return <App />;
});
