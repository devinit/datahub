import * as React from 'react';
import { P, Div } from 'glamorous';
import { SectionHeader } from '../../atoms/Header';
import { red, white } from '../../theme/semantic';
import { Container, Grid, Header, Icon, Button } from 'semantic-ui-react';
import { DarkBg, LightBg } from '../../atoms/Container';
import Observer from 'react-intersection-observer';
import {router} from '@devinit/dh-base/lib/utils';

const Router = process.env.npm_package_config_IS_NEXT_APP ? require('next/router') : router;

const goToMethodologyPage = () => Router.push('/methodology');

if ((process as any).browser) require('intersection-observer');

export default () =>
    <section id="about">
      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          DATA VISUALISATIONS
        </SectionHeader>
      </DarkBg>
      <Container>
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
                The Development Data Hub is the most comprehensive online resource for financial
                and resource flow data alongside poverty, social and vulnerability indicators. It
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
                <Observer>
                  <iframe
                    src="http://www.youtube.com/embed/2G1Gg2opKPg?rel=0&amp;showinfo=0"
                    title="About Datahub"
                    frameBorder="0"
                    height="585"
                    style={{ width: '100%' }}
                  />
                </Observer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <LightBg>
        <Container textAlign="center">
          <SectionHeader color={white}>DATA SOURCES</SectionHeader>
          <P paddingTop={'2em'} paddingBottom={'2em'}>
            For documentation and data downloads, navigate to the methodology page.
          </P>
          <Button color="grey" size="large" onClick={goToMethodologyPage}>
            Methodology and Data <Icon name="chevron right" />
          </Button>
        </Container>
      </LightBg>
    </section>
    ;
