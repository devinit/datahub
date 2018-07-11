import RankingsTable, { Props as RankingsTableProps } from '../../RankingsTable';
import * as React from 'react';
import { Meta, PaintMap } from '../../../atoms/BaseMap/types';
import { Div, P } from 'glamorous';
import { grey } from '../../../theme/semantic';
import Legend, { LegendField } from '../MapLegend';
import YearSlider from '../../YearSlider';
import { Container, Grid } from 'semantic-ui-react';
import BaseMap, { indicatorsWith0dp } from '../../../atoms/BaseMap';
import ChartShare, { StateToShare } from '../../ChartShare';
import { Route, countryOrDistrictLink } from '../../../../utils';
import mapConfigs, { MapConfig } from './config';
import { SingletonRouter } from 'next/router';
import ErrorBoundary from '../../ErrorBoundary';

export type Props = DH.IMapData & {
  state?: StateToShare;
  router?: SingletonRouter;
};

export interface State {
  currentYear: number;
}
class Map extends React.Component<Props, State> {
  public state: State;
  public mounted = false;
  private yearSliderVisibility = false;
  private startYear = this.props.start_year;
  private paint?: PaintMap; // map data
  private endYear = this.props.end_year ? this.props.end_year : this.startYear;
  private meta: Meta;
  private data: DH.IMapUnit[];
  private country: string;
  private config: MapConfig;
  private heading: string;
  private description: string;
  private noRankTableList: string[] = [ 'data_series.largest_intl_flow', 'data_series.fragile_states' ];
  private legendData: LegendField[];

  constructor(props: Props) {
    super(props);
    if (!props.map) { throw new Error('map data is missing in props'); }
    if (!props.country) { throw new Error('country is missing in props'); }
    this.country = props.country;
    this.config = mapConfigs[this.country];
    this.state = { currentYear: this.getCurrentYear(props) };
    this.init(props);
  }

  render() {
    return (
      <Container fluid>
        <Grid columns={ 1 }>
          <Grid.Row>
            <Div width={ '100%' }>
              <ErrorBoundary>
              <BaseMap
                paint={ this.paint as PaintMap }
                viewport={ this.config.viewport }
                meta={ this.meta }
                router={ this.props.router }
              />
              </ErrorBoundary>
            </Div>
            <Legend
              title={ this.heading }
              description={ this.description }
              legendData={ this.legendData }
            />
            <P
              fontSize={ '0.7em' }
              color={ grey }
              bottom={ '5%' }
              right={ '2%' }
              position={ 'absolute' }
            >
              Country borders do not necessarily reflect Development Initiatives&apos; position.
            </P>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={ 4 } textAlign="center">
              { this.yearSliderVisibility
                ? <YearSlider
                  minimum={ this.startYear }
                  maximum={ this.endYear }
                  step={ 1 }
                  position={ this.state.currentYear }
                  onChange={ this.onYearChange }
                />
                : <Div fontWeight={ 'bold' }>
                  <P fontSize={ '1.2em' }>
                    { this.startYear }
                  </P>
                  <P>(This indicator has data for a single year only.)</P>
                </Div> }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={ 5 } textAlign="center">
              <Div paddingBottom="2em">
                <ChartShare
                  size="big"
                  color="black"
                  stateToShare={ {
                    year: this.state.currentYear,
                    indicator: this.meta.id
                  } }
                />
              </Div>
            </Grid.Column>
          </Grid.Row>
          { !this.noRankTableList.includes(this.meta.id) ?
            <RankingsTable { ...this.setCountryRankData() } router={ this.props.router } /> : ''
          }
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) { this.init(nextProps); }
  }

  getCurrentYear(props: Props): number {
    const year = props.state && props.state.year ? props.state.year : props.default_year;
    if (!year) { throw new Error('default year missing, for current year'); }

    return +year;
  }

  onYearChange = (year: number) => {
    if (this.props && this.props.map) {
      this.data = Map.setCurrentYearData(year, this.props.map);
      this.paint = { data: this.data, ...this.config.paint };
      this.setState({ currentYear: year });
    }
  }

