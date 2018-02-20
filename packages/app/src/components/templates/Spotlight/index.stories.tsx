import * as React from 'react';
import withApolloAndReduxProvider from '../../../storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Spotlight from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Spot Light Uganda', () => <Spotlight pathname="spotlight-on-uganda" state={{year: 2015}} id="uganda" />)
  .add('Spot Light Kenya', () => <Spotlight pathname="spotlight-on-kenya" state={{}} id="kenya" />);
