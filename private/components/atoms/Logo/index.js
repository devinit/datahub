import glamorous from 'glamorous';
import React from 'react';
// https://github.com/zeit/next.js/issues/1825
// import logoImage from 'logo.png';

const LogoContainer = glamorous.div({
  display: 'flex',
  float: 'left',
  '& img': {
    height: '2.3em',
    width: 'auto',
    marginTop: '1em',
    marginBottom: '1em',
  },
});

const logo = () =>
  (<LogoContainer>
    <a href="http://devinit.org">
      <img src="/img/logo.png" alt="Development Initiatives" height="32" width="132" />
    </a>
  </LogoContainer>);

export default logo;
