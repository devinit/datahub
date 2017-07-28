// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const Population = (props: TabDataQuery) => {
  if (!props.populationTab) return new Error('No Population data');
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE POPULATION
        </Header>
        <P fontSize={big} fontWeight={'bold'} color={red}>{props.populationTab.population}</P>
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE URBAN VS RURAL SPLIT?
        </Header>

      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE AGE PROFILE?
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default Population;
