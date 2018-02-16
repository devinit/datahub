import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Main from '.';

storiesOf('Templates', module).add('Main Generic',
    () => <Main pathname="home"> <h2>Generic Template </h2></Main>);
