// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const Overview = (props: TabDataQuery) => {
  if (!props.overViewTab) return new Error('No OverView data');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MANY OF THE POOREST PEOPLE GLOBALLY LIVE IN UGANDA?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.poorestPeople}</P>
          <P>out of a population of 39 million people</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT RESOURCES ARE AVAILABLE?
        </Header>
          <P>Domestic public</P>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.domesticResources}</P>
          <P>International</P>
          <P fontSize={big} fontWeight={'bold'}>{props.overViewTab.internationalResources}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.governmentSpendPerPerson}</P>
          <P>out of a population of 39 million people</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Overview;
