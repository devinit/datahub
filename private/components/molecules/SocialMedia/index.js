// @flow
import React from 'react';
import { SocialMediaLink } from 'components/atoms/Link';

type Props = {
  type: string,
  href: string
};
const SocialMedia = ({ type, url }: Props) => (
  <SocialMediaLink href={url}>
    <i className={`${type} icon`} />
  </SocialMediaLink>
);
export default SocialMedia;
