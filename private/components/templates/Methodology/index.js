import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import {SectionHeader} from 'components/atoms/Header';
import Generic from '../Generic';
import data from './data';

const Upper = glamorous.div({
  marginTop: '5em',
  marginBottom: '2em',
});

export default () =>
  (<Generic pathName="/aid">
    <Upper>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16" textAlign="center">
              <SectionHeader>
                ABOUT THE DEVELOPMENT DATA HUB: <span>METHODOLOGY</span>
              </SectionHeader>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer="8" tablet="16" mobile="16">
              <Header as="h3">The Development Data Hub</Header>
              <p>
                {data.about}
              </p>
            </Grid.Column>
            <Grid.Column computer="8" tablet="16" mobile="16">
              <Header as="h3">How does it work?</Header>
              <p>
                {data.how}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Upper>
    <ProfileDataSourceTable title="Data Sources" data={data.dataSources} />
  </Generic>);
