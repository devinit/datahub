// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {NoData} from 'lib/utils/constants';


const Poverty = (props: SpotLightTabDataQuery) => {
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegional = props.povertyTabRegional;
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
                povertyTabRegional.poorestPeople &&
                povertyTabRegional.poorestPeople.toolTip ?
                  <TabsToolTip {...povertyTabRegional.poorestPeople.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
           povertyTabRegional.poorestPeople &&
           povertyTabRegional.poorestPeople.value ?
           povertyTabRegional.poorestPeople.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE AVERAGE LIFE EXPECTANCY?
          </Header>
          {
                povertyTabRegional.lifeExpectancy &&
                povertyTabRegional.lifeExpectancy.toolTip ?
                  <TabsToolTip {...povertyTabRegional.lifeExpectancy.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
           povertyTabRegional.lifeExpectancy &&
           povertyTabRegional.lifeExpectancy.value ?
           povertyTabRegional.lifeExpectancy.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE STANDARD OF LIVING SCORE?
          </Header>
          {
                povertyTabRegional.stdOfLiving &&
                povertyTabRegional.stdOfLiving.toolTip ?
                  <TabsToolTip {...povertyTabRegional.stdOfLiving.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            povertyTabRegional.stdOfLiving &&
            povertyTabRegional.stdOfLiving.value ?
            povertyTabRegional.stdOfLiving.value : NoData
            }</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
