// @flow
import React from 'react';
import { SocialMediaLink } from 'components/atoms/Link';

type Props = {
  type: string,
  href: string
};
const SocialMedia = ({ type, href }: Props) => (
  <SocialMediaLink href={href}>
    <i className="{type} square icon" />
  </SocialMediaLink>
);
export default SocialMedia;
