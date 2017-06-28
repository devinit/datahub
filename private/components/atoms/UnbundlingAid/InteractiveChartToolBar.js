import React from 'react';
import glamorous from 'glamorous';
import { white, lightGrey } from 'components/theme/semantic';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';

const ToolBarContainer = glamorous.div({
  background: lightGrey,
  paddingTop: '.5em',
  paddingBottom: '.5em',
  fontSize: '1.7em',
  '& .disabled': {
    opacity: '0.4',
  }
});
const InteractiveChartToolBar = () => (
  <ToolBarContainer>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6} textAlign="right" verticalAlign="middle">
            <span>ODA in
              <Select
                active
                bigText="2015"
                options={[{name: '1', value: 'test'}]}
              />
              <Select
                active
                bigText="All"
                smallText="to"
                options={[{name: '1', value: 'test'}]}
              />
              <Select
                bigText="All"
                smallText="from"
                options={[{name: '1', value: 'test'}]}
              />
              <Select
                bigText="All"
                smallText="sector"
                options={[{name: '1', value: 'test'}]}
              />
              <Select
                bigText="All"
                smallText="in the form of"
                options={[{name: '1', value: 'test'}]}
              />
              <Select
                bigText="All"
                smallText="via channel"
                options={[{name: '1', value: 'test'}]}
              />
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
