// @flow
import React from 'react';
import { Container, Grid, Header, Icon, Button } from 'semantic-ui-react';
import { Div, P } from 'glamorous';
import GlobalPictureNavTabs from 'components/organisms/GlobalPictureNavTabs';
import NoSSR from 'react-no-ssr';
import { SectionHeader } from 'components/atoms/Header';
import { LightBg, DarkBg, MapBackground } from 'components/atoms/Backgrounds';
import CountrySearchInput from 'components/organisms/CountrySearchInput';
import GlobalPictureCountrySearch from 'components/molecules/GlobalPictureCountrySearch';
import { red, white } from 'components/theme/semantic';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import type { State } from 'lib/reducers';
import Generic from '../Generic';

const DynamicMapComponent = dynamic(
  import('components/organisms/Map'), {
    ssr: false,
    loading: () => <MapBackground />
  });

type Props = {
  pathName: string,
  rehydrated: boolean,
};
/* eslint-disable max-len */
const front = (props: Props) => {
  return (
    <Generic>
      <GlobalPictureCountrySearch>
        <CountrySearchInput visible={false} profile={false} />
      </GlobalPictureCountrySearch>
      <Container>
        <Div paddingTop={'2em'} paddingBottom={'2em'} fontSize={'1.2rem'}>
          <Grid centered>
            <Grid.Column width={8} textAlign="center">
              <b>
                <Icon name="pie graph" />The Development Data Hub{' '}
              </b>{' '}
              is the most comprehensive source for financial resource flow data alongside poverty,
              social and vulnerability indicators. <a href="#about">Read more about the data hub.</a>
            </Grid.Column>
          </Grid>
        </Div>
      </Container>
      <div style={{ position: 'relative' }}>
        <GlobalPictureNavTabs />
        <DynamicMapComponent pathName={props.pathName} />
      </div>
      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          DATA VISUALIZATIONS
        </SectionHeader>
      </DarkBg>
      <Container>
		<div id="about">
			<Grid>
			  <Grid.Row centered>
				<Div paddingTop={'2em'} paddingBottom={'2em'}>
				  <SectionHeader>
					ABOUT THE <span>DEVELOPMENT DATA HUB</span>
				  </SectionHeader>
				</Div>
			  </Grid.Row>
			  <Grid.Row centered>
				<Grid.Column width="8">
				  <Header as="h3">The Development Data Hub</Header>
				  <p>
					The Development Data Hub is the most comprehensive online resource for financial and
					resource flow data alongside poverty, social and vulnerability indicators. It
					combines an extensive data store with interactive visualisations enabling you to
					chart, map and compare data at the global, national and local level.
				  </p>
				</Grid.Column>
				<Grid.Column width="8">
				  <Header as="h3">How does it work?</Header>
				  <p>
					It brings together many data sets, enabling you to dig into these through
					interactive maps, charts and visualisations. It turns complex data around poverty
					and resource flows into easy to understand robust information and evidence about
					what is really going on. The Data Hub is an accessible and easy to use tool for
					anyone wanting to know more about how resources for development are spent.
				  </p>
				</Grid.Column>
			  </Grid.Row>
			  <Grid.Row centered>
				<Grid.Column width="12">
				  <NoSSR onSSR={<P textAlign={'center'}>Loading...</P>}>
					<iframe
					  src="http://www.youtube.com/embed/2G1Gg2opKPg?rel=0&amp;showinfo=0"
					  title="About Datahub"
					  frameBorder="0"
					  height="585"
					  style={{ width: '100%' }}
					/>
				  </NoSSR>
				</Grid.Column>
			  </Grid.Row>
			</Grid>
		</div>
      </Container>
      <LightBg>
        <Container textAlign="center">
          <SectionHeader color={white}>DATA SOURCES</SectionHeader>
          <Div paddingTop={'2em'} paddingBottom={'2em'}>
            For documentation and data downloads, navigate to the methodology page.
          </Div>
          <Button color="grey" size="large">
            Methodology and Data <Icon name="chevron right" />
          </Button>
        </Container>
      </LightBg>
    </Generic>
  );
};
const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });

const FrontWithRedux = connect(mapStateToProps)(front);

export default FrontWithRedux;
