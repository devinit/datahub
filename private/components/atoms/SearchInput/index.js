import glamorous from 'glamorous';
import theme from 'components/theme';
import * as Input from './input';
import * as List from './list';

const SearchTitle = glamorous.div({
  backgroundColor: theme.black,
  fontSize: theme.big,
  textAlign: 'center',
  color: theme.plainWhite,
  fontWeight: '700',
  paddingTop: '1em',
  paddingBottom: '1em',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

export {
  Input,
  List,
  SearchTitle
};

