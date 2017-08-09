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
import Slider from 'components/molecules/YearSlider';
import {red} from 'components/theme/semantic';
import ScatterChart from 'components/atoms/ScatterChart';

const ChartContainer = glamorous.div({
  margin: '2em 0 3em',
  height: '500px',
  position: 'relative',
});
const AnnotationContainer = glamorous.div({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '400px',
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
  loading: boolean,
  startYear: number,
  maxYear: number,
  minYear: number,
  points: [Object],
  annotation: Object,
  config: Object,
  indicators: Object[],
  colorables: Object[],
  regions: Object[],
  incomeGroups: Object[],
  countries: Object[],
  data: Object
}
type State = {
  year: number,
  colorBy: string,
  showMoreOptions: boolean,
  isPlaying: boolean,
  pointsPerYear: Object,
  incomeGroupColor: Object,
  regionColor: Object,
}

class BubbleChartWidget extends React.Component {
  constructor(props: Props) {
    super(props);
    this.componentWillUpdate(props);
  }
  // eslint-disable-next-line react/sort-comp
  intervalId: number;
  state: State;
  componentWillUpdate(props: Props) {
    const colorBy = this.state ? this.state.colorBy : 'region';
    const regionColor = this.props.regions.reduce((colors, region) => ({
      ...colors,
      [region.name]: region.color
    }), {});
    const incomeGroupColor = this.props.incomeGroups.reduce((colors, region) => ({
      ...colors,
      [region.name]: region.color
    }), {});
    const colorHash = colorBy === 'region' ? regionColor : incomeGroupColor;
    const pointsPerYear = this.getPointsPerYear(colorBy, colorHash);
    this.state = {
      year: props.startYear,
      colorBy,
      showMoreOptions: false,
      isPlaying: false,
      incomeGroupColor,
      regionColor,
      pointsPerYear,
    };
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  onChangeColorBy(colorBy: string) {
    const colorHash = colorBy === 'region' ?
      this.state.regionColor :
      this.state.incomeGroupColor;
    const pointsPerYear = this.getPointsPerYear(colorBy, colorHash);
    this.setState({
      colorBy,
      pointsPerYear,
    });
  }
  getPointsPerYear(colorBy: string, colorHash: Object) {
    return this.props.points
      .map(p => {
        return {...p, color: colorHash[colorBy]};
      })
      .reduce((all, d) => ({
        ...all,
        [d.year]: [
          ...(all[d.year] || []),
          d
        ]
      }), {});
  }
  setYear(year: number) {
    this.setState({
      year: +year
    });
  }
  toggleMoreOptions() {
    this.setState({
      showMoreOptions: !this.state.showMoreOptions
    });
  }
  play() {
    clearInterval(this.intervalId);
    this.setState({isPlaying: true});
    let year = this.state.year;
    this.intervalId = setInterval(() => {
      if (Math.floor(year) === this.props.maxYear) {
        clearInterval(this.intervalId);
        this.setState({isPlaying: true});
      }

      this.setState({
        year,
        ...(Math.floor(year) !== this.state.year ? {
        } : {})
      });
      year += 0.01;
    }, 25);
  }
  pause() {
    clearInterval(this.intervalId);
    this.setState({
      isPlaying: false,
      year: Math.floor(this.state.year)
    });
  }

  render() {
    const {
      minYear,
      maxYear,
      config,
      indicators,
      incomeGroups,
      colorables,
      regions,
      countries,
    } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <ChartContainer>
                <ScatterChart
                  height="500px"
                  config={config}
                  data={this.state.pointsPerYear[Math.floor(+this.state.year)] || []}
                />
                <AnnotationContainer>
                  {this.props.annotation}
                </AnnotationContainer>
              </ChartContainer>
              <Grid>
                <Grid.Column width={1}>
                  <PlayContainer>
                    <Button
                      icon={this.state.isPlaying ? 'pause' : 'play'}
                      onClick={() => this.state.isPlaying ? this.pause() : this.play()}
                    />
                  </PlayContainer>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Slider
                    onChange={year => this.setYear(year)}
                    minimum={minYear}
                    maximum={maxYear}
                    step={1}
                    position={this.state.year}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16}>
              <BubbleSize options={indicators} />
              <SelectedCountries placeholder="Select Country" onChange={() => {}} options={countries} />
              <ColorBy options={colorables} onChange={(change) => this.onChangeColorBy(change)} />
              <HighlightByIncomeGroup
                options={incomeGroups}
                colorBy={this.state.colorBy === 'income-group'}
                onChange={() => this.onChangeColorBy('income-group')}
              />
              <HighlightByRegions
                options={regions}
                colorBy={this.state.colorBy === 'region'}
                onChange={() => this.onChangeColorBy('region')}
              />
              <Link onClick={() => this.toggleMoreOptions()}><Icon name="plus" /> More Info</Link>
              {this.state.showMoreOptions ?
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
