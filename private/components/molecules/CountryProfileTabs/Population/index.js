// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import glamorous, {P, Div} from 'glamorous';
import TabsNoData from 'components/atoms/TabsNoData';
import Chart from 'components/atoms/Chart';
import {big} from 'components/theme';
import {NoData} from 'lib/utils/constants';
import {red} from 'components/theme/semantic';

type Props = {
  ...TabDataQuery,
  config: any
}

const Population = (props: Props) => {
  if (!props.populationTab) throw new Error('No Population data');
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE POPULATION
        </Header>
        <P fontSize={big} fontWeight={'bold'} color={red}>{
          props.populationTab.population && props.populationTab.population.value ?
          props.populationTab.population.value : NoData
          }</P>
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE URBAN VS RURAL SPLIT?
        </Header>
        {
          props.populationTab.populationDistribution &&
          props.populationTab.populationDistribution.length ?
            <Div paddingRight={'40px'}>
              <Chart
                config={props.config.populationDistribution}
                data={props.populationTab.populationDistribution}
                height="140px"
              />
            </Div> : <TabsNoData />
        }
      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE AGE PROFILE?
        </Header>
        {
          props.populationTab.populationPerAgeBand &&
          props.populationTab.populationPerAgeBand.length ?
            <Div paddingRight={'40px'}>
              <Chart
                config={props.config.populationPerAgeBand}
                data={props.populationTab.populationPerAgeBand}
                height="140px"
              />
            </Div>
            : <TabsNoData />
        }

      </Grid.Column>
    </Grid>
  );
};

export default Population;
