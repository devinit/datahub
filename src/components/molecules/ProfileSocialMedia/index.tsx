import { Div } from 'glamorous';
import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Country, District } from '../../types';

export interface Props {
  isCountryProfile?: boolean;
  entity?: Country | District; // country or district
}

const ProfileSocialMedia = (_props: Props) => {
  return (
    <Div marginTop={ '1.5em' }>
      <a href={ `http://www.facebook.com/share.php?u=${window.location.href}` }>
        <Button icon="facebook f" />
      </a>
      <a href={ `https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"` }>
        <Button icon="twitter" />
      </a>
      <a href={ `https://plus.google.com/share?url=${window.location.href}` }>
        <Button icon="google plus" />
      </a>
      <a
        href={ `mailto:?subject=Development Initiatives:
          Uganda&body=Development Initiatives: Uganda — ${window.location.href}` }
      >
        <Button icon="mail" />
      </a>
    </Div>);
};

export default ProfileSocialMedia;
