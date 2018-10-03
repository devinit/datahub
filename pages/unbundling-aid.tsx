import * as React from 'react';
import { rehydrate } from 'glamor';
import { withRouter } from 'next/router';
import withData from '../src/components/WithData';
import App from '../src/components/templates/UnbundlingAid';

interface Props {
  router: { pathname: string };
}

if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withRouter(withData((props: Props) =>
  <App
    pathname={ props.router.pathname }
    aidType="oda"
    title="Unbundling aid"
  />
));
