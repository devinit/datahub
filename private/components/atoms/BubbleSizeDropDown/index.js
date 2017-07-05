// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const bubbleChartSize = ({ onChange, options }: Props) => (
  <div>
    <span>Bubble size</span>
    <Dropdown onClick={onChange} options={options} />
  </div>
);

export default bubbleChartSize;
