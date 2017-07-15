// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';

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

          <HeaderGroup>
            <Header
              textAlign="center"
              as="h1"
              color="red"
            >
              {props.povertyTab.depthOfExtremePoverty}%
            </Header>
            <Header
              textAlign="center"
              as="h5"
            >
              Depth of extreme poverty
            </Header>
          </HeaderGroup>
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
