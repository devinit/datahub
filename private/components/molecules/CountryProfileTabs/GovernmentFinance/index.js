// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';

const Government = (props: TabDataQuery) => {
  if (!props.governmentFinance) return new Error('No Government Finance data');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE TOTAL REVENUE OF UGANDA?
          </Header>
          <Header
            textAlign="center"
            as="h1"
            color="red"
          >
            {props.governmentFinance.totalRevenue}
          </Header>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW MUCH GOVERNMENT REVENUE COMES FROM EXTERNAL GRANTS (AID)?
          </Header>
          <Header
            textAlign="center"
            as="h1"
            color="red"
          >
            {props.governmentFinance.grantsAsPcOfRevenue}%
          </Header>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW IS SPENDING ALLOCATED?
          </Header>

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Government;
