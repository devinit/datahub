import glamorous from 'glamorous';
import theme from '../../theme';

export const Slider = glamorous.div({
  display: 'inline-block',
  position: 'relative',
  height: '1em',
  width: '100%',
  margin: '2.5em .02em',
  verticalAlign: 'middle',
  cursor: 'pointer',
  backgroundColor: theme.lightGray,
  '& .bubble': {
    cursor: 'default',
    top: '-2em',
    padding: '0.012em 0.12em',
    fontSize: '.9em',
    color: theme.greyText,
  }
});
export const Input = glamorous.input({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 2,
  margin: '0em',
  padding: '0em',
  opacity: '0',
  height: '100%',
  left: '0em',
  width: '100%',
  cursor: 'pointer',
});

export const Pointer = glamorous.span({
  position: 'absolute',
  cursor: 'pointer',
  width: '2.65em',
  height: '2.65em',
  borderRadius: '50%',
  border: '0.012em solid #666',
  top: '-0.8em',
  color: theme.plainWhite,
  paddingTop: '.6em',
  textAlign: 'center',
  backgroundColor: theme.darkRed,
  zIndex: 1 },
  (props) => ({
    left: `${props.left}%`,
  }));

export const Floor = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  left: '0em',
  opacity: 1,
});

export const Ceiling = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  right: '0em',
  opacity: 1,
});
