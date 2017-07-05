// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Grid, Container, Button, Icon} from 'semantic-ui-react';
import BubbleSize from 'components/atoms/BubbleSizeDropDown';
import ColorBy from 'components/atoms/BubbleChartColorBy';
import HighlightByIncomeGroup from 'components/atoms/BubbleChartHighlightByIncomeGroup';
import HighlightByRegions from 'components/atoms/BubbleChartHighlightRegions';
import SelectedCountries from 'components/atoms/BubbleChartSelectedCountries';
import BubbleChartPrint from 'components/atoms/BubbleChartPrint';
import BubbleChartAxisSettings from 'components/atoms/BubbleChartAxisSettings';
import BubbleChartAnnotation from 'components/atoms/BubbleChartAnnotation';
import Slider from 'components/molecules/YearSlider';
import {red} from 'components/theme/semantic';

const ChartContainer = glamorous.div({
  height: '500px',
});
const AnnotationContainer = glamorous.div({
  position: 'relative',
});
const PlayContainer = glamorous.div({
  marginTop: '-12px',
});
const Link = glamorous.a({
  color: red,
  marginTop: '25px',
  display: 'block',
  marginBottom: '20px'
});
type Props = {
  data: Object
}
type State = {
  colorBy: string,
  showMoreOptions: boolean
}

class BubbleChartWidget extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      colorBy: 'region',
      showMoreOptions: false,
    };
  }
  state: State;
  onChangeColorBy(colorBy: string) {
    console.log('color', colorBy);
    this.setState({colorBy});
  }
  toggleMoreOptions() {
    if (this.state.showMoreOptions) {
      this.setState({showMoreOptions: false});
    } else {
      this.setState({showMoreOptions: true});
    }
  }

  render() {
    const {data} = this.props;
    const {showMoreOptions, colorBy} = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <ChartContainer>
                <AnnotationContainer>
                  <BubbleChartAnnotation />
                </AnnotationContainer>
              </ChartContainer>
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
              <ColorBy options={data.colorBy} onChange={(change) => this.onChangeColorBy(change)} />
              <HighlightByIncomeGroup options={data.highlightIncome} colorBy={colorBy === 'income-group'} />
              <HighlightByRegions options={data.highlightRegion} colorBy={colorBy === 'region'} />
              <Link onClick={() => this.toggleMoreOptions()}><Icon name="plus" /> More Info</Link>
              {showMoreOptions ?
                <div>
                  <BubbleChartAxisSettings title="X-axis settings" />
                  <BubbleChartAxisSettings title="Y-axis settings" />
                </div>
              : false}
              <BubbleChartPrint onClick={() => {}} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>);
  }
}

export default BubbleChartWidget;
