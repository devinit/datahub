// @flow
import { Container, Header, Grid} from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const Overview = (props: SpotLightTabDataQuery) => {
  if (!props.overViewTabRegional) throw new Error('regional overview data is missing');
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
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTabRegional.poorestPeople}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN BUIKWE?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>${props.overViewTabRegional.regionalResources}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTabRegional.localGovernmentSpendPerPerson}</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
