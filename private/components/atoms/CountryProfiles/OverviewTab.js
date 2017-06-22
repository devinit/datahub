import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from './Common';

const Overview = () => (
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

      <Grid.Column width={5}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT RESOURCES ARE AVAILABLE?
        </Header>
        <HeaderGroup>
          <Header
            color="red"
            textAlign="center"
            as="h4"
          >
            Domestic public
          </Header>
          <Header
            textAlign="center"
            as="h2"
            color="red"
          >
            US$ 3bn
          </Header>
          <Header
            textAlign="center"
            as="h4"
          >
            International
          </Header>
          <Header
            textAlign="center"
            as="h2"
          >
            US$ 4.4bn
          </Header>
        </HeaderGroup>
      </Grid.Column>

      <Grid.Column width={5}>
        <Header
          textAlign="center"
          as="h3"
        >
          HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
        </Header>
        <HeaderGroup>
          <Header
            textAlign="center"
            as="h1"
            color="red"
          >
            PPP$ 365
          </Header>
          <Header
            textAlign="center"
            as="h5"
          >
            out of a population of 39 million people
          </Header>
        </HeaderGroup>
      </Grid.Column>
    </Grid>
  </Container>
);

export default Overview;
