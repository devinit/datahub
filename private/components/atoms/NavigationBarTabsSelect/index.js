// @flow
import glamorous from 'glamorous';
import {Icon, Button} from 'semantic-ui-react';
import React from 'react';
import { white } from 'components/theme/semantic';

const Wrapper = glamorous.div({
  color: white,
  '& i': {
    fontWeight: '700',
    fontSize: '18px',
  },
  '& .ui.button': {
    paddingTop: '.5em',
    paddingBottom: '.5em',
    paddingRight: '.85em',
    paddingLeft: '0.75em',
  },
  '& select': {
    fontWeight: '700',
    fontSize: '18px',
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: 0,
    padding: '.25em 0em .25em .25em',
    lineHeight: '1.5',
    transition: 'all .25s',
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    outline: 0,
    appearance: 'none',
  }
});

export type Option = {|
  key: string,
  value: string
|}

export type Props = {
  options: Array<Option>,
  onChange?: ((event: any) => void)
}

const Select = ({options, onChange}: Props) => (
  <Wrapper>
    <select onChange={event => onChange ? onChange(event) : false}>
      {options.map(item => <option value={item.key} key={item.key}>{item.value}</option>)}
    </select>
    <Icon name="caret down" />
    <Button size="medium">Using this Visualization</Button>
  </Wrapper>
);

export default Select;
