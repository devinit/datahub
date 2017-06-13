// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Header} from 'semantic-ui-react';
import type { Element } from 'react';
import Generic from '../Generic';


export default () => {
  const headerStyles = {
    paddingTop: '4em',
    paddingBottom: '4em',
  };
  const HeaderContainer = glamorous.div(headerStyles);
  return (
    <Generic pathName="/aid">
      <Container>
        <HeaderContainer>
          <Header as="h1">
            <Header.Content>
              Where are the poor and where will they be?
              <Header.Subheader>
                Between 1990 and 2010, extreme poverty was cut in half.
                Explore plausible poverty outcomes for 2030 based on models of consumption.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
    </Generic>
  );
};
