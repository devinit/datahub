// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Grid, Icon, Header, Button} from 'semantic-ui-react';
import Pane from 'components/atoms/Pane';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import {
  DistrictPublicResources,
  Education,
  Health,
  Population,
  Poverty,
  WaterandSanitation
} from 'components/molecules/SpotLightNavTabs';
import {LightBg, DarkBg } from 'components/atoms/Backgrounds';
import {SectionHeader} from 'components/atoms/Header';
import { red, white } from 'components/theme/semantic';
import RankingsTable from 'components/molecules/RankingsTable';
import Generic from '../Generic';
import data from './data';


/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em',
};
const HeaderContainer = glamorous.div(headerStyles);
const HeaderWrapper = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em',
});


export default () => {
  return (
    <Generic pathName="/aid">
      <Container>
        <HeaderContainer>
          <Grid centered>
            <Grid.Column width={12} textAlign="center">
              <b><Icon name="pie graph" />Spotlight</b> on Uganda is a comprehensive source of Uganda's
              financial resource flow data at the sub-national (district) level,
              alongside indicators on poverty, population, education, health, water, hygiene and sanitation.
              It highlights the geographical variance in sector performance and financial resources,
              and seeks to answer whether resources are allocated according to need.
              Explore the country picture by selecting topics and click on a district for an in-depth profile.
            </Grid.Column>
          </Grid>
        </HeaderContainer>
      </Container>
      <NavigationBarTabs selected={0} textAlign="center">
        <Pane label="Poverty">
          <Poverty options={data.tabOptions.poverty} />
        </Pane>
        <Pane label="Population">
          <Population options={data.tabOptions.population} />
        </Pane>
        <Pane label="Education">
          <Education options={data.tabOptions.education} />
        </Pane>
        <Pane label="Health">
          <Health options={data.tabOptions.humanitarianFinance} />
        </Pane>
        <Pane label="Water and Sanitation">
          <WaterandSanitation options={data.tabOptions.waterandSanitation} />
        </Pane>
        <Pane label="District Public Resources">
          <DistrictPublicResources options={data.tabOptions.districtPublicResources} />
        </Pane>
      </NavigationBarTabs>
      <Container>
        <Grid centered>
          <RankingsTable data={data.regionalRankings} />
        </Grid>
      </Container>

      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          DATA VISUALIZATIONS
        </SectionHeader>
      </DarkBg>
      <Container>
        <Grid>
          <Grid.Row centered>
            <HeaderWrapper>
              <SectionHeader>
                ABOUT THE <span>DEVELOPMENT DATA HUB</span>
              </SectionHeader>
            </HeaderWrapper>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="8">
              <Header as="h3">The Development Data Hub</Header>
              <p>
                The Development Data Hub is the most comprehensive online resource for financial
                 and resource flow data alongside poverty, social and vulnerability indicators.
                 It combines an extensive data store with interactive visualisations enabling you
                 to chart, map and compare data at the global, national and local level.
              </p>
            </Grid.Column>
            <Grid.Column width="8">
              <Header as="h3">How does it work?</Header>
              <p>
                It brings together many data sets, enabling you to dig into these through interactive maps,
                charts and visualisations. It turns complex data around poverty and resource flows
                into easy to understand robust information and evidence about what is really going on.
                 The Data Hub is an accessible and easy to use tool for anyone wanting to
                 know more about how resources for development are spent.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <LightBg>
        <Container textAlign="center">
          <SectionHeader color={white}>
            DATA SOURCES
          </SectionHeader>
          <HeaderWrapper>
            For documentation and data downloads, navigate to the methodology page.
          </HeaderWrapper>
          <Button color="grey" size="large">Methodology and Data <Icon name="chevron right" /></Button>
        </Container>
      </LightBg>
    </Generic>
  );
};
