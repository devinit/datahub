// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import * as React from 'react';
import { rehydrate } from 'glamor';
import { withRouter } from 'next/router';
import withData from '../src/components/WithData';
import App from '../src/components/templates/MultilateralProfile';

interface Props {
  router: {
    pathname: string;
    query: { id: string}
  };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withRouter(withData((props: Props) => <App id={ props.router.query.id } />));
