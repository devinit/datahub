// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const ColorBy = ({ onChange, options }: Props) => (
  <div>
    <span>Color By</span>
    <Dropdown onClick={onChange} options={options} />
  </div>
);

export default ColorBy;
