/**
 * used to create critical css
 * only has header and footer
 */
import * as React from 'react';
import { rehydrate } from 'glamor';
import App from '../src/components/templates/Generic';

interface Props  {
  url: { pathname: string };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default (props: Props) => {
  return <App pathname={'critical'}>
            <h2>for generating critical css</h2>
        </App>;
};
