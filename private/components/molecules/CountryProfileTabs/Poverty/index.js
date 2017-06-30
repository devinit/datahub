import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';

const Poverty = () => (
  <Container>
    <Grid>
      <Grid.Column width={5}>
        <Header
          textAlign="center"
          as="h3"
        >
          IS POVERTY REDUCING OVER TIME?
        </Header>
      </Grid.Column>

      <Grid.Column width={5}>
        <Header
          textAlign="center"
          as="h3"
        >
          HOW DEEP IS POVERTY?
        </Header>

        <HeaderGroup>
          <Header
            textAlign="center"
            as="h1"
            color="red"
          >
            10%
          </Header>
          <Header
            textAlign="center"
            as="h5"
          >
            out of a population of 39 million people
          </Header>
        </HeaderGroup>
      </Grid.Column>

      <Grid.Column width={5}>
        <Header
          textAlign="center"
          as="h3"
        >
          HOW IS INCOME DISTRIBUTED?
        </Header>

      </Grid.Column>
    </Grid>
  </Container>
);

export default Poverty;
