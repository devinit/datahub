import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {LightBg} from './Common';

const Overview = () => (
  <LightBg>
    <Container>
      <Grid>
        <Grid.Column width={5}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW MANY OF THE POOREST PEOPLE GLOBALLY LIVE IN UGANDA?
          </Header>
          <Header
            textAlign="center"
            as="h1"
            color="red"
          >
            19.6M
          </Header>
          <Header
            textAlign="center"
            as="h5"
          >
            out of a population of 39 million people
          </Header>
        </Grid.Column>
      </Grid>
    </Container>
  </LightBg>
);

export default Overview;
