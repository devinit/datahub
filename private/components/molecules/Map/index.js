// @flow
import React, {Component} from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {MapData, PaintMap} from 'components/atoms/BaseMap';
import glamorous, {Div, P} from 'glamorous';
import {lightGrey} from 'components/theme/semantic';
import type {LegendField} from 'components/atoms/MapLegend';
import Legend from 'components/atoms/MapLegend';
import YearSlider from 'components/molecules/YearSlider';
import {Grid} from 'semantic-ui-react';
import RankingsTable from 'components/molecules/RankingsTable';
import ChartShare from 'components/molecules/ChartShare';
import data from './data';
import mapConfigs from './config';

type Props = {
   mapStyle?: string,
   ...MapDataQuery
};

type State = {
   currentYear: number,
   data: MapData[]
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
    if (!props.mapData) throw new Error('mapData is missing in props');
    if (!props.mapData.map) throw new Error('mapData data is missing in props');
    if (!props.mapData.end_year) throw new Error('mapData end_year is missing in props');
    if (!props.mapData.start_year) throw new Error('mapData start_year is missing in props');
    this.startYear = props.mapData.start_year;
    this.endYear = props.mapData.end_year;
    const yearSliderVisibility = this.endYear > this.startYear;
    const data = yearSliderVisibility ?
      Map.setCurrentYearData(props.mapData.end_year, props.mapData.map) : props.mapData.map;
    const currentYear: number = this.endYear;
    this.state = {currentYear, data};
  }
  state: State
  onYearChange(year: number) {
    this.state.currentYear = year;
    if (this.props && this.props.mapData && this.props.mapData.map) {
      const data = Map.setCurrentYearData(year, this.props.mapData.map);
      this.setState({currentYear: year, data});
      console.log(this.state);
    }
  }
  startYear: number;
  endYear: number;
  render() {
    if (!this.props.mapData) throw new Error('mapData is missing in props');
    if (!this.props.mapData.name) throw new Error('mapData name is missing in props ');
    if (!this.props.mapData.legend) throw new Error(`mapData legend is missing in props for ${this.props.mapData.name}`);
    if (!this.props.mapData.description) throw new Error(`mapData description is missing in props for ${this.props.mapData.name}`);
    if (!this.props.mapData.country) throw new Error(`mapData country is missing in props ${this.props.mapData.name}`);
    const country: string = this.props.mapData.country;
    const config = mapConfigs[country];
    const paint: PaintMap = {data: this.state.data, ...config.paint};
    return (
      <Grid>
        <Grid.Row>
          <BaseMap paint={paint} viewport={config.viewport} />
          <Legend
            title={this.props.mapData.name}
            description={this.props.mapData.description}
            legendData={this.props.mapData.legend}
          />
          <P
            fontSize={'0.7em'}
            color={lightGrey}
            bottom={'15%'}
            right={'2%'}
            position={'absolute'}
          >Country borders do not necessarily reflect Development Initiative&apos;s position.</P>
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
                <P fontSize={'1.2em'}>{this.props.mapData.start_year}</P>
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
        <Grid.Row>
          <RankingsTable data={data.countryRankings} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Map;
