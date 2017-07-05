// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import glamorous from 'glamorous';

export const ColorSpan = glamorous.span({
  display: 'inline-block',
  width: '10px',
  height: '10px',
}, (props) => ({
  backgroundColor: props.color || '#7f7f7f'
})
);

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>,
  colorBy: boolean
};

const HighlightRegion = ({ onChange, options, colorBy }: Props) => (
  <div>
    {options.map(item => <div key={item.name}><input onChange={onChange} type="checkbox" value={item.name} />{colorBy ? <ColorSpan color={item.color} /> : false}{item.name}</div>)}
  </div>
);

export default HighlightRegion;
