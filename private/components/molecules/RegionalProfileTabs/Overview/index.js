// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Overview = (props: SpotLightTabDataQuery) => {
  if (!props.overViewTabRegional) throw new Error('regional overview data is missing');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF PEOPLE IN BUIKWE LIVE BELOW THE NATIONAL POVERTY LINE?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.overViewTabRegional.poorestPeople}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN BUIKWE?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>${props.overViewTabRegional.regionalResources}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.overViewTabRegional.localGovernmentSpendPerPerson}</PTag>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
