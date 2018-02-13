import glamorous, {GlamorousComponent} from 'glamorous';
import {mediaQueries} from '../../theme';
import { lightBlack, lighterGrey } from '../../theme/semantic';

export const WhiteBg: GlamorousComponent<{}, any> = glamorous.div({
  background: '#fff',
  paddingTop: '1em',
  paddingBottom: '2em',
});

export const LightBg: GlamorousComponent<{}, any> = glamorous.div({
  background: lighterGrey,
  paddingTop: '1em',
  paddingBottom: '2em',
});
export const DarkBg: GlamorousComponent<{}, any> = glamorous.div({
  background: lightBlack,
  paddingTop: '2em',
  paddingBottom: '2em',
  textAlign: 'center',
});
export const MapBackground: GlamorousComponent<{}, any> = glamorous.div({
  background: lighterGrey,
  width: '100%',
  height: '600px',
  [mediaQueries.tabs]: {
    height: '480px',
  },
});
