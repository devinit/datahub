import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '.';

storiesOf('Loader', module)
  .add('progress loader', () => {
    const props = {loading: true};
    return (<Loader {...props} />);
  });
