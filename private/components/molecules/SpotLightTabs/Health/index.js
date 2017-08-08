// @flow
import { Container, Header, Grid} from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {NoData} from 'lib/utils/constants';

const Health = (props: SpotLightTabDataQuery) => {
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  const healthTabRegional = props.healthTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT IS THE DISTRICT LEAGUE HEALTH PERFORMANCE SCORE?
        </Header>
          {
                healthTabRegional.districtPerformance &&
                healthTabRegional.districtPerformance.toolTip ?
                  <TabsToolTip {...healthTabRegional.districtPerformance.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            healthTabRegional.districtPerformance &&
            healthTabRegional.districtPerformance.value ?
            healthTabRegional.districtPerformance.value : NoData
            }</P>
          <P>out of 100, and is ranked in</P>
          <P fontSize={big} fontWeight={'bold'}>...</P>
          <P>place overall</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF TUBERCULOSIS CASES HAVE BEEN SUCCESSFULLY TREATED?
        </Header>
          {
                healthTabRegional.treatmeantOfTb &&
                healthTabRegional.treatmeantOfTb.toolTip ?
                  <TabsToolTip {...healthTabRegional.treatmeantOfTb.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            healthTabRegional.treatmeantOfTb &&
            healthTabRegional.treatmeantOfTb.value ?
            healthTabRegional.treatmeantOfTb.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH LOCAL GOVERNMENT HEALTHCARE FUNDING IS THERE?
        </Header>
          {
                healthTabRegional.healthCareFunding &&
                healthTabRegional.healthCareFunding.toolTip ?
                  <TabsToolTip {...healthTabRegional.healthCareFunding.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            healthTabRegional.healthCareFunding &&
            healthTabRegional.healthCareFunding.value ?
            healthTabRegional.healthCareFunding.value : NoData
            }</P>

        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
