import glamorous from 'glamorous';
import theme from 'components/theme';
import {white} from 'components/theme/semantic';

export const FooterDiv = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.red,
});

export const FooterDisclaimer = glamorous.div({
  padding: 4,
  color: theme.white,
  paddingTop: '2em',
  paddingBottom: '2em'
});
export const TopFooter = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em'
});

export const BlackContainer = glamorous.div({
  backgroundColor: theme.black,
  width: '100%',
  flexDirection: 'row'
});
export const WhiteContainer = glamorous.div({
  backgroundColor: white,
  width: '100%',
  flexDirection: 'row',
  paddingTop: '20px',
  paddingBottom: '20px'
});

export const FooterHeader = glamorous.h4({
  display: 'block',
  color: theme.white,
  marginTop: '1em',
  marginBottom: '1em',
});
