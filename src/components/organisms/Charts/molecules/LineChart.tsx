import { groupBy } from 'lodash';
import { Axes, Component, Components, Dataset, Plots, Scales } from 'plottable';
import { Table } from 'plottable/build/src/components';
import * as React from 'react';
import {
  createCustomLabels,
  createLegend,
  getAxis,
  getLegendConfig,
  getScale,
  getSeriesSettingsFromData,
  getXAxisLabel,
  getYAxisLabel,
  setAttributes,
  showLabelsOnHover,
  xAxisConfigs as parseXAxisConfigs,
  yAxisConfigs as parseYAxisConfigs
} from '../shared/BarLine';
import {
  AxisConfig,
  ChartAttributes,
  ChartConfig,
  ChartScales,
  DataPoint,
  LegendConfig,
  TableRow
} from './BarLineChartTypes';

export interface LineChartProps {
  data: DataPoint[];
  config?: Partial<ChartConfig>;
  width?: string;
  height?: string;
  attributes?: ChartAttributes;
  getPlot?: (plot: Table) => void;
}

class LineChart extends React.Component<LineChartProps> {
  static defaultProps: LineChartProps = {
    data: [],
    config: {
      xAxis: { show: true, position: 'bottom' },
      yAxis: { show: true, position: 'left', label: { show: false } },
      legend: { show: true, position: 'top' }
    },
    width: '100%',
    height: '150px'
  };
  private chartNode?: HTMLDivElement;
  private lineChart?: Table;
  private xScale: ChartScales;
  private yScale: Scales.Linear;
  private xAxis: Axes.Numeric | Axes.Category | Axes.Time;
  private yAxis: Axes.Numeric;
  private plot: Plots.Line<{}>;

  constructor(props) {
    super(props);

    this.setChartNode = this.setChartNode.bind(this);
    this.onAnchor = this.onAnchor.bind(this);
  }

  render() {
    return (
      <div
        className="di-line-chart"
        ref={ this.setChartNode }
        style={ { height: this.props.height, width: this.props.width } }
      />
    );
  }

  componentDidMount() {
    if (this.chartNode) {
      this.renderChart(this.chartNode, this.props.data);
    }
  }

  private setChartNode(node: HTMLDivElement) {
    this.chartNode = node;
  }

  private renderChart(chartNode: HTMLDivElement, data: DataPoint[]) {
    const xConfigs = parseXAxisConfigs(data, this.props.config);
    const yConfigs = parseYAxisConfigs(this.props.config);
    const configs = this.getConfigs(this.props.config);

    this.createAxes(xConfigs, yConfigs);

    this.plot = this.addDatasets(data)
      .x(d => d.x, this.xScale)
      .y(d => d.y, this.yScale)
      .animated(true);

    setAttributes(this.plot, this.props);
    this.plot.onAnchor(() => this.onAnchor(this.plot, configs));

    this.lineChart = new Components.Table(
      this.createTableRows(this.getConfigs(configs))(this.plot, yConfigs, this.yAxis, xConfigs, this.xAxis)
    ).renderTo(chartNode);

    if (this.props.getPlot && this.lineChart) {
      this.props.getPlot(this.lineChart);
    }
  }

  private getConfigs(config: Partial<ChartConfig> = {}) {
    return { ...LineChart.defaultProps.config, ...config };
  }

  private createAxes(xConfigs: AxisConfig, yConfigs: AxisConfig) {
    this.xScale = getScale(xConfigs.type);
    if (this.xScale instanceof Scales.Category) {
      this.xScale.innerPadding(xConfigs.innerPadding as number);
      this.xScale.outerPadding(xConfigs.outerPadding as number);
    }
    this.xAxis = getAxis(xConfigs, this.xScale);

    this.yScale = new Scales.Linear();
    if (yConfigs.tickingStep) {
      const yScaleTickGenerator = Scales.TickGenerators.intervalTickGenerator(yConfigs.tickingStep);
      this.yScale.tickGenerator(yScaleTickGenerator);
    }
    this.yAxis = getAxis(yConfigs, this.yScale) as Axes.Numeric;
  }

  private addDatasets(data: DataPoint[]) {
    const groupedBySeries = groupBy(data, datum => datum.series);
    const seriesNames = Object.keys(groupedBySeries);
    const plot = new Plots.Line();
    seriesNames.forEach(series => plot.addDataset(new Dataset(groupedBySeries[series])));

    return plot;
  }

  private createTableRows(config: Partial<ChartConfig>) {
    return (
      plot: Plots.Line<{}>,
      yAxisConfigs: Partial<AxisConfig>,
      yAxis: Axes.Numeric,
      xAxisConfigs: Partial<AxisConfig>,
      xAxis: Axes.Numeric | Axes.Category | Axes.Time): (Component | null | undefined)[][] => {

      const row1: TableRow = [
        getYAxisLabel(yAxisConfigs),
        yAxisConfigs.show ? yAxis : null,
        plot
      ];
      const row2: TableRow = [ null, null, xAxisConfigs.show ? xAxis : null ];
      const row3: TableRow = [ null, null, getXAxisLabel(xAxisConfigs) ];

      if (config.legend && config.legend.show) {
        const legendConfig = getLegendConfig(config.legend);
        const legend = this.createLineChartLegend(this.props.data, legendConfig);
        if (legendConfig.position === 'top' || legendConfig.position === 'bottom') {
          const legendRow: TableRow[] = [ [ null, null, legend ] ];
          const otherRows: TableRow[] = [ row1, row2, row3 ];

          return legendConfig.position === 'top' ? legendRow.concat(otherRows) : otherRows.concat(legendRow);
        } else if (legendConfig.position === 'right') {
          return [ row1.concat(legend), row2.concat(null), row3.concat(null) ];
        }
      }

      return [ row1, row2, row3 ];
    };
  }

  private createLineChartLegend(data: DataPoint[], config: LegendConfig) {
    const seriesConfigs = getSeriesSettingsFromData(data);
    const seriesNames = seriesConfigs.map(c => c.series);
    const seriesColours = seriesConfigs.map(c => c.colour);

    return createLegend(config, seriesNames, seriesColours);
  }

  private onAnchor(plot: Plots.Line<{}>, config: Partial<ChartConfig>) {
    setTimeout(() => {
      if (config && config.labels) {
        if (config.labels.show === 'always') {
          createCustomLabels(plot, plot.entities(), config.labels);
        } else if (config.labels.show === 'hover') {
          showLabelsOnHover(plot, config.labels);
        }
      }
    }, 500);
  }
}

export default LineChart;
