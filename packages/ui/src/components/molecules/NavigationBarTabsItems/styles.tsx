import glamorous from 'glamorous';
import { lightBlack, white } from '../../theme/semantic';

export const SelectWrapper = glamorous.div({
  'display': 'inline-block',
  '& .menu .text': {
    paddingLeft: '0.5em'
  },
  '& .selected :before': {
    content: '"✓ "',
    marginLeft: '-1em'
  },
  '& .ui.dropdown .menu>.item': {
    fontWeight: '500',
    fontSize: '1.1em'
  },
  '& .ui.selection, .ui.selection.dropdown, .ui.selection.dropdown:hover': {
    background: lightBlack,
    border: 'none',
  },
  '& .ui.selection.dropdown .menu': {
    overflowY: 'scroll !important'
  },
  '& .ui div:first-child, .ui.selection.visible.dropdown>.text:not(.default), .dropdown.icon': {
    color: white,
    fontWeight: 700,
    fontSize: '18px'
  }
});

export const Wrapper = glamorous.div({
  textAlign: 'center',
  paddingTop: '.5em',
  paddingBottom: '.5em',
  background: lightBlack,
  '& .ui.selection.active.dropdown .menu': {
    borderRadius: '0.25em',
    marginTop: '-2em'
  },
  '& .ui.button': {
    fontWeight: '500',
    paddingTop: '.5em',
    paddingBottom: '.5em',
    paddingRight: '.85em',
    paddingLeft: '0.75em',
  },
  '& i.icon': {
    color: white
  },
});
