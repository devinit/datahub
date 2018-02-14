import * as React from 'react';
import { SocialMediaLink } from '../../atoms/Link';
import { Icon } from 'semantic-ui-react';

export interface Props  {
  type: string; // TODO: and enum types
  href: string;
}

const SocialMedia = ({ type, href }: Props) =>
  (<SocialMediaLink href={href}>
    <Icon name={type} />
  </SocialMediaLink>);
export default SocialMedia;
