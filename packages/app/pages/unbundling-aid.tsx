import * as React from 'react';
import { rehydrate } from 'glamor';
import withData from '../components/WithData';
import App from '../components/templates/UnbundlingAid';

interface Props  {
  url: { pathname: string };
}

if (typeof window !== 'undefined') {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

export default withData((props: Props) => {
  return (<App
      pathname={props.url.pathname}
      aidType="oda"
      title="Unbundling aid"
  />);
});
