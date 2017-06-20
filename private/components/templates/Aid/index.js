// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Header} from 'semantic-ui-react';
import InteractiveChartToolBar from 'components/atoms/UnbundlingAid/InteractiveChartToolBar';
import TotalODA from 'components/atoms/UnbundlingAid/TotalODA';
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
          <Header as="h1" textAlign="center">
            <Header.Content>
              Unbundling aid
              <Header.Subheader>
                Explore and compare funding priorities for official development assistance
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
      <InteractiveChartToolBar />
      <TotalODA />
    </Generic>
  );
};
