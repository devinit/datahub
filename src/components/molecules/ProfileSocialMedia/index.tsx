import * as React from 'react';
import { Div, Span } from 'glamorous';
import { Country, District } from '../../types';
import { Button } from 'semantic-ui-react';

const updateShareAnalytics = (source: 'facebook' | 'twitter' | 'mail' | 'google') => {
  if ((window as any).gtag) {
    (window as any).gtag('event', 'share', {
      event_category: source,
      event_label: window.location.href
    });
  }
};
const updateDownloadAnalytics = (link: string) => {
  if ((window as any).gtag) {
    (window as any).gtag('event', 'download', {
      event_category: 'PDF',
      event_label: link
    });
  }
};
export interface Props {
  isCountryProfile?: boolean;
  entity?: Country | District; // country or district
}

// tslint:disable jsx-no-lambda
const ProfileSocialMedia = (props: Props) => {
  return (
    <Div marginTop={ '1.5em' }>
      <a href={ `http://www.facebook.com/share.php?u=${window.location.href}` }>
        <Button icon="facebook f" onClick={ () => updateShareAnalytics('facebook') }/>
      </a>
      <a href={ `https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"` }>
        <Button icon="twitter" onClick={ () => updateShareAnalytics('twitter') } />
      </a>
      <a href={ `https://plus.google.com/share?url=${window.location.href}` }>
        <Button icon="google plus" onClick={ () => updateShareAnalytics('google') }/>
      </a>
      <a
        href={ `mailto:?subject=Development Initiatives:
          Uganda&body=Development Initiatives: Uganda — ${window.location.href}` }
      >
        <Button icon="mail" onClick={ () => updateShareAnalytics('mail') }/>
      </a>
      { props.isCountryProfile && props.entity && (props.entity as Country).hasPDF ?
        <a
          rel="noopener"
          href={ `/pdf/20170331/${props.entity.name.replace(/\s/g, '-')}.pdf` }
          target="__blank"
          onClick={
            () => updateDownloadAnalytics(`/pdf/20170331/${(props.entity as any).name.replace(/\s/g, '-')}.pdf`)
          }
        >
          <Button size="medium"><Span fontWeight={ 500 }>Download and Print</Span></Button>
        </a> : '' }

    </Div>);
};

export default ProfileSocialMedia;