  setCountryRankData(): RankingsTableProps {
    const sortedData = this.data
      .filter(obj => obj.value && obj.id)
      .sort((a, b) => {
        if (!a.value || !b.value) { throw new Error('value must be defined'); } // make flow happy

        return b.value - a.value;
      })
      .map((obj: DH.IMapUnit, index: number) => {
        if (!obj.id) { throw new Error('data point id missing for country rank data'); }
        const flagUrl: string = this.country === 'global' ? `/flags/svg/${obj.id}.svg` : '';
        const name = obj.name ? obj.name : 'N/A';
        // make flow happy
        if (!obj.value || !obj.slug) { throw new Error('value must be defined for country rank data'); }
        const value = this.meta ? Map.setCountryRankValue(obj, this.meta) : obj.value;
        const route: Route = countryOrDistrictLink(this.meta.country, obj.slug);
        const uom: string = this.meta && this.meta.uom_display ? this.meta.uom_display : '';

        return { name, value, flagUrl, uid: obj.uid || '', position: (index + 1), route, uom };
      });
    const top = sortedData.slice(0, 10).map(obj => {
      if (Number(obj.value) > 10000) {
        return { ...obj, value: Number(obj.value).toFixed(0) };
      }
      if (this.meta.id === 'data_series.fdi_pp') {
        return { ...obj, value: Number(obj.value).toFixed(0) };
      }

      return obj;
    });
    const bottom = sortedData.slice(-10);

    return {
      hasflags: this.country === 'global',
      data: { top, bottom }
    };
  }

  initYearSetup(props: Props) {
    if (!props.start_year) { throw new Error('start_year is missing in props'); }
    if (!props.default_year) { throw new Error('default_year is missing in props'); }
    const currentYear = this.getCurrentYear(props);
    this.startYear = props.start_year;
    this.endYear = props.end_year ? props.end_year : this.startYear;
    this.yearSliderVisibility = this.endYear > this.startYear;
    if (this.mounted) { this.setState({ currentYear: +currentYear }); }
  }

  initMetaSetup(props: Props) {
    if (!props.legend) { throw new Error('legend data is missing in props'); }
    this.legendData = props.legend;
    this.heading = props.heading ?
      props.heading : 'Indicator must have a heading talk to Allan or Donata';
    const name: string = props.name
        ? props.name
        : 'Indicator must have a name talk to Allan or Donata';
    const uomDisplay = props.uom_display || '';
    this.description =
      props.description || 'Please add a proper description, talk to Allan or Donata ';
    if (!props.theme) { throw new Error('theme is missing in map data props'); }
    if (!props.country) { throw new Error('country is missing in map data props'); }
    if (!props.id) { throw new Error('indicator id is missing in map data props'); }
    this.meta = {
      name,
      uom_display: uomDisplay,
      theme: props.theme,
      id: props.id,
      country: props.country
    };
  }

  init(props: Props) {
    this.initYearSetup(props);
    this.initMetaSetup(props);
    if (props.map && props.map.length) {
      this.data = this.yearSliderVisibility
        ? Map.setCurrentYearData(this.state.currentYear, props.map)
        : props.map;
      this.paint = { data: this.data, ...this.config.paint };
    }
    if (props.map_style) {
      this.paint = { data: this.data, ...this.config.paint, mapStyle: props.map_style };
    }
  }

  public static setCurrentYearData(currentYear: number, data: DH.IMapUnit[]): DH.IMapUnit[] {
    return data.filter(obj => {
      if (obj.year === undefined) { throw new Error('year property is missing in map data obj'); }

      return obj.year === currentYear;
    });
  }

  public static setCountryRankValue(mapPoint: DH.IMapUnit, meta: Meta): string | number {
    const { value } = mapPoint;
    if (value === undefined || value === null) { throw new Error('country rank value should be defined'); }
    if (meta.id === 'data_series.fragile_states' && mapPoint.detail) { return mapPoint.detail; }
    const ThemesWith1dp = [ 'vulnerability', 'government-finance' ];
    if (meta.id === 'data_series.climate_vulnerability') { return value.toFixed(2); }
    if (indicatorsWith0dp.includes(meta.id)) { return value.toFixed(0); }
    if (meta.uom_display === '%' && meta.theme.includes('uganda')) { return value.toFixed(1); }
    if (ThemesWith1dp.includes(meta.theme) || meta.theme.includes('uganda')) {
      return value.toFixed(1);
    }
    if (meta.uom_display === '%') { return value.toFixed(2); }
    if (meta.uom_display === 'US$') { return value.toFixed(1); }

    return value;
  }
}

export default Map;
