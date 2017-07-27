// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import glamorous, {P} from 'glamorous';
import Chart from 'components/atoms/Chart';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

// Contains offset made by last tick on time axis
const ChartContainer = glamorous.div({
  paddingRight: '40px'
});

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

        <ChartContainer>
          <Chart
            config={props.config.populationDistribution}
            data={props.populationTab.populationDistribution}
            height="140px"
          />
        </ChartContainer>
      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE AGE PROFILE?
        </Header>

        <ChartContainer>
          <Chart
            config={props.config.populationPerAgeBand}
            data={props.populationTab.populationPerAgeBand}
            height="140px"
          />
        </ChartContainer>
      </Grid.Column>
    </Grid>
  );
};

export default Population;
