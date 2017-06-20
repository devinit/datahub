// @flow
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';
import React from 'react';
import { white } from 'components/theme/semantic';

const Wrapper = glamorous.div({
  color: white,
  fontWeight: '700',
  fontSize: '18px',
  '& select': {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: 0,
    padding: '.75em 2.25em .75em 1em',
    lineHeight: '1.5',
    transition: 'all .25s',
  }
});

type Props = {
  options: Array<Object>,
  onChange?: any,
};

const Select = ({options, onChange}: Props) => (
  <Wrapper>
    <select onChange={onChange}>
      {options.map(item => <option value={item.key} key={item.key}>{item.value}</option>)}
    </select>
    <Icon name="caret down" />
  </Wrapper>
);

export default Select;
