import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';

export const Wrapper = glamorous.div({
  color: white,
  '& .ui.button': {
    paddingTop: '.5em',
    paddingBottom: '.5em',
    paddingRight: '.85em',
    paddingLeft: '0.75em',
  },
  /* Dropdown arrow */
  '& option': {
    color: '#333'
  },
});

export const StyledSelect = glamorous.select({
  fontWeight: '700',
  fontSize: '18px',
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'middle',
  margin: 0,
  padding: '.25em 0em .25em .25em',
  lineHeight: '1.5',
  transition: 'all .25s',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
  outline: 0,
  // boxSizing: 'border-box',
  // appearance: 'none',
  ':after': {
    content: '"💎"',
  }
});
