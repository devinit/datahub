import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button, Table } from 'semantic-ui-react';
import { red, lightBlack, white } from 'components/theme/semantic';
import RegionalProfileLowerSection from 'components/molecules/RegionalProfileLowerSection';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {SectionHeader, Lead} from 'components/atoms/Header';
import {LightBg, DarkBg} from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import {CardContainer} from 'components/atoms/Container';
import SearchInput from 'components/organisms/CountrySearchInput';
import Generic from '../Generic';
import data from './data';

const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em'
});
const UpperContainer = glamorous.div({
  borderBottom: '2px solid #ddd9dc',
  marginBottom: '.2em',
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
                  countries={data.regions}
                  placeholder={data.meta.region}
                />
                <Lead>{data.meta.description}</Lead>
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

    <RegionalProfileLowerSection />
    <ProfileDataSourceTable data={data.dataSources} />
  </Generic>);
