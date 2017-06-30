import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button, Table } from 'semantic-ui-react';
import { red, lightBlack, white } from 'components/theme/semantic';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {
  GovernmentFinance,
  GovernmentFinanceLower,
  InternationalResourcesLower,
  InternationalResources,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/CountryProfileTabs';
import {SectionHeader, Lead} from 'components/atoms/Header';
import {LightBg, DarkBg} from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import Generic from '../Generic';
import SearchInput from '../../molecules/SearchInput';
import data from './data';

const cardStyles = {
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  paddingLeft: '1.5em',
  paddingRight: '1.5em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
};

const CardContainer = glamorous.div(cardStyles);

const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em'
});
const UpperContainer = glamorous.div({
  borderBottom: '2px solid #ddd9dc',
  marginBottom: '.2em',
});
const HeaderContainer = glamorous.div({
  paddingTop: '4em',
  paddingBottom: '4em'
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
    <UpperContainer>
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
                  placeholder="Uganda"
                />
                <Lead>
                  Explore this in-depth profile of Uganda to
                  find out overall levels of poverty, income distribution,
                  division of wealth and more. Discover how national
                  and sub-national revenue is generated.
                </Lead>
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
    </UpperContainer>
    <Tabs selected={0} height="20em">
      <Pane label="Overview">
        <Overview />
      </Pane>
      <Pane label="Poverty">
        <Poverty />
      </Pane>
      <Pane label="Population">
        <Population />
      </Pane>
      <Pane label="Government Finance">
        <GovernmentFinance />
      </Pane>
      <Pane label="International Resources">
        <InternationalResources />
      </Pane>
    </Tabs>

    <HeaderContainer>
      <Container textAlign="center">
        <SectionHeader>
          EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
        </SectionHeader>
      </Container>
    </HeaderContainer>
    <Tabs selected={0} textAlign="center" height="60em">
      <Pane label="Government Finance">
        <GovernmentFinanceLower />
      </Pane>
      <Pane label="International Resources">
        <InternationalResourcesLower />
      </Pane>
    </Tabs>
    <DarkBg>
      <SectionHeader color={red} fontColor={white}>
        MORE FROM DI ON UGANDA
      </SectionHeader>
    </DarkBg>
    <ProfileDataSourceTable data={data.dataSources} />
  </Generic>);
