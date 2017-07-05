// @flow
import React from 'react';
import { Header } from 'semantic-ui-react';
import glamorous from 'glamorous';
import {Wrapper} from 'components/atoms/BubbleSizeDropDown';

export const ColorSpan = glamorous.span({
  display: 'inline-block',
  width: '10px',
  height: '10px',
}, (props) => ({
  backgroundColor: props.color || '#7f7f7f',
  marginLeft: '2px'
})
);

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>,
  colorBy: boolean
};

const HighlightRegion = ({ onChange, options, colorBy }: Props) => (
  <Wrapper>
    <Header as="h4">Highlight by Region</Header>
    {options.map(item => <div key={item.name}><input onChange={onChange} type="checkbox" value={item.name} />{colorBy ? <ColorSpan color={item.color} /> : false}{item.name}</div>)}
  </Wrapper>
);

export default HighlightRegion;
