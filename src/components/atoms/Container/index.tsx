import glamorous, { GlamorousComponent } from 'glamorous';
import { lightBlack, lightGrey, lighterGrey, seaBackground, white } from '../../theme/semantic';
import { GlamorousComponentT } from '../../types';
import { mediaQueries } from '../../theme';

export const Container: GlamorousComponentT = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: seaBackground
});

export const GreyContainer: GlamorousComponentT = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: lightGrey
});

export const RankingsTableContainer: GlamorousComponentT = glamorous.div({
  'paddingLeft': '2em',
  'paddingRight': '2em',
  '& a': {
    cursor: 'pointer'
  },
  '& td': {
    padding: '0.5em 0.75em !important'
  },
  'marginBottom': '2em'
});
export const PrintContainer: GlamorousComponentT = glamorous.div({
  'display': 'none',
  '@media print': {
    display: 'block !important'
  }
});
export const CardContainer: GlamorousComponentT = glamorous.div({
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  padding: '1.5em',
  marginBottom: '0em',
  height: '480px'
});
export const ProfileHeader: GlamorousComponentT = glamorous.div({
  'height': '420px', // TODO -- use media queries
  'overflow': 'hidden',
  'borderBottom': `1px solid ${lightGrey}`,
  'background': white,
  'position': 'relative',
  ' & .ui.grid': {
    height: 0
  },
  '& .ui.container': {
    height: 0
  }
});
// TODO use media queries
export const MapPlaceholder: GlamorousComponentT = glamorous(GreyContainer)({ height: '600px' });

export const NoDataAvailableContainer: GlamorousComponentT = glamorous.div({
  padding: '2em',
  fontSize: '1.4em'
});

export const WhiteBg: GlamorousComponent<{}, any> = glamorous.div({
  background: '#fff',
  paddingTop: '1em',
  paddingBottom: '2em'
});

export const LightBg: GlamorousComponent<{}, any> = glamorous.div({
  background: lighterGrey,
  paddingTop: '1em',
  paddingBottom: '2em'
});
export const DarkBg: GlamorousComponent<{}, any> = glamorous.div({
  background: lightBlack,
  paddingTop: '2em',
  paddingBottom: '2em',
  textAlign: 'center'
});
export const MapBackground: GlamorousComponent<{}, any> = glamorous.div({
  background: lighterGrey,
  width: '100%',
  height: '600px',
  [mediaQueries.tabs]: {
    height: '480px'
  }
});
