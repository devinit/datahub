// @flow
import React from 'react';
import {Div} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
// import { SectionHeader } from 'components/atoms/Header';
import Generic from '../Generic';


export default () =>
  (<Generic pathname="/oda-donor">
    <Div paddingTop="2em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="8" tablet="16" mobile="16">
              <Header as="h3">The Development Data Hub</Header>
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
