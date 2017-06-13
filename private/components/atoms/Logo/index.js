import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import {MenuLink} from 'components/atoms/Link';
import React from 'react';
import logoImage from 'logo.png'; // made public/img an npm/webpack resolution path

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
    <img src={logoImage} alt="Development Initiatives" height="32" width="132" />
  </LogoContainer>
);

export default logo;
