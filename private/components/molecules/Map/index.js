// @flow
import React, { Component } from 'react';
import BaseMap, {indicatorsWith0dp} from 'components/atoms/BaseMap';
import type { MapData, PaintMap, Meta } from 'components/atoms/BaseMap/types';
import { Div, P } from 'glamorous';
import { grey } from 'components/theme/semantic';
import type { LegendField } from 'components/atoms/MapLegend';
import Legend from 'components/atoms/MapLegend';
import YearSlider from 'components/molecules/YearSlider';
import { Grid, Container } from 'semantic-ui-react';
import RankingsTable from 'components/molecules/RankingsTable';
import type { Props as RankingsTableProps } from 'components/molecules/RankingsTable';
import ChartShare from 'components/molecules/ChartShare';
import type {Route} from 'lib/utils';
import {countryOrDistrictLink} from 'lib/utils';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { MapConfig } from './config';
import mapConfigs from './config';

type Props = {
  state: StateToShare,
  ...MapDataQuery,
};

type State = {
  data: MapData[],
  currentYear: number,
};

class Map extends Component {
  static setCurrentYearData(currentYear: number, data: MapData[]): MapData[] {
    return data.filter(obj => {
      if (obj.year === undefined) throw new Error('year property is missing in map data obj');
      return obj.year === currentYear;
    });
  }
  static setCountryRankValue(mapPoint: MapData, meta: Meta): string | number {
    const {value} = mapPoint;
    if (value === undefined || value === null) throw new Error('country rank value should be defined');
    if (meta.id === 'data_series.fragile_states' && mapPoint.detail) return mapPoint.detail;
    const ThemesWith1dp = ['vulnerability', 'government-finance', 'uganda-poverty', 'uganda-health'];
    const indicatorsWith1dp = ['spotlight_on_uganda.uganda_dependency_ratio'];
    if (indicatorsWith0dp.includes(meta.id)) return value.toFixed(0);
    // if (indicatorsWith2dp.includes(meta.id)) return value.toFixed(2);
    if (ThemesWith1dp.includes(meta.theme) || indicatorsWith1dp.includes(meta.id)) {
      return value.toFixed(1);
    }
    if (meta.uom_display === '%') return value.toFixed(2);
    if (meta.uom_display === 'US$') return value.toFixed(1);
    return value;
  }
  constructor(props: Props) {
    super(props);
    if (!props.mapData) throw new Error('mapData is missing in props');
    if (!props.mapData.country) throw new Error('country is missing in props');
    this.country = props.mapData.country;
    this.config = mapConfigs[this.country];
    this.init(props);
    // onLoadCss();
  }
  state: State;
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.init(nextProps);
  }

  onYearChange(year: number) {
    if (this.props && this.props.mapData && this.props.mapData.map) {
      const data = Map.setCurrentYearData(year, this.props.mapData.map);
      this.paint = { data, ...this.config.paint };
      this.setState({ currentYear: year, data });
    }
  }
  setCountryRankData(): RankingsTableProps {
    const sortedData = this.state.data
      .filter(obj => obj.value && obj.id)
      .sort((a, b) => {
        if (!a.value || !b.value) throw new Error('value must be defined'); // make flow happy
        return b.value - a.value;
      })
      .map((obj: MapData, index: number) => {
        if (!obj.id) throw new Error('data point id missing for country rank data');
        const flagUrl: string = this.country === 'global' ? `/flags/svg/${obj.id}.svg` : '';
        const name = obj.name ? obj.name : 'N/A';
        // make flow happy
        if (!obj.value || !obj.slug) throw new Error('value must be defined for country rank data');
        const value = this.meta ? Map.setCountryRankValue(obj, this.meta) : obj.value;
        const route: Route = countryOrDistrictLink(this.meta.country, obj.slug);
        const uom: string = this.meta && this.meta.uom_display ? this.meta.uom_display : '';
        return { name, value, flagUrl, uid: obj.uid || '', position: index, route, uom};
      });
    const top = sortedData.slice(0, 10).map(obj => {
      if (Number(obj.value) > 1000) return {...obj, value: Number(obj.value).toFixed(0)};
      if (this.meta.id === 'data_series.fdi_pp') return {...obj, value: Number(obj.value).toFixed(0)};
      return obj;
    });
    const bottom = sortedData.slice(-10);
    return {
      hasflags: this.country === 'global',
      data: { top, bottom },
    };
  }
  initYearSetup(props: Props) {
    if (!props.mapData) throw new Error('mapData is missing in props');
    if (!props.mapData.start_year) throw new Error('start_year is missing in props');
    if (!props.mapData.default_year) throw new Error('default_year is missing in props');
    const currentYear = props.state && props.state.year ?
      props.state.year : props.mapData.default_year;
    this.startYear = props.mapData.start_year;
    this.endYear = props.mapData.end_year ? props.mapData.end_year : this.startYear;
    this.yearSliderVisibility = this.endYear > this.startYear;
    this.state = { ...this.state, currentYear };
  }
  initMetaSetup(props: Props) {
    if (!props.mapData || !props.mapData.legend) throw new Error('mapData is missing in props');
    this.legendData = props.mapData.legend;
    this.heading = props.mapData && props.mapData.heading ?
      props.mapData.heading : 'Indicator must have a heading talk to Allan or Donata';
    const name: string =
      props.mapData && props.mapData.name
        ? props.mapData.name
        : 'Indicator must have a name talk to Allan or Donata';
    const uomDisplay = props.mapData.uom_display || '';
    this.description =
      props.mapData.description || 'Please add a proper description, talk to Allan or Donata ';
    if (!props.mapData.theme) throw new Error('theme is missing in map data props');
    if (!props.mapData.country) throw new Error('country is missing in map data props');
    if (!props.mapData.id) throw new Error('indicator id is missing in map data props');
    this.meta = {
      name,
      uom_display: uomDisplay,
      theme: props.mapData.theme,
      id: props.mapData.id,
      country: props.mapData.country,
    };
  }
  init(props: Props) {
    this.initYearSetup(props);
    this.initMetaSetup(props);
    let data = [];
    if (props.mapData && props.mapData.map && props.mapData.map.length) {
      data = this.yearSliderVisibility
        ? Map.setCurrentYearData(this.state.currentYear, props.mapData.map)
        : props.mapData.map;
      this.paint = { data, ...this.config.paint };
    }
    if (props.mapData && props.mapData.map_style) {
      this.paint = { data, ...this.config.paint, mapStyle: props.mapData.map_style };
    }
    this.state = { ...this.state, data };
  }
  yearSliderVisibility: boolean;
  startYear: number;
  paint: PaintMap; // map data
  endYear: number;
  meta: Meta;
  country: string;
  config: MapConfig;
  heading: string;
  description: string;
  noRankTableList: string[] =['data_series.largest_intl_flow'];
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
              title={this.heading}
              description={this.description}
              legendData={this.legendData}
            />
            <P
              fontSize={'0.7em'}
              color={grey}
              bottom={'5%'}
              right={'2%'}
              position={'absolute'}
            >
              Country borders do not necessarily reflect Development Initiatives&apos; position.
            </P>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              {this.yearSliderVisibility
                ? <YearSlider
                  minimum={this.startYear}
                  maximum={this.endYear}
                  step={1}
                  position={this.state.currentYear}
                  onChange={year => this.onYearChange(year)}
                />
                : <Div fontWeight={'bold'}>
                  <P fontSize={'1.2em'}>
                    {this.startYear}
                  </P>
                  <P>(This indicator has data for a single year only.)</P>
                </Div>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <ChartShare
                size="big"
                color="grey"
                stateToShare={{
                  year: this.state.currentYear,
                  indicator: this.meta.id
                }}
              />
            </Grid.Column>
          </Grid.Row>
          {!this.noRankTableList.includes(this.meta.id) ?
            <RankingsTable {...this.setCountryRankData()} /> : ''
          }
        </Grid>
      </Container>
    );
  }
}

export default Map;
