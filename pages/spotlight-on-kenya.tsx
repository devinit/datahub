import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import { withRouter } from 'next/router';
import { StateToShare } from '../src/components/molecules/ChartShare';
import App from '../src/components/templates/Spotlight';

interface Props  {
  router: {
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

export default withRouter(withData((props: Props) =>
  <App pathname={ props.router.pathname } state={ props.router.query.state } id="kenya" />
));
