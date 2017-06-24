import glamorous from 'glamorous';
import theme from 'components/theme';
import {lightGrey} from 'components/theme/semantic';

export const GreyContainer = glamorous.div({
  backgroundColor: lightGrey,
  width: '100%',
  flexDirection: 'row'
});

export const MapPlaceholder = glamorous(GreyContainer)({height: '600px'});
