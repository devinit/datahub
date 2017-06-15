import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import Tabs from 'components/atoms/Tabs';
import Pane from 'components/atoms/Tabs/Pane';
import Overview from 'components/atoms/ContryProfiles/OverviewTab';
import PovertyTab from 'components/atoms/ContryProfiles/PovertyTab';
import PopulationTab from 'components/atoms/ContryProfiles/PopulationTab';

import Generic from '../Generic';
import SearchInput from '../../molecules/SearchInput';

const cardStyles = {
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  paddingLeft: '1.5em',
  paddingRight: '1.5em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
};

const LightBg = glamorous.div({
  background: '#e9e7e8',
  paddingTop: '3em',
  paddingBottom: '3em',
});

const HeaderGroup = glamorous.div({
  marginTop: '2em',
  '& .header': {
    marginBottom: 0,
    marginTop: 0,
  }
});
const CardContainer = glamorous.div(cardStyles);

const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em'
});

const JumpToResource = glamorous.span({
  marginTop: '1.5em',
  display: 'block',
  '& a': {
    color: red
  }
});

export default () =>
  (<Generic pathName="/aid">
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CardContainer>
              <Header>
                <Icon name="globe" />
                <Header.Content>
                  General Picture
                </Header.Content>
              </Header>
              <SearchInput
                visible
                countries={[
                  { name: 'Uganda', id: 1 },
                  { name: 'Kenya', id: 2 },
                  { name: 'Tanzania', id: 3 }
                ]}
                placeholder="Type Your Country Name"
              />
              <JumpToResource>
                Jump to <a>International resources</a>
              </JumpToResource>
              <SocialIconsContainer>
                <Button icon="facebook f" />
                <Button icon="twitter" />
                <Button icon="google plus" />
                <Button icon="mail outline" />
              </SocialIconsContainer>
            </CardContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Tabs selected={0}>
      <Pane label="Overview">
        <Overview />
      </Pane>
      <Pane label="Poverty">
        <PovertyTab />
      </Pane>
      <Pane label="Population">
        <PopulationTab />
      </Pane>
      <Pane label="Government Finance">
        <div>This is my tab 3 contents!</div>
      </Pane>
      <Pane label="International Resources">
        <div>This is my tab 3 contents!</div>
      </Pane>
    </Tabs>
  </Generic>);
