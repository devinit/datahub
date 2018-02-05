// @flow
import * as React from 'react';
import glamorous, {Div, P} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import {config} from 'package.json';
import {mediaQueries} from '@devinit/dh-ui/lib/theme';
import Generic from '../Generic';

const StyledIframe = glamorous.iframe({
  width: '100%',
  height: '1728px',
  [mediaQueries.tabs]: {
    height: '1900px',
  },
  [mediaQueries.phone]: {
    height: '2825px',
  },
});
/* eslint-disable max-len */
export default () =>
  (<Generic pathname="/who-are-the-global-p20">
    <Div paddingTop="5em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="16" tablet="16" mobile="16">
              <Header as="h2" textAlign="center" color="red">
                Who are the global P20?
              </Header>
              <P textAlign="center" fontSize="1.1em" paddingBottom="2em">
                The P20 are the 1.4 billion men, women and children living in over 100 countries who are the poorest 20% of the global population.
                { }People in the P20 often experience multiple and intersecting deprivations,
                { } disadvantages and discrimination based on identity, circumstances and life events.
                { }The below visualisation enables you to explore how these experiences and identities intersect for the P20 across different countries.
              </P>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <StyledIframe
        title="who-are-the-global-p20"
        src={`${config.old_datahub}/#!/who-are-the-global-p20`}
        frameBorder="0"
        scrolling="no"
      />
      {/* <div className="beta-message">
        <p>BETA: This visualisation is currently a beta version; please share your
          <a
            href="mailto:info@devinit.org"
            className="color-accent"
          >
          feedback
          </a>
          to help us provide the best possible experience.
        </p>
        <i className="tooltip-close" >✖</i>
      </div> */}
    </Div>

  </Generic>);
