// @flow
import React from 'react';
import {Container, Grid, Header, Icon, Table} from 'semantic-ui-react';
import type { Element } from 'react';
import glamorous from 'glamorous';
import {HeaderGroup} from 'components/atoms/CountryProfiles/Common';
import CountriesRankings from 'components/atoms/Front/CountriesRankings';
import Poverty from 'components/atoms/Front/tabs/Poverty';
import Map from 'components/atoms/Map';
import Vulnerability from 'components/atoms/Front/tabs/Vulnerability';
import GovernmentFinance from 'components/atoms/Front/tabs/GovernmentFinance';
import InternationalFinance from 'components/atoms/Front/tabs/InternationalFinance';
import InternationalOfficial from 'components/atoms/Front/tabs/InternationalOfficial';
import HumanitarianFinance from 'components/atoms/Front/tabs/HumanitarianFinance';
import DataRevolution from 'components/atoms/Front/tabs/DataRevolution';
import ForwardLooking from 'components/atoms/Front/tabs/ForwardLooking';
import {Pane, TabsDark} from 'components/atoms/Tabs';
import Generic from '../Generic';
import Search from '../../molecules/Search';
import Slider from '../../molecules/YearSlider';
import ChartShare from '../../molecules/ChartShare';

type Props = {
  children?: Element<any>,
};
const HeaderContainer = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em',
  fontSize: '1.2rem',
});
export default ({ children}: Props) => {
  return (
    <Generic pathName="/">
      <Search />
      <Container>
        <HeaderContainer>
          <Grid centered>
            <Grid.Column width={8} textAlign="center">
              <b><Icon name="pie graph" />The Development Data Hub </b> is the most comprehensive source for financial
              resource flow data alongside poverty, social and vulnerability indicators.
              Read more about the data hub.
            </Grid.Column>
          </Grid>
        </HeaderContainer>
      </Container>
      <TabsDark selected={0} >
        <Pane label="Poverty">
          <Poverty />
        </Pane>
        <Pane label="Vulnerability">
          <Vulnerability />
        </Pane>
        <Pane label="Government Finance">
          <GovernmentFinance />
        </Pane>
        <Pane label="International Finance">
          <InternationalFinance />
        </Pane>
        <Pane label="International Official Finance">
          <InternationalOfficial />
        </Pane>
        <Pane label="Humanitarian Finance">
          <HumanitarianFinance />
        </Pane>
        <Pane label="Data Revolution">
          <DataRevolution />
        </Pane>
        <Pane label="Forward Looking ODA">
          <ForwardLooking />
        </Pane>
      </TabsDark>
      <Container fluid>
        <Map />
      </Container>
      <Container>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              <Slider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <HeaderGroup>
                <Header as="h3">2013</Header>
                <Header as="h5">(This indicator has data for a single year only.)</Header>
              </HeaderGroup>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <ChartShare size="big" color="black" />
            </Grid.Column>
          </Grid.Row>
          <CountriesRankings />
        </Grid>
      </Container>
    </Generic>
  );
};
