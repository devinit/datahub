import glamorous from 'glamorous';
import { white, red, lighterGrey, grey, lightGrey} from '../../theme/semantic';

export const Slider = glamorous.div({
  display: 'inline-block',
  position: 'relative',
  height: '1em',
  width: '100%',
  margin: '0',
  padding: '0 2em 0 0',
  verticalAlign: 'middle',
  cursor: 'pointer',
  border: `solid 1px ${lightGrey}`,
  '& .bubble': {
    cursor: 'default',
    top: '-2em',
    padding: '0',
    fontSize: '.9em',
    color: grey,
  },
}, (props) => ({
  backgroundColor: props.backgroundColor || lighterGrey,
}));
export const Input = glamorous.input({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 2,
  margin: '0em',
  padding: '0em 1em',
  opacity: '0',
  height: '100%',
  left: '0em',
  width: '100%',
  cursor: 'pointer',
});

export const Pointer = glamorous.span(
  {
    position: 'absolute',
    cursor: 'pointer',
    width: '2.65em',
    height: '2.65em',
    borderRadius: '50%',
    border: '0.012em solid #666',
    top: '-0.8em',
    color: white,
    paddingTop: '.6em',
    textAlign: 'center',
    backgroundColor: red,
    userSelect: 'none',
    // transition: '1s left',
    zIndex: 1,
  },
  props => ({ left: `${100 * props.left}%` }),
);

export const Floor = glamorous.span({
  userSelect: 'none',
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  left: '0em',
  opacity: 1,
});

export const Ceiling = glamorous.span({
  userSelect: 'none',
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  right: '0em',
  opacity: 1,
});
