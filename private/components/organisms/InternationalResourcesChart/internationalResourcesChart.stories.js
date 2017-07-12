import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import InternationalResourcesChart from '.';

storiesOf('International Resources chart live DONOT TEST', module)
  .addDecorator(withApolloProvider())
  .add('Area treemap Chart', () => <InternationalResourcesChart id={'uganda'} />);
