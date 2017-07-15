// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Health = (props: SpotLightTabDataQuery) => {
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT IS THE DISTRICT LEAGUE HEALTH PERFORMANCE SCORE?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.healthTabRegional.districtPerformance}</PTag>
          <PTag>out of 100, and is ranked in</PTag>
          <PTag size={'big'} fontWeight={'bold'}>...</PTag>
          <PTag>place overall</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF TUBERCULOSIS CASES HAVE BEEN SUCCESSFULLY TREATED?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.healthTabRegional.treatmeantOfTb}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH LOCAL GOVERNMENT HEALTHCARE FUNDING IS THERE?
        </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.healthTabRegional.healthCareFunding}</PTag>

        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
