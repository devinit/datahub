import glamorous from 'glamorous';

const NavTag = glamorous.a(
  {
    color: 'blue',
  },
  props => ({
    fontSize: props.size === 'big' ? 24 : 16,
    textDecoration: props.isActive ? 'underline' : 'none',
  }),
);

export default NavTag;
