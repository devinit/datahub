// @flow
import React from 'react';
import {Div, P} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
// import { SectionHeader } from 'components/atoms/Header';
import Generic from '../Generic';

/* eslint-disable max-len */
export default () =>
  (<Generic pathname="/oda-donor">
    <Div paddingTop="5em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="16" tablet="16" mobile="16">
              <Header as="h2" textAlign="center" color="red">
                Different providers, different priorities
              </Header>
              <P textAlign="center" fontSize="1.1em" paddingBottom="2em">
                How effectively are donors targeting the countries with the highest numbers of people in poverty
                { }and the least domestic public resources to address it? This chart allows you to select
                { }a provider of aid to see how it allocates aid across countries.
              </P>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <iframe
        title="oda-donor"
        src="http://localhost:5000/#!/post/oda-donor"
        frameBorder="0"
        scrolling="no"
        style={{ width: '100%', height: '850px' }}
      />
    </Div>

  </Generic>);
