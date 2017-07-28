// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {red} from 'components/theme/semantic';
import {P} from 'glamorous';
import {big} from 'components/theme';

const Population = (props: SpotLightTabDataQuery) => {
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
        WHAT IS THE POPULATION
      </Header>
        <P color={red}>
        The total population is
      </P>
        <P fontSize={big} fontWeight={'bold'} color={red}>{props.populationTabRegional.totalPopulation}</P>
        <P>and the population density is</P>
        <P fontSize={big} fontWeight={'bold'}>{props.populationTabRegional.populationDensity}</P>
        <P>per sq km</P>
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
        WHAT IS THE AVERAGE DEPENDENCY RATIO?
      </Header>
        <P fontSize={big} fontWeight={'bold'} color={red}>{props.populationTabRegional.averageDependencyRatio}</P>
        <P>Compared with the all-district average:</P>
        <P fontSize={big} fontWeight={'bold'}>{props.populationTabRegional.allAverageDependencyRatio}</P>
      </Grid.Column>
    </Grid>
  );
};
export default Population;
