// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import React from 'react';
import { rehydrate } from 'glamor';
import withData from 'lib/withData';
import type {StateToShare} from 'components/molecules/ChartShare';
import App from 'components/templates/Front';

type Props = {
  url: {
    pathname: string,
    query: { state: StateToShare},
  }
};
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return <App state={props.url.query.state} />;
});
