import glamorous from 'glamorous';

const NavLink = glamorous.a(
  {
    color: 'blue',
  },
  ({props}) => ({
    fontSize: props.size === 'big' ? 24 : 16,
    textDecoration: props.isActive ? 'underline' : 'none',
  })
)

export NavLink;
