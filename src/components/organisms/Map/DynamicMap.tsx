import * as React from 'react';
import { MapBackground } from '../../atoms/Container';
import {OwnProps} from '.';
import dynamic, {DynamicOptions} from 'next/dynamic';

const dynamicOpts: DynamicOptions<any, any> = {
  loading: () => <MapBackground />,
  ssr: false,
  modules: () => ({
    Map: import('.') as Promise<any>
    }),
  render: (props, {Map}) => <Map {...props} />
};

export default dynamic(dynamicOpts as any) as React.StatelessComponent<OwnProps>;
