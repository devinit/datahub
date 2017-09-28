// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
import Visualization from 'components/molecules/whereAreThePoorViz';
import Generic from '../Generic';
import data from './data';

const StyledPre = glamorous.pre({
  fontFamily: 'inherit',
  fontSize: '22px',
  overflow: 'hidden',
  fontWeight: '300',
  lineHeight: '33px',
  color: '#453f43'
});
const BottomWrapper = glamorous.div({
  '& h3': {
    lineHeight: '30px !important',
    fontSize: '24px !important',
  }
});
const TextContainer = glamorous.p({
  lineHeight: '24px',
  fontSize: '16px',
});
const HeaderContainer = glamorous.div({
  paddingTop: '4em',
  paddingBottom: '0em',
  '& h1.ui.header': {
    fontSize: '3em',
  },
  '& .sub.header': {
    fontSize: '0.55em !important',
  },
});
export default () => {
  return (
    <Generic pathname="/where-are-the-poor">
      <Container>
        <HeaderContainer>
          <Header as="h1">
            <Header.Content>
              Where are the poor and where will they be?
              <Header.Subheader><StyledPre>{data.subHeader}</StyledPre></Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
        <iframe
          title="where are the poor"
          src="http://localhost:5000/#!/post/where-are-the-poor"
          frameBorder="0"
          scrolling="no"
          style={{ width: '100%', height: '650px' }}
        />
      </Container>
      <Container>
        <BottomWrapper>
          <Grid>
            <Grid.Row>
              <Grid.Column computer="12" tablet="16" mobile="16">
                <Header as="h3">About this visualisation</Header>
                <TextContainer>
                  {data.abtVisualization}
                </TextContainer>
                <TextContainer>{data.dateAccessed}</TextContainer>
                <Header as="h3">Scenario details</Header>
                <TextContainer>
                  {data.scenarioDetails}
                </TextContainer>
                <Header as="h3">About the data</Header>
                <TextContainer>
                  {data.aboutData}
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
