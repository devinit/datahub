// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Header, Grid} from 'semantic-ui-react';
import InteractiveChartToolBar from 'components/atoms/UnbundlingAid/InteractiveChartToolBar';
import TotalODA from 'components/atoms/UnbundlingAid/TotalODA';
import Social from 'components/atoms/UnbundlingAid/Social';
import Generic from '../Generic';

const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em',
};
const HeaderContainer = glamorous.div(headerStyles);

const TextContainer = glamorous.div({
  marginTop: '2em',
  marginBottom: '2em',
});

export default () => {
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
      <Social />
      <TextContainer>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width="10">
                <Header as="h1">Source</Header>
                <Header as="h2">Development Initiatives based on OECD DAC data.</Header>
                <p>Note that figures are rounded: precise data are available for
                download on the methodology page</p>
              </Grid.Column>
              <Grid.Column width="6">
                <Header as="h1">Download the data</Header>
                <p>For more information, see the DI data hub methodology page</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </TextContainer>
    </Generic>
  );
};
