import glamorous from 'glamorous';
import {mediaQueries} from 'components/theme';
import { lightBlack, lighterGrey } from 'components/theme/semantic';

export const WhiteBg = glamorous.div({
  background: '#fff',
  paddingTop: '1em',
  paddingBottom: '2em',
});
export const LightBg = glamorous.div({
  background: '#e9e7e8',
  paddingTop: '1em',
  paddingBottom: '2em',
});
export const DarkBg = glamorous.div({
  background: lightBlack,
  paddingTop: '2em',
  paddingBottom: '2em',
  textAlign: 'center',
});
export const MapBackground = glamorous.div({
  background: lighterGrey,
  width: '100%',
  height: '600px',
  [mediaQueries.tabs]: {
    height: '480px',
  },
});
