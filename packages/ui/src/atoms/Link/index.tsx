import glamorous from 'glamorous';
import { white, lighterGrey, grey, black, red} from '../../theme/semantic';
import { medium } from '../../theme';
import {GlamorousComponentT} from '../../types';

export const FooterLink: GlamorousComponentT = glamorous.a({
  fontSize: medium,
  display: 'block',
  color: lighterGrey,
  paddingBottom: '.5em',
  paddingTop: '.5em',
});

export const NavLink: GlamorousComponentT = glamorous.div({
  'color': white,
  'fontWeight': 700,
  'textAlign': 'center',
  'transition': 'all .3s',
  ':hover': {
    color: white,
  },
});
export const BodyLink: GlamorousComponentT = glamorous.a({
  'color': red,
  'fontWeight': 500,
  'cursor': 'pointer',
  ':hover': {
    color: red,
  },
});
export const SocialMediaLink: GlamorousComponentT = glamorous.a({
  display: 'inline-block',
  color: black,
  border: `2px solid ${grey}`,
  borderRadius: '50%',
  fontSize: '1.5em',
  height: '2.5em',
  width: '2.5em',
  background: '0 0',
  lineHeight: '2.3em',
  textAlign: 'center',
  boxSizing: 'border-box',
  paddingLeft: '3px',
  marginLeft: '5px',
});
