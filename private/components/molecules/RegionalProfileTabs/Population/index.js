// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {red} from 'components/theme/semantic';
import PTag from 'components/atoms/PTag';

const Population = (props: SpotLightTabDataQuery) => {
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  return (
    <Grid>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
        WHAT IS THE POPULATION
      </Header>
        <PTag color={red}>
        The total population is
      </PTag>
        <PTag size={'big'} fontWeight={'bold'}>{props.populationTabRegional.totalPopulation}</PTag>
        <PTag>and the population density is</PTag>
        <PTag size={'big'} fontWeight={'bold'}>{props.populationTabRegional.populationDensity}</PTag>
        <PTag>per sq km</PTag>
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
        <PTag size={'big'} fontWeight={'bold'}>{props.populationTabRegional.averageDependencyRatio}</PTag>
        <PTag>Compared with the all-district average:</PTag>
        <PTag size={'big'} fontWeight={'bold'}>{props.populationTabRegional.allAverageDependencyRatio}</PTag>
      </Grid.Column>
    </Grid>
  );
};
export default Population;
