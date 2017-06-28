// @flow
import React from 'react';
import {Icon} from 'semantic-ui-react';
import glamorous from 'glamorous';
import {white, midWhite, black} from 'components/theme/semantic';

type Props = {
  visible: boolean,
  text: string,
  children: Array<any>,
};
const Wrapper = glamorous.div({
  background: white,
  position: 'absolute',
  width: '200px',
  zIndex: 1000000,
  textAlign: 'center',
}, (props) => ({
  display: props.visible ? 'block' : 'none'
}));
const Select = glamorous.select({
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '100%',
  lineHeight: '1.5',
  color: black,
  backgroundColor: midWhite,
  cursor: 'pointer',
  margin: '0px',
  padding: '0.75em 2.25em 0.75em 1em',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderImage: 'initial',
  borderRadius: '0.25em',
  outline: '0px',
  transition: 'all 0.25s',
  backgroundImage: 'none',
  boxSizing: 'border-box',
  boxShadow: 'none'
});
const Text = glamorous.select({
  display: 'inline-block',
  position: 'relative',
  fontSize: '22px',
  listStyle: 'none',
  padding: '5px',
  textAlignt: 'center'
});

const DropDown = ({visible, children, text}: Props) => {
  const options = children.map(item => <option key={item.value}>{item.name}</option>);
  return (<Wrapper visible={visible}>
    <Text>{text}</Text>
    <Select>
      {options}
    </Select>
  </Wrapper>);
};

export default DropDown;

