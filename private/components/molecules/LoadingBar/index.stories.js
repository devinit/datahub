import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '.';

storiesOf('Loader', module)
  .add('progress loader', () => {
    const props = {loading: true};
    setTimeout(() => {
      props.loading = false;
    }, 8000);
    return (<Loader {...props} />);
  });
