import React from 'react';

import { storiesOf } from '@storybook/react';
import { Icon } from 'semantic-ui-react';
import Button from '.';


storiesOf('Button', module)
  .add('with text', () => <Button content="Hello World" />)
  .add('With Primary Color', () => <Button primary content="Primary" />)
  .add('With Secondary Color', () => <Button secondary content="Secondary" />)
  .add('With Icon', () => (
    <Button>
      <Icon name="right arrow" />
    </Button>))
  .add('With Icon and Text', () => <Button>Continue <Icon name="right arrow" /></Button>)
  .add('With some emoji', () => <Button><span role="img" aria-label="emojis">😀 😎 👍 💯</span></Button>);
