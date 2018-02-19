import glamorous from 'glamorous';
import * as React from 'react';
const logoImage = require('../../../static/images/logo.png');

const LogoContainer = glamorous.div({
  'display': 'flex',
  'float': 'left',
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
      <img src={logoImage} alt="Development Initiatives" height="32" width="132" />
    </a>
  </LogoContainer>);

export default logo;
