import glamorous from 'glamorous';
import theme from 'components/theme';
import {lightGrey, seaBackground, black} from 'components/theme/semantic';

export const Container = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: seaBackground,
});

export const GreyContainer = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: lightGrey,
});

export const RankingsTableContainer = glamorous.div({
  paddingLeft: '1em',
  paddingRight: '1em',
});

export const MapPlaceholder = glamorous(Container)({height: '600px'});
