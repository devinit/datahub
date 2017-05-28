// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import React from 'react';
import { rehydrate } from 'glamor';
import withData from 'lib/withData';
import Submit from 'components/organisms/Submit';
import PostList from 'components/organisms/PostList';
import App from 'components/templates/Generic';
import 'lib/offline-install'; // Get our service worker on the page

type Props = {
  url: {pathname: string}
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return (
    <App pathName={props.url.pathname}>
      <Submit />
      <PostList />
    </App>
  );
});
