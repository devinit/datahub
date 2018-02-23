import * as React from 'react';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import dynamic, {DynamicOptions} from 'next/dynamic';

const dynamicOpts: DynamicOptions<any, any> = {
  loading: () => <MapBackground />,
  ssr: false,
  modules: props => ({
    Map: import('../../organisms/Map') as Promise<any>
    }),
  render: (props, {Map}) =>
    <div>
      <Map {...props} />
    </div>
};

export default dynamic(dynamicOpts as any);
