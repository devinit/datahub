import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import Tabs from 'components/atoms/Tabs';
import Pane from 'components/atoms/Tabs/Pane';
import Overview from 'components/atoms/ContryProfiles/OverviewTab';

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
        <LightBg>
          <Container>
            <Grid>
              <Grid.Column width={5}>
                <Header
                  textAlign="center"
                  as="h3"
                >
                  IS POVERTY REDUCING OVER TIME?
                </Header>
              </Grid.Column>

              <Grid.Column width={5}>
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
                    10%
                  </Header>
                  <Header
                    textAlign="center"
                    as="h5"
                  >
                    out of a population of 39 million people
                  </Header>
                </HeaderGroup>
              </Grid.Column>

              <Grid.Column width={5}>
                <Header
                  textAlign="center"
                  as="h3"
                >
                  HOW IS INCOME DISTRIBUTED?
                </Header>

              </Grid.Column>
            </Grid>
          </Container>
        </LightBg>
      </Pane>
      <Pane label="Population">
        <Grid>
          <Grid.Column width={5}>
            <Header
              textAlign="center"
              as="h3"
            >
              WHAT IS THE POPULATION
            </Header>
            <Header
              textAlign="center"
              as="h1"
              color="red"
            >
              39m
            </Header>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header
              textAlign="center"
              as="h3"
            >
              WHAT IS THE URBAN VS RURAL SPLIT?
            </Header>

          </Grid.Column>

          <Grid.Column width={5}>
            <Header
              textAlign="center"
              as="h3"
            >
              WHAT IS THE AGE PROFILE?
            </Header>
          </Grid.Column>
        </Grid>
      </Pane>
      <Pane label="Government Finance">
        <div>This is my tab 3 contents!</div>
      </Pane>
      <Pane label="International Resources">
        <div>This is my tab 3 contents!</div>
      </Pane>
    </Tabs>
  </Generic>);
