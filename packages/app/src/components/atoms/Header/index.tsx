import glamorous, {GlamorousComponent} from 'glamorous';
import { red, lightBlack } from '../../theme/semantic';
import {GlamorousComponentT} from '../../types';

export const Lead: GlamorousComponentT = glamorous.p({
  fontSize: '1.6em',
  fontWeight: 300,
});

export const HeaderGroup: GlamorousComponentT = glamorous.div({
  'marginTop': '2em',
  '& .header': {
    marginBottom: 0,
    marginTop: 0,
  },
});
export const SectionHeader: GlamorousComponent<any, any> =
glamorous.h2<{fontSize?: any; color?: string; fontColor?: any}>(
  {
    'padding': '1em 1em 1em 1em',
    'display': 'inline-block',
    'margin': 0,
    'letterSpacing': '1px',
    'lineHeight': 1,
    'textTransform': 'uppercase',
    '& span': {
      color: red,
    },
  },
  props => ({
    fontSize: props.fontSize || '1em',
    background: props.color || '#e9e7e8',
    color: props.fontColor || lightBlack,
  }),
);
