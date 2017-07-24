import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Spotlight Tabs live DONOT TEST', module)
  .addDecorator(withApolloProvider())
  .add('spotlight tabs', () => <TabsWithData country={'uganda'} id={'wakiso'} />);
