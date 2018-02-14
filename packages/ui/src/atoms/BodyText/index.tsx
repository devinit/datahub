import glamorous from 'glamorous';
import {GlamorousComponentT} from '../../types';

export const Lead: GlamorousComponentT  = glamorous.p({
  'fontSize': '1.5em',
  'textAlign': 'center',
  'fontWeight': 300,
  '& span': {
      paddingRight: '2px',
      paddingLeft: '2px',
      fontWeight: '600',
    }
});

export const TextBlock: GlamorousComponentT = glamorous.p({
  fontSize: '1.3em',
  paddingLeft: '1em',
  paddingRight: '1em',
  paddingTop: '1.1em',
  lineHeight: '1.5',
  fontWeight: 300,
});
