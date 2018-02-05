// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '@devinit/dh-base/lib/withData';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import App from '../components/templates/CountryProfile';

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
  rehydrate(window.__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return <App id={props.url.query.id} state={props.url.query.state} />;
});
