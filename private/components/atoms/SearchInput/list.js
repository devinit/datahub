import glamorous from 'glamorous';
import {big} from 'components/theme';
import {white} from 'components/theme/semantic';

export const List = glamorous.ul({
  borderRadius: '.125em',
  boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
  listStyleType: 'none',
  position: 'absolute',
  top: '-1.23em',
  width: '100%',
  paddingLeft: '0px',
  backgroundColor: white,
  maxHeight: '18em',
  overflowY: 'scroll',
  zIndex: 9999,
  '& li': {
    padding: '1em',
    fontWeight: '700',
    cursor: 'pointer',
  },
  '& li:hover': {
    backgroundColor: white,
  },
  '& li.active': {
    backgroundColor: white,
  }
});
