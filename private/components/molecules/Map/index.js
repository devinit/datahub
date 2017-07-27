// @flow
import React, {Component} from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {MapData, PaintMap} from 'components/atoms/BaseMap';
import glamorous, {Div, P} from 'glamorous';
import {lighterGrey, lightGrey} from 'components/theme/semantic';
import type {LegendField} from 'components/atoms/MapLegend';
import Legend from 'components/atoms/MapLegend';
import YearSlider from 'components/molecules/YearSlider';
import {Grid, Container} from 'semantic-ui-react';
import RankingsTable from 'components/molecules/RankingsTable';
import type {Props as RankingsTableProps, Data as RankingsTableData} from 'components/molecules/RankingsTable';
import ChartShare from 'components/molecules/ChartShare';
import type {MapConfig} from './config';
import mapConfigs from './config';

type Props = {
   mapStyle?: string,
   loading: boolean,
   ...MapDataQuery
};

type State = {
   currentYear: number,
   data: MapData[],
   paint: PaintMap
}

class Map extends Component {

  static setCurrentYearData(currentYear: number, data: MapData[]): MapData[] {
    return data.filter(obj => {
      if (obj.year === undefined) throw new Error('year property is missing in map data obj');
      return obj.year === currentYear;
    });
  }
  constructor(props: Props) {
    super(props);
    if (!props.mapData || !props.mapData.country) throw new Error('mapData country is missing in props values');
    this.country = props.mapData.country;
    this.config = mapConfigs[this.country];
    this.init(props);
  }
  state: State
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.init(nextProps);
  }

  onYearChange(year: number) {
    this.state.currentYear = year;
    if (this.props && this.props.mapData && this.props.mapData.map) {
      const data = Map.setCurrentYearData(year, this.props.mapData.map);
      this.setState({currentYear: year, data});
    }
  }
  setCountryRankData(): RankingsTableProps {
    const sortedData = this.state.data
      .filter(obj => obj.value && obj.id)
      .map((obj: MapData) => {
        const flag: string = obj.id ? obj.id.toLocaleLowerCase() : 'N/A';
        const name = obj.name ? obj.name : 'N/A';
        if (!obj.value || !obj.uid) throw new Error('value must be defined');
        return {name, value: obj.value, flag, uid: obj.uid};
      })
      .sort((a, b) => {
        if (!a.value || !b.value) throw new Error('value must be defined');
        return a.value - b.value;
      });
    const top = sortedData.slice(0, 10);
    const bottom = sortedData.slice(-10);
    return {
      hasflags: this.country === 'global',
      data: {top, bottom}
    };
  }
  init(props: Props) {
    if (!props.mapData) throw new Error('mapData is missing in props');
    if (!props.mapData.map) throw new Error('mapData data is missing in props');
    if (!props.mapData.start_year) throw new Error('mapData start_year is missing in props');
    this.startYear = props.mapData.start_year;
    this.endYear = props.mapData.end_year || props.mapData.start_year;
    this.yearSliderVisibility = this.endYear > this.startYear;
    const currentYear: number = this.endYear > 2015 ? 2015 : this.endYear;
    const data = this.yearSliderVisibility ?
      Map.setCurrentYearData(currentYear, props.mapData.map) : props.mapData.map;
    const paint: PaintMap = {data, ...this.config.paint};
    this.state = {currentYear, data, paint};
  }
  yearSliderVisibility: boolean;
  startYear: number;
  endYear: number;
  country: string;
  config: MapConfig;
  render() {
    if (!this.props.mapData) throw new Error('mapData is missing in props, checking the data was loaded or came through');
    if (!this.props.mapData.name) this.props.mapData.name = 'Place holder name';
    if (!this.props.mapData.legend) throw new Error(`mapData legend is missing in props for ${this.props.mapData.name}`);
    const name: string = this.props.mapData.name;
    const description: string = this.props.mapData.description || 'Please had a proper description ';
    const legendData = this.props.mapData.legend;
    return (
      <Container fluid>
        <Grid columns={1}>
          <Grid.Row>
            <Div width={'100%'}>
              <BaseMap paint={this.state.paint} viewport={this.config.viewport} />
            </Div>
            <Legend
              title={name}
              description={description}
              legendData={legendData}
            />
            <P
              fontSize={'0.7em'}
              color={lightGrey}
              bottom={'15%'}
              right={'2%'}
              position={'absolute'}
            >
            Country borders do not necessarily reflect Development Initiative&apos;s position.</P>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              {
            this.yearSliderVisibility ?
            (<YearSlider
              minimum={this.startYear}
              maximum={this.endYear}
              step={1}
              position={this.endYear}
              onChange={year => this.onYearChange(year)}
            />)
          :
          (<Div fontWeight={'bold'}>
            <P fontSize={'1.2em'}>{this.startYear}</P>
            <P>(This indicator has data for a single year only.)</P>
          </Div>)
          }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <ChartShare size="big" color="black" />
            </Grid.Column>
          </Grid.Row>
          <RankingsTable {...this.setCountryRankData()} />
        </Grid>
      </Container>
    );
  }
}

export default Map;
