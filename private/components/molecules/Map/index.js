// @flow
import React, {Component} from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {MapData, PaintMap, Meta} from 'components/atoms/BaseMap';
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
   data: MapData[],
   currentYear: number
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
    if (this.props && this.props.mapData && this.props.mapData.map) {
      const data = Map.setCurrentYearData(year, this.props.mapData.map);
      this.paint = {data, ...this.config.paint};
      this.setState({currentYear: year, data});
    }
  }
  setCountryRankData(): RankingsTableProps {
    const sortedData = this.state.data
      .filter(obj => obj.value && obj.id)
      .map((obj: MapData) => {
        if (!obj.id) throw new Error('data point id missing for country rank data');
        const flagUrl: string = `/flags/svg/${obj.id}.svg`;
        const name = obj.name ? obj.name : 'N/A';
        if (!obj.value || !obj.uid) throw new Error('value must be defined');
        return {name, value: obj.value, flagUrl, uid: obj.uid};
      })
      .sort((a, b) => {
        if (!a.value || !b.value) throw new Error('value must be defined');
        return a.value - b.value;
      });
    const top = sortedData.slice(0, 10).reverse();
    const bottom = sortedData.slice(-10).reverse();
    return {
      hasflags: this.country === 'global',
      data: {top, bottom}
    };
  }
  init(props: Props) {
    if (!props.mapData) throw new Error('mapData is missing in props');
    if (!props.mapData.start_year) throw new Error('mapData start_year is missing in props');
    if (!props.mapData.default_year) throw new Error('mapData default_year is missing in props');
    const currentYear = props.mapData.default_year;
    this.startYear = props.mapData.start_year;
    this.endYear = props.mapData.end_year ? props.mapData.end_year : this.startYear;
    this.yearSliderVisibility = this.endYear > this.startYear;
    if (!props.mapData || !props.mapData.map) throw new Error('mapData data is missing in props');
    const data = this.yearSliderVisibility ?
      Map.setCurrentYearData(currentYear, props.mapData.map) : props.mapData.map;
    this.paint = {data, ...this.config.paint};
    if (!props.mapData || !props.mapData.legend) throw new Error('mapData legend is missing in props');
    this.legendData = props.mapData.legend;
    this.name = props.mapData && props.mapData.name ? props.mapData.name : 'Indicator must have a name talk to Allan or Donata';
    const uomDisplay = props.mapData.uom_display || '';
    this.description = props.mapData.description || 'Please add a proper description, talk to Allan or Donata ';
    if (!props.mapData.theme) throw new Error('theme is missing in map data props');
    this.meta = {name: this.name, uom_display: uomDisplay, theme: props.mapData.theme};
    this.state = {data, currentYear};
  }
  yearSliderVisibility: boolean;
  startYear: number;
  paint: PaintMap; // map data
  endYear: number;
  meta: Meta;
  country: string;
  config: MapConfig;
  name: string;
  description: string;
  legendData: LegendField[];
  render() {
    return (
      <Container fluid>
        <Grid columns={1}>
          <Grid.Row>
            <Div width={'100%'}>
              <BaseMap paint={this.paint} viewport={this.config.viewport} meta={this.meta} />
            </Div>
            <Legend
              title={this.name}
              description={this.description}
              legendData={this.legendData}
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
              position={this.state.currentYear}
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
