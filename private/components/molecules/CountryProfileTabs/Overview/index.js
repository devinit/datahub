// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Overview = (props: TabDataQuery) => {
  if (!props.overViewTab) return new Error('No OverView data');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MANY OF THE POOREST PEOPLE GLOBALLY LIVE IN UGANDA?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.overViewTab.poorestPeople}</PTag>
          <PTag>out of a population of 39 million people</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT RESOURCES ARE AVAILABLE?
        </Header>
          <PTag>Domestic public</PTag>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.overViewTab.domesticResources}</PTag>
          <PTag>International</PTag>
          <PTag size={'big'} fontWeight={'bold'}>{props.overViewTab.internationalResources}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.overViewTab.governmentSpendPerPerson}</PTag>
          <PTag>out of a population of 39 million people</PTag>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Overview;
