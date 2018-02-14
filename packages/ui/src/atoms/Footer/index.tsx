// TODO:  Move some of the container like atoms into the container atom and
// just compose them from base containers
import glamorous from 'glamorous';
import { white, red, black } from '../../theme/semantic';
import {GlamorousComponentT} from '../../types';

export const FooterDiv: GlamorousComponentT = glamorous.div({
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'backgroundColor': red,
  '& p': {
    color: white,
  },
});

export const FooterDisclaimer: GlamorousComponentT = glamorous.div({
  'padding': 4,
  'color': white,
  'paddingTop': '2em',
  'paddingBottom': '2em',
  '& a': {
    color: white,
  },
});
export const TopFooter: GlamorousComponentT = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em',
});

export const BlackContainer: GlamorousComponentT = glamorous.div({
  'backgroundColor': black,
  'width': '100%',
  'flexDirection': 'row',
  '& a': {
    color: white,
  },
  '& a:hover': {
    color: red,
  },
});
export const WhiteContainer: GlamorousComponentT = glamorous.div({
  backgroundColor: white,
  width: '100%',
  flexDirection: 'row',
  paddingTop: '20px',
  paddingBottom: '20px',
});

export const FooterHeader: GlamorousComponentT = glamorous.h3({
  display: 'block',
  color: white,
  marginTop: '1em',
  marginBottom: '1em',
});
