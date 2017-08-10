// TODO:  Move some of the container like atoms into the container atom and
// just compose them from base containers
import glamorous from 'glamorous';
import { white, red, black } from 'components/theme/semantic';

export const FooterDiv = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: red,
  '& p': {
    color: white,
  },
});

export const FooterDisclaimer = glamorous.div({
  padding: 4,
  color: white,
  paddingTop: '2em',
  paddingBottom: '2em',
});
export const TopFooter = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em',
});

export const BlackContainer = glamorous.div({
  backgroundColor: black,
  width: '100%',
  flexDirection: 'row',
});
export const WhiteContainer = glamorous.div({
  backgroundColor: white,
  width: '100%',
  flexDirection: 'row',
  paddingTop: '20px',
  paddingBottom: '20px',
});

export const FooterHeader = glamorous.h3({
  display: 'block',
  color: white,
  marginTop: '1em',
  marginBottom: '1em',
});
