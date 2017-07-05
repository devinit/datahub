// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import {ColorSpan} from 'components/atoms/HighlightRegions';


type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>,
  colorBy: boolean
};

const HighlightByIncome = ({ onChange, options, colorBy }: Props) => (
  <div>
    {options.map(item => <div key={item.name}><input onChange={onChange} type="checkbox" value={item.name} />{colorBy ? <ColorSpan color={item.color} /> : false}{item.name}</div>)}
  </div>
);

export default HighlightByIncome;
