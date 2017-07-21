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

<<<<<<< HEAD
export const CardContainer = glamorous.div({
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  padding: '1.5em',
  overflow: 'visible',
  marginBottom: '4em'
});

export const MapPlaceholder = glamorous(GreyContainer)({height: '600px'});
=======
export const MapPlaceholder = glamorous(Container)({height: '600px'});
>>>>>>> maps-dev
