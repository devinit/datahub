import glamorous, { GlamorousComponent } from 'glamorous';
import { lighterGrey, midWhite, red, white } from '../../theme/semantic';
import { big } from '../../theme';
import { GlamorousComponentT } from '../../types';

export const List: GlamorousComponentT = glamorous.ul({
  'borderRadius': '.125em',
  'boxShadow': '0 .125em .125em 0 rgba(0,0,0,.2)',
  'listStyleType': 'none',
  'position': 'absolute',
  'top': '-2em',
  'width': '100%',
  'paddingLeft': '0px',
  'backgroundColor': white,
  'maxHeight': '18em',
  'alignItems': 'stretch',
  'overflowY': 'scroll',
  'zIndex': 9999,
  '& li': {
    padding: '1em',
    fontWeight: '700'
  },
  '& li:hover': {
    backgroundColor: red
  },
  '& li.active': {
    backgroundColor: midWhite
  },
  '& li a': {
    display: 'block',
    width: '100%',
    cursor: 'pointer'
  },
  '& li a:hover': {
    color: midWhite
  }
});
export const InputContainer: GlamorousComponent<any, any> =
glamorous.div<{visible: boolean; height: string; profile: boolean; }>(
  {
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'row',
    'flexWrap': 'nowrap',
    'alignContent': 'stretch',
    'transition': 'all .3s ease-in-out',
    '& .icon': {
      display: 'inline',
      marginLeft: '0.25em'
    },
    '& .list': {
      display: 'none'
    },
    '& input:focus + .list': {
      display: 'inline-flex'
    }
  },
  props => ({
    height: props.visible ? props.height || '10em' : '0em',
    overflow: props.visible ? 'visible' : 'hidden',
    backgroundColor: props.profile ? 'transparent' : lighterGrey
  })
);

export const Input: GlamorousComponentT = glamorous.input({
  'fontSize': big,
  'fontWeight': 700,
  'paddingLeft': '1.5em',
  'backgroundColor': 'transparent',
  'border': 'none',
  'flex': '2 1',
  'transition': 'all .2s ease-in-out',
  ':focus': {
    outline: 'none',
    paddingLeft: '1.7em',
    backgroundColor: white,
    borderRadius: '.125em'
    // boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
  }
});
