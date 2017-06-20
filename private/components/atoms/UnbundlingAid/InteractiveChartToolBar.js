import React from 'react';
import glamorous from 'glamorous';
import { white, lightGrey } from 'components/theme/semantic';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';

const ToolBarContainer = glamorous.div({
  background: lightGrey,
  paddingTop: '.5em',
  paddingBottom: '.5em',
  fontSize: '1.7em',
  '& .disabled': {
    opacity: '0.4',
  }
});
const BoldText = glamorous.span({
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: '900',
  paddingLeft: '.15em'
});
const SmallText = glamorous.span({
  cursor: 'pointer',
  fontSize: '.55em',
  paddingLeft: '.15em'
});

const InteractiveChartToolBar = () => (
  <ToolBarContainer>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="12" textAlign="right" verticalAlign="middle">
            <span>ODA in
              <BoldText>2015 </BoldText>
              <SmallText>to </SmallText>
              <BoldText>All</BoldText>
              <SmallText className="disabled">from</SmallText>
              <BoldText className="disabled"> All</BoldText>
              <SmallText className="disabled">sector </SmallText>
              <BoldText className="disabled">All</BoldText>
              <SmallText className="disabled">in the form of</SmallText>
              <BoldText className="disabled">All</BoldText>
              <SmallText className="disabled">via channel</SmallText>
              <BoldText className="disabled">All</BoldText>
            </span>
          </Grid.Column>
          <Grid.Column width="4" textAlign="right" verticalAlign="top">
            <Button size="large" color="grey">Compare <Icon name="plus" /></Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </ToolBarContainer>
);

export default InteractiveChartToolBar;
