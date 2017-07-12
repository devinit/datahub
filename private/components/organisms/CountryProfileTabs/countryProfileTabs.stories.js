import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import TabsWithData from '.';

storiesOf('Country Profiles live DONOT TEST', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles tabs', () => <TabsWithData id={'uganda'} />);
