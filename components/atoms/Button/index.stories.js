import React from 'react';

import { storiesOf } from '@storybook/react';
import {Icon} from 'semantic-ui-react';
import "../../../semantic/dist/semantic.min.css";
import Button from '.';

storiesOf('Button', module)
  .add('with text', () => <Button content="Hello World"/>)
  .add('with Icons', () => <Button>
						        <Icon name='right arrow'/>
						    </Button>)
  .add('with some emoji', () => <Button><span role="img" aria-label="emojis">😀 😎 👍 💯</span></Button>);
