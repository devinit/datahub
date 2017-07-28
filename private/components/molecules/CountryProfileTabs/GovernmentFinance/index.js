// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {red} from 'components/theme/semantic';
import {big} from 'components/theme';

const Government = (props: TabDataQuery) => {
  if (!props.governmentFinance) return new Error('No Government Finance data');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE TOTAL REVENUE OF UGANDA?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.governmentFinance.totalRevenue}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW MUCH GOVERNMENT REVENUE COMES FROM EXTERNAL GRANTS (AID)?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.governmentFinance.grantsAsPcOfRevenue}%</P>
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
