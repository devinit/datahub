// @flow
import {Header, Grid} from 'semantic-ui-react';
import React from 'react';
import {P, Div} from 'glamorous';
import TabsNoData from 'components/atoms/TabsNoData';
import Chart from 'components/atoms/Chart';
import {big} from 'components/theme';
import {NoData} from 'lib/utils/constants';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';

type Props = {
  ...TabDataQuery,
  config: any
}

const Population = (props: Props) => {
  if (!props.populationTab) throw new Error('No Population data');
  const populationTab = props.populationTab;
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header
          textAlign="center"
          as="h3"
        >
          WHAT IS THE POPULATION
        </Header>
        {
                populationTab.population &&
                populationTab.population.toolTip ?
                  <TabsToolTip {...populationTab.population.toolTip} /> : ''
              }
        <P fontSize={big} fontWeight={'bold'} color={red}>{
          populationTab.population && populationTab.population.value ?
          populationTab.population.value : NoData
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
          populationTab.populationDistribution &&
          populationTab.populationDistribution.toolTip ?
            <TabsToolTip {...populationTab.populationDistribution.toolTip} /> : ''
        }
        {
          populationTab.populationDistribution &&
          populationTab.populationDistribution.data ?
            <Div paddingRight={'40px'}>
              <Chart
                config={props.config.populationDistribution}
                data={populationTab.populationDistribution.data}
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
                populationTab.populationPerAgeBand &&
                populationTab.populationPerAgeBand.toolTip ?
                  <TabsToolTip {...populationTab.populationPerAgeBand.toolTip} /> : ''
              }
        {
          populationTab.populationPerAgeBand &&
          populationTab.populationPerAgeBand.data ?
            <Div paddingRight={'40px'}>
              <Chart
                config={props.config.populationPerAgeBand}
                data={populationTab.populationPerAgeBand.data}
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
