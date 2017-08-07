// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Header, Grid} from 'semantic-ui-react';
import Visualization from 'components/molecules/whereAreThePoorViz';
import Generic from '../Generic';
import data from './data';

const HeaderContainer = glamorous.div({
  paddingTop: '4em',
  paddingBottom: '0em',
  '& h1.ui.header': {
    fontSize: '3em'
  },
  '& .sub.header': {
    fontSize: '0.55em !important'
  }
});
export default () => {
  return (
    <Generic pathName="/aid">
      <Container>
        <HeaderContainer>
          <Header as="h1">
            <Header.Content>
              Where are the poor and where will they be?
              <Header.Subheader>
                {data.subHeader}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
        <Visualization />
      </Container>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="12" tablet="16" mobile="16">
              <Header as="h3">About this visualization</Header>
              <p>
                {data.abtVisualization}
              </p>
              <Header as="h3">Scenario details</Header>
              <p>
                {data.scenarioDetails}
              </p>
              <Header as="h3">About the data</Header>
              <p>
                {data.aboutData}
              </p>
            </Grid.Column>
            <Grid.Column computer="4" tablet="16" mobile="16">
              <Header as="h3">Download the data</Header>
              <p>Not yet available</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Generic>
  );
};
