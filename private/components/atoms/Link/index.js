import glamorous from 'glamorous';
import { white, lighterGrey, grey, black } from 'components/theme/semantic';
import { medium } from 'components/theme';

export const FooterLink = glamorous.a({
  fontSize: medium,
  display: 'block',
  color: lighterGrey,
  paddingBottom: '.5em',
  paddingTop: '.5em',
});

export const NavLink = glamorous.a({
  color: white,
  fontWeight: '700',
  textAlign: 'center',
  transition: 'all .3s',
  ':hover': {
    color: white,
  },
});

// social-media_circle-icon style as circular icon
export const SocialMediaLink = glamorous.a({
  display: 'inline-block',
  color: black,
  border: `2px solid ${grey}`,
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
