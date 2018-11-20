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
import { AxisConfig, ChartAttributes, ChartConfig, DataPoint, TableRow } from './BarLineChartTypes';

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

  constructor(props) {
    super(props);

    this.setChartNode = this.setChartNode.bind(this);
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

    const xScale = getScale(xConfigs.type);
    if (xScale instanceof Scales.Category) {
      xScale.innerPadding(xConfigs.innerPadding as number);
      xScale.outerPadding(xConfigs.outerPadding as number);
    }
    const xAxis = getAxis(xConfigs, xScale);

    const yScale = new Scales.Linear();
    if (yConfigs.tickingStep) {
      const yScaleTickGenerator = Scales.TickGenerators.intervalTickGenerator(yConfigs.tickingStep);
      yScale.tickGenerator(yScaleTickGenerator);
    }
    const yAxis = getAxis(yConfigs, yScale) as Axes.Numeric;

    const plot = this.addDatasets(data)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)
      .animated(true);
    setAttributes(plot, this.props);
    plot.onAnchor(() => {
      setTimeout(() => {
        if (this.props.config && this.props.config.labels) {
          if (this.props.config.labels.show === 'always') {
            createCustomLabels(plot, plot.entities(), this.props.config && this.props.config.labels);
          } else if (this.props.config.labels.show === 'hover') {
            showLabelsOnHover(plot, this.props.config && this.props.config.labels);
          }
        }
      }, 500);
    });

    this.lineChart = new Components.Table(
      this.createTableRows(this.getConfigs(this.props.config))(plot, yConfigs, yAxis, xConfigs, xAxis)
    ).renderTo(chartNode);
    if (this.props.getPlot && this.lineChart) {
      this.props.getPlot(this.lineChart);
    }
  }

  private getConfigs(config: Partial<ChartConfig> = {}) {
    return { ...LineChart.defaultProps.config, ...config };
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
        const seriesConfigs = getSeriesSettingsFromData(this.props.data);
        const seriesNames = seriesConfigs.map(c => c.series);
        const seriesColours = seriesConfigs.map(c => c.colour);
        const legend = createLegend(legendConfig, seriesNames, seriesColours);
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
}

export default LineChart;
