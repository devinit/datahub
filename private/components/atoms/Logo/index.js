import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import {MenuLink} from 'components/atoms/Link';
import React from 'react';

const logoImage = require('../../../images/logo.png');

const LogoContainer = glamorous.div({
  display: 'flex',
});

const logo = () => (
  <LogoContainer>
    <image src={logoImage} alt="Development Initiatives" height="32" width="132" />
  </LogoContainer>
);

export default logo;
