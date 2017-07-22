// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';


const Poverty = (props: SpotLightTabDataQuery) => {
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
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
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.povertyTabRegional.poorestPeople}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE AVERAGE LIFE EXPECTANCY?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.povertyTabRegional.lifeExpectancy}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE STANDARD OF LIVING SCORE?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.povertyTabRegional.stdOfLiving}</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
