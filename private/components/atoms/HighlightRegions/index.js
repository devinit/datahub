// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import glamorous from 'glamorous';

const ColorSpan = glamorous.span({
  display: 'inline-block',
  width: '10px',
  height: '10px',
}, (props) => ({
  backgroundColor: props.color || '#7f7f7f'
})
);

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>
};

const HighlightRegion = ({ onChange, options }: Props) => (
  <div>
    {options.map(item => <div key={item.name}><input onChange={onChange} type="checkbox" value={item.name} /><ColorSpan color={item.color} />{item.name}</div>)}
  </div>
);

export default HighlightRegion;
