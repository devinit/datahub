// @flow
import React from 'react';
import {Container, Grid, Header, Icon, Table, Button} from 'semantic-ui-react';
import glamorous, {Div} from 'glamorous';
import GlobalPictureNavTabs from 'components/organisms/GlobalPictureNavTabs';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import NoSSR from 'react-no-ssr';
import {HeaderGroup, SectionHeader} from 'components/atoms/Header';
import {LightBg, DarkBg, MapBackground } from 'components/atoms/Backgrounds';
import Map from 'components/organisms/Map';
import CountrySeachInput from 'components/organisms/CountrySearchInput';
import GlobalPictureCountrySeach from 'components/molecules/GlobalPictureCountrySearch';
import { red, white, lighterGrey } from 'components/theme/semantic';
import {connect} from 'react-redux';
import type {State, AppState} from 'lib/reducers';
import Generic from '../Generic';

type Props = {
  pathName: string;
  rehydrated: boolean;
}
/* eslint-disable max-len */
const front = (props: Props) => {
  return (
    <Generic>
      <GlobalPictureCountrySeach>
        <CountrySeachInput visible />
      </GlobalPictureCountrySeach>
      <Container>
        <Div paddingTop={'2em'} paddingBottom={'2em'} fontSize={'1.2rem'}>
          <Grid centered>
            <Grid.Column width={8} textAlign="center">
              <b><Icon name="pie graph" />The Development Data Hub </b> is the most comprehensive source for financial
              resource flow data alongside poverty, social and vulnerability indicators.
              Read more about the data hub.
            </Grid.Column>
          </Grid>
        </Div>
      </Container>
      <div style={{position: 'relative'}}>
        <GlobalPictureNavTabs />
        {props.rehydrated ? <Map pathName={props.pathName} /> : <MapBackground />}
      </div>
      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          DATA VISUALIZATIONS
        </SectionHeader>
      </DarkBg>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Div paddingTop={'2em'} paddingBottom={'2em'} >
              <SectionHeader>
                ABOUT THE <span>DEVELOPMENT DATA HUB</span>
              </SectionHeader>
            </Div>
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
          <Grid.Row centered>
            <Grid.Column width="12">
              {/* <iframe
                src="http://www.youtube.com/embed/2G1Gg2opKPg?rel=0&amp;showinfo=0"
                title="About Datahub"
                frameBorder="0"
                height="585"
                style={{width: '100%'}}
              /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <LightBg>
        <Container textAlign="center">
          <SectionHeader color={white}>
            DATA SOURCES
          </SectionHeader>
          <Div paddingTop={'2em'} paddingBottom={'2em'} >
            For documentation and data downloads, navigate to the methodology page.
          </Div>
          <Button color="grey" size="large">Methodology and Data <Icon name="chevron right" /></Button>
        </Container>
      </LightBg>
    </Generic>
  );
};
const mapStateToProps = ({app: {rehydrated}}: State) => ({rehydrated});

const FrontWithRedux = connect(mapStateToProps)(front);

export default FrontWithRedux;
