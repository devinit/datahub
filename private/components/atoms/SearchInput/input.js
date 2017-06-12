import glamorous from 'glamorous';
import theme from 'components/theme';

export const InputContainer = glamorous.div({
  width: '100%',
  backgroundColor: theme.white,
  height: '0em',
  transition: 'all .3s ease-in-out',
  '& .list': {
    display: 'none',
  },
  '& input:focus + .list': {
    display: 'block',
  }},
  (props) => ({
    height: props.visible ? '10em' : '0em',
    overflow: props.visible ? 'visible' : 'hidden'
  }));

export const Input = glamorous.input({
  height: '3.2em',
  width: '100%',
  marginTop: '1.2em',
  fontSize: theme.big,
  fontWeight: '700',
  paddingLeft: '1.5em',
  backgroundColor: 'transparent',
  border: 'none',
  transition: 'all .2s ease-in-out',
  ':focus': {
    outline: 'none',
    paddingLeft: '1.7em',
    backgroundColor: theme.plainWhite,
    borderRadius: '.125em',
    boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
  },
});
