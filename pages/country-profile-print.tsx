import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../src/components/WithData';
import { StateToShare } from '../src/components/molecules/ChartShare';
import CountryProfilePrint from '../src/components/templates/CountryProfilePrint';
import { getCountry } from '../src/utils';

interface Props {
  url: {
    pathname: string;
    query: { id: string, state: StateToShare };
  };
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  const { id, state } = props.url.query;
  const country = getCountry(id);

  return <CountryProfilePrint id={ id } state={ state } country={ country }/>;
});