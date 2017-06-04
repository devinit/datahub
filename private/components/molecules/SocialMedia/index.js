// @flow
import React from 'react';
import { SocialMediaLink } from 'components/atoms/Link';
import { Icon } from 'semantic-ui-react';

type Props = {
  type: string,
  href: string
};

const SocialMedia = ({ type, href }: Props) => (
  <SocialMediaLink href={href}>
    <Icon name={type} />
  </SocialMediaLink>
);
export default SocialMedia;
