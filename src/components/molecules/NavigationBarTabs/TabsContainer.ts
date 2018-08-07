
import glamorous from 'glamorous';
import { lightBlack, white } from '../../theme/semantic';

export const TabsContainer = glamorous.ul({
  'listStyleType': 'none',
  'margin': 0,
  'padding': 0,
  'listStyle': 'none',
  'textAlign': 'center',
  'color': lightBlack,
  '& .active': {
    color: white,
    backgroundColor: lightBlack
  },
  '& li': {
    display: 'inline-flex'
  }
});
