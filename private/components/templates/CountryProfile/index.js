// @flow
import React from 'react';
import { Div, A, Span, H4 } from 'glamorous';
import { Container, Grid, Icon, Button } from 'semantic-ui-react';
import { red, white } from 'components/theme/semantic';
import { SectionHeader, Lead } from 'components/atoms/Header';
import { DarkBg } from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountrySearch from 'components/organisms/CountrySearchInput';
import CountryProfileTopTabs from 'components/organisms/CountryProfileTabs';
import { CardContainer, ProfileHeader } from 'components/atoms/Container';
import SmallMap from 'components/molecules/SmallMap';
import CountryProfileLowerTabs from 'components/organisms/CountryProfileLowerTabs';
import NoSSR from 'react-no-ssr';
import Generic from '../Generic';
import data from './data';
/* eslint-disable react/no-danger */
type Props = {
  id: string,
};

export default (props: Props) =>
  (<Generic>
    <ProfileHeader>
      <SmallMap slug={props.id} />
      <Div width="100%" position="absolute" top="0">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <CardContainer>
                  <H4 color={red}>
                    <Icon name="globe" color={'red'} />General Picture
                  </H4>
                  <CountrySearch visible placeholder={props.id} profile />
                  <Lead>
                    Explore this in-depth profile of Uganda to find out overall levels of poverty,
                    income distribution, division of wealth and more. Discover how national and
                    sub-national revenue is generated.
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
        </Container>
      </Div>
    </ProfileHeader>
    <CountryProfileTopTabs id={props.id} />
    <Div paddingTop={'4em'} paddingBottom={'4em'}>
      <Container textAlign="center">
        <SectionHeader>
          EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
        </SectionHeader>
      </Container>
    </Div>
    <NoSSR loading={<p>loading ...</p>}>
      <CountryProfileLowerTabs id={props.id} />
    </NoSSR>
    <DarkBg>
      <SectionHeader color={red} fontColor={white}>
        MORE FROM DI ON UGANDA
      </SectionHeader>
    </DarkBg>
    <ProfileDataSourceTable data={data.dataSources} />
  </Generic>);
