// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>
};

const HighLightByIncome = ({ onChange, options }: Props) => (
  <div>
    {options.map(item => <div key={item}><input onChange={onChange} type="checkbox" value={item} />{item}</div>)}
  </div>
);

export default HighLightByIncome;
