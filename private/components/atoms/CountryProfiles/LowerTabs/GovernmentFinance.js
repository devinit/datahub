import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import {LightBg} from '../Common';

const Government = () => (
  <LightBg>
    <Container>
      <Grid>
        <Grid.Column width={16} >
          <Header
            textAlign="center"
            as="h3"
          >
            How does Uganda finance and spend its budget?
            Move the year slider or click a box to drill down.
          </Header>
        </Grid.Column>

      </Grid>
    </Container>
  </LightBg>
);

export default Government;
