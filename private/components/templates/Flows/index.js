// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container, Header } from 'semantic-ui-react';
import Generic from '../Generic';

export default () => {
  const headerStyles = {
    paddingTop: '4em',
    paddingBottom: '4em',
  };
  const HeaderContainer = glamorous.div(headerStyles);
  return (
    <Generic>
      <Container>
        <HeaderContainer>
          <Header as="h1" textAlign="center">
            <Header.Content>
              Unbundling other official flows
              <Header.Subheader>
                Explore and compare funding priorities for other official flows (OOFs)
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
    </Generic>
  );
};
