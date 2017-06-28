// @flow
import React from 'react';
import glamorous from 'glamorous';
import { white, lightGrey } from 'components/theme/semantic';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import ToolBar from 'components/molecules/InteractiveToolBarItem';
import data from 'components/templates/Aid/data';

const ToolBarContainer = glamorous.div({
  background: lightGrey,
  '& i.icon': {
    margin: '0 !important',
  }
}, (props) => ({
  fontSize: props.compare ? '1em' : '1.7em',
  paddingTop: props.compare ? '.85em' : '.5em',
  paddingBottom: props.compare ? '.85em' : '.5em',
}));

type Props = {
};
class InteractiveChartToolBar extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      compare: false,
    };
  }

  state: {
    compare: boolean
  }
  toggleCompare() {
    if (this.state.compare) {
      this.setState({compare: false});
    } else {
      this.setState({compare: true});
    }
  }
  render() {
    const {compare} = this.state;
    return (
      <ToolBarContainer compare={compare}>
        <Container>
          <Grid>
            <Grid.Row>
              <ToolBar data={data.toolBar} width={compare ? 6 : 10} />
              {compare ? <ToolBar data={data.toolBar} width={6} /> : ''}
              <Grid.Column width="4" textAlign="right" verticalAlign="top">
                <Button
                  onClick={() => this.toggleCompare()}
                  size="large"
                  color="grey"
                >
                  {compare ? <Icon name="close" /> : 'compare '}
                  {!compare ? <Icon name="plus" /> : ''}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ToolBarContainer>
    );
  }
}
export default InteractiveChartToolBar;
