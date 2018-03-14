import * as React from 'react';
import glamorous, {Div, P} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import {mediaQueries} from '../../theme';
import Generic from '../Generic';
import pageData from '../../pageData/data';

declare const OLD_DATAHUB_URL: string;

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
export default () =>
  (<Generic>
    <Div paddingTop="5em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="16" tablet="16" mobile="16">
              <Header as="h2" textAlign="center" color="red">
                Who are the global P20?
              </Header>
              <P textAlign="center" fontSize="1.1em" paddingBottom="2em">
               {pageData.whoAreTheGlobalP20[0].narrative}
              </P>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <StyledIframe
        title="who-are-the-global-p20"
        src={`${OLD_DATAHUB_URL}/#!/who-are-the-global-p20`}
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
