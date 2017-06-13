import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import {MenuLink} from 'components/atoms/Link';
import React from 'react';
// https://github.com/zeit/next.js/issues/1825
// import logoImage from 'logo.png';

const LogoContainer = glamorous.div({
  display: 'flex',
  float: 'left',
  '& img': {
    height: '2em',
    width: 'auto',
    marginTop: '1em'
  }
});

const logo = () => (
  <LogoContainer>
    <img src="/img/logo.png" alt="Development Initiatives" height="32" width="132" />
  </LogoContainer>
);

export default logo;
