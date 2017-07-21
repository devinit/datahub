import glamorous from 'glamorous';
import theme from 'components/theme';
import {lightGrey} from 'components/theme/semantic';

export const GreyContainer = glamorous.div({
  backgroundColor: lightGrey,
  width: '100%',
  flexDirection: 'row'
});

export const RankingsTableContainer = glamorous.div({
  paddingLeft: '1em',
  paddingRight: '1em',
});

export const CardContainer = glamorous.div({
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  padding: '1.5em',
  overflow: 'visible',
  marginBottom: '4em'
});

export const MapPlaceholder = glamorous(GreyContainer)({height: '600px'});
