// @flow
import glamorous from 'glamorous';
import {Icon, Button, Select} from 'semantic-ui-react';
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
  },
  '& .ui.selection.dropdown': {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    minWidth: '1em',
    fontSize: '1.2em',
  },
  '& .ui.selection.dropdown .menu': {
    background: 'rgba(233,231,232,1)',
    border: 0,
    borderRadius: '3px',
    marginTop: '-60px',
    boxShadow: '0 1px 6px rgba(0,0,0,.3)',
  },
  '& .ui.selection.dropdown .menu>.item': {
    borderTop: 'none',
    display: 'block',
  },
  '& .ui.selection.visible.dropdown>.text:not(.default)': {
    color: '#fff'
  },
  '& .ui.selection.dropdown>.dropdown.icon': {
    opacity: 1
  }
});

type Props = {
  options: Array<Object>,
  onChange?: any,
};

const NavBarSelect = ({options, onChange}: Props) => (
  <Wrapper>
    <Select
      defaultValue={options[0].value}
      options={options.map(item => ({key: item.key, text: item.value, value: item.value}))}
    />
    <Button size="medium">Using this Visualization</Button>
  </Wrapper>
);

export default NavBarSelect;
