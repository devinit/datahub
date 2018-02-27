import * as React from 'react';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Container';
import {OwnProps} from '.';
import dynamic, {DynamicOptions} from 'next/dynamic';

const dynamicOpts: DynamicOptions<any, any> = {
  loading: () => <MapBackground />,
  ssr: false,
  modules: props => ({
    Map: import('.') as Promise<any>
    }),
  render: (props, {Map}) => <Map {...props} />
};

export default dynamic(dynamicOpts as any) as React.StatelessComponent<OwnProps>;
