import glamorous from 'glamorous';
import {white, black} from 'components/theme/semantic';
import {big} from 'components/theme';
import * as Input from './input';
import * as List from './list';

const SearchTitle = glamorous.div({
  backgroundColor: black,
  fontSize: big,
  textAlign: 'center',
  color: white,
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

