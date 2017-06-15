import React from 'react';

import { storiesOf } from '@storybook/react';
import { Icon } from 'semantic-ui-react';
import Button from '.';


storiesOf('Button', module)
  .add('With Primary Color', () => <Button primary content="Primary" />)
  .add('With Secondary Color', () => <Button secondary content="Secondary" />);
