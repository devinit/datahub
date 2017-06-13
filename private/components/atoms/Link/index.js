import glamorous from 'glamorous';
import theme from 'components/theme';

export const FooterLink = glamorous.a({
  fontSize: theme.smallFont,
  display: 'block',
  color: theme.white,
  paddingBottom: '.5em',
  paddingTop: '.5em',
});

export const NormalLink = glamorous.a({
  fontSize: theme.smallFont
});

export const NavLink = glamorous.a({
  color: theme.plainWhite,
  fontWeight: '700',
  textAlign: 'center',
  transition: 'all .3s',
  ':hover': {
    color: theme.plainWhite,
  }
});


// social-media_circle-icon style as circular icon
export const SocialMediaLink = glamorous.a({
  display: 'inline-block',
  color: theme.black,
  border: `2px solid ${theme.grey}`,
  borderRadius: '50%',
  fontSize: '1.5em',
  height: '2.5em',
  width: '2.5em',
  background: '0 0',
  lineHeight: '2.3em',
  textAlign: 'center',
  boxSizing: 'border-box',
  paddingLeft: '3px',
  marginLeft: '5px',

});
