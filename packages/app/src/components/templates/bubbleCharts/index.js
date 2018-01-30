// @flow
import React from 'react';
import glamorous, {Div, P} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import SocialMediaBar from 'components/molecules/SocialMediaBar';
import {config} from 'package.json';
import {mediaQueries} from 'components/theme';
import Generic from '../Generic';

/* eslint-disable max-len */

type Props = {
  pathname: string
}
const StyledIframe = glamorous.iframe({
  width: '100%',
  height: '700px',
  [mediaQueries.tabs]: {
    width: '102%',
    height: '1475px',
  },
  [mediaQueries.phone]: {
    height: '14755px',
  },
});
export default ({pathname}: Props) =>
  (<Generic pathname={pathname}>
    <Div paddingTop="5em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="16" tablet="16" mobile="16">
              <Header as="h2" textAlign="center" color="red">
                {pathname === '/oda-donor' ?
                  'Different providers, different priorities' :
                  'Are domestic public resources able to meet the needs of the poorest people?'
                }
              </Header>
              <P textAlign="center" fontSize="1.1em" paddingBottom="2em">
                {pathname === '/oda-donor' ?
                  `How effectively are donors targeting the countries with the highest numbers of people in poverty
                  and the least domestic public resources to address it? This chart allows you to select
                  a provider of aid to see how it allocates aid across countries.` :
                  `The proportion of people living in extreme poverty worldwide has more than halved since 2000,
                    yet progress is varied across countries. Although domestic public resources are an important
                  resource to drive efforts to end poverty, they remain scarce in many countries where poverty is high.`
                }
              </P>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <StyledIframe
        title="oda-donor"
        src={pathname === '/oda-donor' ?
          `${config.old_datahub}/#!/post/oda-donor` :
          `${config.old_datahub}/#!/post/poverty`
        }
        frameBorder="0"
        scrolling="no"
      />
      {process.env.NODE_ENV !== 'test' ? <SocialMediaBar /> : '' }
    </Div>

  </Generic>);
