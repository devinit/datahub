import * as React from 'react';
import { css } from 'glamor';
import { Message } from 'semantic-ui-react';

const messageStyles = css({
  textAlign: 'center',
  marginBottom: '0 !important',
  borderRadius: '0 !important'
});

const Banner = () => {
  return (
    <Message warning { ...messageStyles }>
      The Development Data Hub is not currently displaying the most up-to-date data,
      as it is soon to undergo redevelopment.
      If you have any data-related questions please email info@devinit.org
    </Message>
  );
};

export default Banner;
