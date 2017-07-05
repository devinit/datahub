// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Grid, Container, Button} from 'semantic-ui-react';
import BubbleSize from 'components/atoms/BubbleSizeDropDown';
import ColorBy from 'components/atoms/ColorBy';
import HighlightByIncomeGroup from 'components/atoms/HighlightByIncomeGroup';
import HighlightByRegions from 'components/atoms/HighlightRegions';
import SelectedCountries from 'components/atoms/SelectedCountries';
import BubbleChartPrint from 'components/atoms/BubbleChartPrint';
import BubbleChartAxisSettings from 'components/atoms/BubbleChartAxisSettings';
import Slider from 'components/molecules/YearSlider';

const ChartContainer = glamorous.div({
  height: '500px',
});
const PlayContainer = glamorous.div({
  marginTop: '-12px',
});

type Props = {
  data: Object
}
type State = {
  colorBy: string,
}

class BubbleChartWidget extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      colorBy: 'income',
    };
  }
  state: State;
  render() {
    const {data} = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <ChartContainer />
              <Grid>
                <Grid.Column width={1}>
                  <PlayContainer>
                    <Button icon="play" />
                  </PlayContainer>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Slider
                    onChange={() => {}}
                    minimum={2000}
                    maximum={2020}
                    step={1}
                    position={2016}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16}>
              <BubbleSize options={data.bubbleSize} />
              <SelectedCountries placeholder="Select Country" onChange={() => {}} options={data.countries} />
              <ColorBy options={data.colorBy} />
              <HighlightByIncomeGroup options={data.highlightIncome} colorBy={false} />
              <HighlightByRegions options={data.highlightRegion} colorBy />
              <BubbleChartAxisSettings title="X-axis settings" />
              <BubbleChartAxisSettings title="Y-axis settings" />
              <BubbleChartPrint onClick={() => {}} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>);
  }
}

export default BubbleChartWidget;
