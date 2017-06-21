// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Grid, Icon} from 'semantic-ui-react';
import {Pane, TabsDark} from 'components/atoms/Tabs';
import Poverty from 'components/atoms/SpotLight/tabs/Poverty';
import DistrictPublicResources from 'components/atoms/SpotLight/tabs/DistrictPublicResources';
import Education from 'components/atoms/SpotLight/tabs/Education';
import Health from 'components/atoms/SpotLight/tabs/Health';
import Population from 'components/atoms/SpotLight/tabs/Population';
import WaterandSanitation from 'components/atoms/SpotLight/tabs/WaterandSanitation';
import DistrictRank from 'components/atoms/SpotLight/DistrictRank';
import Generic from '../Generic';


/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */

export default () => {
  const headerStyles = {
    paddingTop: '4em',
    paddingBottom: '4em',
  };
  const HeaderContainer = glamorous.div(headerStyles);
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
      <TabsDark selected={0} textAlign="center">
        <Pane label="Poverty">
          <Poverty />
        </Pane>
        <Pane label="Population">
          <Population />
        </Pane>
        <Pane label="Education">
          <Education />
        </Pane>
        <Pane label="Health">
          <Health />
        </Pane>
        <Pane label="Water and Sanitation">
          <WaterandSanitation />
        </Pane>
        <Pane label="District Public Resources">
          <DistrictPublicResources />
        </Pane>
      </TabsDark>
      <Container>
        <DistrictRank />
      </Container>
    </Generic>
  );
};
