// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {NoData} from 'lib/utils/constants';

const Overview = (props: SpotLightTabDataQuery) => {
  if (!props.overViewTabRegional) throw new Error('regional overview data is missing');
  const overViewTabRegional = props.OverViewTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF PEOPLE IN BUIKWE LIVE BELOW THE NATIONAL POVERTY LINE?
        </Header>
          {
                overViewTabRegional.poorestPeople &&
                overViewTabRegional.poorestPeople.toolTip ?
                  <TabsToolTip {...overViewTabRegional.poorestPeople.toolTip} /> : ''
              }

          <P fontSize={big} fontWeight={'bold'} color={red}>{
            overViewTabRegional.poorestPeople &&
            overViewTabRegional.poorestPeople.value ?
            overViewTabRegional.poorestPeople.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN BUIKWE?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>${
           overViewTabRegional.regionalResources &&
           overViewTabRegional.regionalResources.value ?
           overViewTabRegional.regionalResources.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{
           overViewTabRegional.localGovernmentSpendPerPerson &&
           overViewTabRegional.localGovernmentSpendPerPerson.value ?
           overViewTabRegional.localGovernmentSpendPerPerson.value : NoData
            }</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
