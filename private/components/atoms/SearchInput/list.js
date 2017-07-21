import glamorous from 'glamorous';
import theme from 'components/theme';

export const List = glamorous.ul({
  borderRadius: '.125em',
  boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
  listStyleType: 'none',
  position: 'absolute',
  top: '-1.23em',
  width: '100%',
  paddingLeft: '0px',
  backgroundColor: theme.plainWhite,
  maxHeight: '18em',
  overflowY: 'scroll',
  '& li': {
    padding: '1em',
    fontWeight: '700',
    cursor: 'pointer',
  },
  '& li:hover': {
    backgroundColor: theme.white,
  },
  '& li.active': {
    backgroundColor: theme.white,
  }
});
