import * as React from 'react';
import { Div, P } from 'glamorous';
import { SectionHeader } from '../../atoms/Header';
import { red, white } from '../../theme/semantic';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import { DarkBg, LightBg } from '../../atoms/Container';
import Observer from 'react-intersection-observer';
import { router as routerx } from '../../../utils';
import { SingletonRouter } from 'next/router';
import pageData from '../../pageData/data';

const goToMethodologyPage = (router?: SingletonRouter) => () =>
  router ? router.push('/methodology') : routerx.push('/methodology');

if ((process as any).browser) {
  require('intersection-observer');
}

export default ({ router }: {router?: SingletonRouter}) =>
    <section id="about">
      <DarkBg>
        <SectionHeader color={ red } fontColor={ white }>
          DATA VISUALISATIONS
        </SectionHeader>
      </DarkBg>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Div paddingTop={ '2em' } paddingBottom={ '2em' }>
              <SectionHeader>
                ABOUT THE <span>DEVELOPMENT DATA HUB</span>
              </SectionHeader>
            </Div>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="8">
              <Header as="h3">{ pageData.about[0].title }</Header>
              <p>
                { pageData.about[1].narrative }
              </p>
            </Grid.Column>
            <Grid.Column width="8">
              <Header as="h3">How does it work?</Header>
              <p>
                { pageData.about[2].narrative }
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="12">
                <Observer>
                <iframe
                  src="https://player.vimeo.com/video/296043249"
                  title="About Datahub"
                  frameBorder="0"
                  height="585"
                  style={ { width: '100%' } }
                  allowFullScreen
                />
                </Observer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <LightBg>
        <Container textAlign="center">
          <SectionHeader color={ white }>DATA SOURCES</SectionHeader>
          <P paddingTop={ '2em' } paddingBottom={ '2em' }>
            For documentation and data downloads, navigate to the methodology page.
          </P>
          <Button color="grey" size="large" onClick={ goToMethodologyPage(router) }>
            Methodology and Data <Icon name="chevron right" />
          </Button>
        </Container>
      </LightBg>
    </section>
    ;
