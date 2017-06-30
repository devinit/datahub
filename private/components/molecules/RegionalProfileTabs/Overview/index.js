import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';

const Overview = () => (
  <Container>
    <Grid>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT PERCENTAGE OF PEOPLE IN BUIKWE LIVE BELOW THE NATIONAL POVERTY LINE?
        </Header>
        <Header
          textAlign="center"
          as="h1"
          color="red"
        >
          No data
        </Header>
      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN BUIKWE?
        </Header>
        <Header
          textAlign="center"
          as="h1"
          color="red"
        >
          US$9.3m
        </Header>
      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
        </Header>
        <Header
          textAlign="center"
          as="h1"
          color="red"
        >
          No data
        </Header>
      </Grid.Column>
    </Grid>
  </Container>
);

export default Overview;
