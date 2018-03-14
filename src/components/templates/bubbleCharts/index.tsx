import * as React from 'react';
import glamorous, {Div, P} from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import SocialMediaBar from '../../molecules/SocialMediaBar';
import {mediaQueries} from '../../theme';
import Generic from '../Generic';
import pageData from '../../pageData/data';

declare const OLD_DATAHUB_URL: string;

interface Props  {
  pathname: string;
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
  (<Generic>
    <Div paddingTop="5em">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer="16" tablet="16" mobile="16">
              <Header as="h2" textAlign="center" color="red">
                {pathname === '/oda-donor' ?
                  pageData.odaDonorBubbleChartPageData[0].title :
                  pageData.odaDonorBubbleChartPageData[1].title
                }
              </Header>
              <P textAlign="center" fontSize="1.1em" paddingBottom="2em">
                {pathname === '/oda-donor' ?
               pageData.odaDonorBubbleChartPageData[0].narrative :
                  pageData.odaDonorBubbleChartPageData[1].narrative
                }
              </P>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <StyledIframe
        title="oda-donor"
        src={pathname === '/oda-donor' ?
          `${OLD_DATAHUB_URL}/#!/post/oda-donor` :
          `${OLD_DATAHUB_URL}/#!/post/poverty`
        }
        frameBorder="0"
        scrolling="no"
      />
      {process.env.NODE_ENV !== 'test' ? <SocialMediaBar /> : ''}
    </Div>

  </Generic>);
