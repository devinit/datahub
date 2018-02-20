import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '.';

const options = [
  {
    key: 'al',
    value: 'al',
    text: 'Albama'
  },
  {
    key: 'BS',
    value: 'BS',
    text: 'BushB'
  },
  {
    key: 'Sl',
    value: 'Sl',
    text: 'Salmona'
  }];
const toolTip = {
  heading: 'Heading',
  source: 'source'
};

storiesOf('Navbar tabs', module)
  .add('Select Dropdown', () =>
    (<Select
      options={options}
      activeIndicator={'al'}
      toolTip={toolTip}
      onUsingThisVizHandler={console.info}
      onChange={console.info}
      showUsingThisViz
    />));
