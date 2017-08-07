import React from 'react';
import glamorous from 'glamorous';
import {lightGrey } from 'components/theme/semantic';
import { Container, Button} from 'semantic-ui-react';
import ChartShare from 'components/molecules/ChartShare';

const SocialContainer = glamorous.div({
  background: lightGrey,
  paddingTop: '.5em',
  paddingBottom: '.5em',
  fontSize: '1.7em',
});

const Social = () => (
  <SocialContainer>
    <Container textAlign="center">
      <Button icon="facebook f" />
      <Button icon="twitter" />
      <ChartShare size="medium" />
    </Container>
  </SocialContainer>
);

export default Social;
