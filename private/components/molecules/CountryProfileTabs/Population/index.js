// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Population = (props: TabDataQuery) => {
  if (!props.populationTab) return new Error('No Population data');
  return (
    <Grid>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE POPULATION
        </Header>
        <PTag size={'big'} fontWeight={'bold'} color={red}>{props.populationTab.population}</PTag>
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
