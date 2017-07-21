// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Poverty = (props: TabDataQuery) => {
  if (!props.povertyTab) return new Error('No Poverty data');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            IS POVERTY REDUCING OVER TIME?
          </Header>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW DEEP IS POVERTY?
          </Header>
          <PTag size={'big'} fontWeight={'bold'} color={red}>{props.povertyTab.depthOfExtremePoverty}%</PTag>
          <PTag>Depth of extreme poverty</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW IS INCOME DISTRIBUTED?
          </Header>

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
