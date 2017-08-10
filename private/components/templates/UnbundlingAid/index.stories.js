import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Aid from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Unbundling Aid ODA', () => <Aid aidType="oda" />)
  .add('Unbundling Aid OOF', () => <Aid aidType="oof" />);
