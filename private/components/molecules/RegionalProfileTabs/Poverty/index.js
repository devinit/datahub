// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import PTag from 'components/atoms/PTag';


const Poverty = (props: SpotLightTabDataQuery) => {
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
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
          <PTag size={'big'} fontWeight={'bold'}>{props.povertyTabRegional.poorestPeople}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE AVERAGE LIFE EXPECTANCY?
          </Header>
          <PTag size={'big'} fontWeight={'bold'}>{props.povertyTabRegional.lifeExpectancy}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE STANDARD OF LIVING SCORE?
          </Header>
          <PTag size={'big'} fontWeight={'bold'}>{props.povertyTabRegional.stdOfLiving}</PTag>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
