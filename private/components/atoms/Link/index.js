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

// social-media_circle-icon style as circular icon
export const SocialMediaLink = glamorous.a({
  display: 'inline'
});
