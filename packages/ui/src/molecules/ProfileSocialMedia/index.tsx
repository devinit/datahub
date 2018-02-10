import * as React from 'react';
import { Div, Span } from 'glamorous';
import {Country, District} from '@devinit/dh-base/lib/types';
import { Button } from 'semantic-ui-react';

interface Props  {
  isCountryProfile?: boolean;
  entity?: Country | District; // country or district
}

const ProfileSocialMedia = (props: Props) => {
  return (
    <Div marginTop={'1.5em'}>
      <a href={`http://www.facebook.com/share.php?u=${window.location.href}`}>
        <Button icon="facebook f" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"`}
      >
        <Button icon="twitter" />
      </a>
      <a href={`https://plus.google.com/share?url=${window.location.href}`}>
        <Button icon="google plus" />
      </a>
      <a
        href={`mailto:?subject=Development Initiatives:
          Uganda&body=Development Initiatives: Uganda — ${window.location.href}`}
      >
        <Button icon="mail outline" />
      </a>
      {props.isCountryProfile && props.entity && props.entity.hasPDF ?
        <a
          rel="noopener"
          href={`/pdf/20170331/${props.entity.name.replace(/\s/g, '-')}.pdf`}
          target="__blank"
        >
          <Button size="medium"><Span fontWeight={500}>Download and Print</Span></Button>
        </a> : '' }

    </Div>);
};

export default ProfileSocialMedia;
