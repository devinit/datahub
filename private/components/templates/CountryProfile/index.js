// @flow
import React from 'react';
import glamorous, {Div, A, Span} from 'glamorous';
import { Container, Header, Grid, Icon, Button, Table } from 'semantic-ui-react';
import { red, lightBlack, white, lighterGrey} from 'components/theme/semantic';
import Pane from 'components/atoms/Pane';
import Tabs from 'components/molecules/Tabs';
import {
  GovernmentFinanceLower,
  InternationalResourcesLower,
} from 'components/molecules/CountryProfileTabs';
import {SectionHeader, Lead} from 'components/atoms/Header';
import {LightBg, DarkBg} from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountryProfileTopTabs from 'components/organisms/CountryProfileTabs';
import CountrySeachInput from 'components/organisms/CountrySearchInput';
import {CardContainer} from 'components/atoms/Container';
import SmallMap from 'components/molecules/SmallMap';
import Generic from '../Generic';
import data from './data';
/* eslint-disable react/no-danger */
type Props = {
  id: string
}
export default (props: Props) =>
  (<Generic>
    <Div position={'absolute'} top={'0'} width={'100%'} height={'40em'}>
      <SmallMap slug={'uganda'} />
    </Div>
    <Container>
      <Div borderBottom={'2px solid #ddd9dc'} marginBottom={'.2em'}>
        <CardContainer >
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
                  <CountrySeachInput visible />
                  <Lead>
                    Explore this in-depth profile of Uganda to
                    find out overall levels of poverty, income distribution,
                    division of wealth and more. Discover how national
                    and sub-national revenue is generated.
                  </Lead>
                  <Span marginTop={'1.5em'} display={'block'}>
                    Jump to <A color={red}>International resources</A>
                  </Span>
                  <Div marginTop={'1.5em'}>
                    <Button icon="facebook f" />
                    <Button icon="twitter" />
                    <Button icon="google plus" />
                    <Button icon="mail outline" />
                  </Div>
                </CardContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </CardContainer>
      </Div>
    </Container>
    <CountryProfileTopTabs id={props.id} />
    <Div paddingTop={'4em'} paddingBottom={'4em'}>
      <Container textAlign="center">
        <SectionHeader>
          EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
        </SectionHeader>
      </Container>
    </Div>
    <Tabs selected={0} textAlign="center" height="60em">
      <Pane label="Government Finance" id="government-finance-lower">
        <GovernmentFinanceLower />
      </Pane>
      <Pane label="International Resources" id="international-resources-lower">
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
