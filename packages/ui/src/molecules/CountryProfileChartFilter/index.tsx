import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';
import { white, lightBlack } from '../../theme/semantic';
import {GlamorousComponentT} from '../../types';

const Wrapper: GlamorousComponentT = glamorous.div({
  paddingTop: '1em',
});

export const Select: GlamorousComponentT = glamorous.select({
  'display': 'inline-block',
  'verticalAlign': 'middle',
  'margin': 0,
  'padding': '.75em 2.25em .75em 1em',
  'lineHeight': '1.5',
  'color': lightBlack,
  'backgroundColor': white,
  'border': '2px solid transparent',
  'borderRadius': '.25em',
  'cursor': 'pointer',
  'outline': 0,
  'appearance': 'none',
  'transition': 'all .25s',
  ':after': {
    position: 'absolute',
    top: '50%',
    right: '1.25em',
    display: 'inline-block',
    content: '',
    width: 0,
    height: 0,
    marginTop: '-.15em',
    pointerEvents: 'none',
    borderTop: '.35em solid',
    borderRight: '.35em solid transparent',
    borderBottom: '.35em solid transparent',
    borderLeft: '.35em solid transparent',
    transform: 'scale(1.2,1.2)',
  },
});
const ChartFilter = () =>
  (<Wrapper>
    <span>Budget Type</span>
    <Select>
      <option>Actual</option>
      <option>Budget</option>
    </Select>
    <span>Currency</span>
    <Select>
      <option>constant 2015 US$</option>
      <option>currency UGX</option>
    </Select>
  </Wrapper>);

export default ChartFilter;
