import * as React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import {mediaQueries} from '../../theme';
import Generic from '../Generic';
import data from './data';
import pageData from '../../pageData/data';

declare const OLD_DATAHUB_URL: string;

const BottomWrapper = glamorous.div({
  '& h3': {
    lineHeight: '1.5 !important',
    fontSize: '1.2em !important',
  }
});
const TextContainer = glamorous.p({
  lineHeight: 1.5,
  fontSize: '1.2em', // NOTE: TODO: this is the write fontsize for all.
});

const HeaderContainer = glamorous.div({
  'paddingTop': '4em',
  'paddingBottom': '0em',
  '& h1.ui.header': {
    fontSize: '3em',
  },
  '& .sub.header': {
    fontSize: '0.55em !important',
  },
});
const StyledIframe = glamorous.iframe({
  width: '100%',
  height: '650px',
  [mediaQueries.tabs]: {
    height: '500px',
  },
  [mediaQueries.phone]: {
    height: '350px',
  },
});
export default () => {
  return (
    <Generic pathname="/where-are-the-poor">
      <Container>
        <HeaderContainer>
          <Header as="h1">
            <Header.Content>
                    {pageData.whereThePoor[0].title}
              <Header.Subheader style={{ fontWeight: '300', lineHeight: 1.5, width: '75%'}}>
                {pageData.whereThePoor[0].narrative}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
      <StyledIframe
        title="where are the poor"
        src={`${OLD_DATAHUB_URL}/#!/post/where-are-the-poor`}
        frameBorder="0"
        scrolling="no"
      />
      <Container>
        <BottomWrapper>
          <Grid>
            <Grid.Row>
              <Grid.Column computer="12" tablet="16" mobile="16">
                <Header as="h3">{pageData.whereThePoor[4].title}</Header>
                <TextContainer>
                  {pageData.whereThePoor[4].narrative}
                </TextContainer>
                <TextContainer>{data.dateAccessed}</TextContainer>
                <Header as="h3">{pageData.whereThePoor[5].title}</Header>
                <TextContainer>
                  {pageData.whereThePoor[5].narrative}
                </TextContainer>
                <Header as="h3">{pageData.whereThePoor[6].title}</Header>
                <TextContainer>
                  {pageData.whereThePoor[6].narrative}
                </TextContainer>
                <br />
              </Grid.Column>
              <Grid.Column computer="4" tablet="16" mobile="16">
                <Header as="h3">Download the data</Header>
                <TextContainer>Not yet available</TextContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </BottomWrapper>
      </Container>
    </Generic>
  );
};
