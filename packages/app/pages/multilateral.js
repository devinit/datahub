// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import React from 'react';
import { rehydrate } from 'glamor';
import withData from 'lib/withData';
import App from 'components/templates/MultilateralProfile';

type Props = {
  url: {
    pathname: string,
    query: { id: string}
  }
};
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return <App id={props.url.query.id} pathName={props.url.pathname} />;
});
