import { groupBy } from 'lodash';
import { Axes, Component, Components, Dataset, Plots, Scales } from 'plottable';
import { Table } from 'plottable/build/src/components';
import * as React from 'react';
import {
  createCustomLabels,
  getAxis,
  getScale,
  setAttributes,
  showLabelsOnHover,
  xAxisConfigs as parseXAxisConfigs,
  yAxisConfigs as parseYAxisConfigs
} from '../shared/BarLine';
import { AxisConfig, ChartAttributes, ChartConfig, DataPoint, LegendConfig, TableRow } from './BarLineChartTypes';

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
      legend: { show: true }
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
    console.log(this.getSeriesSettingsFromData(data));

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
      this.createTableRows(this.props.config || {})(plot, yConfigs, yAxis, xConfigs, xAxis)
    ).renderTo(chartNode);
    if (this.props.getPlot && this.lineChart) {
      this.props.getPlot(this.lineChart);
    }
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
        this.getYAxisLabel(yAxisConfigs),
        yAxisConfigs.show ? yAxis : null,
        plot
      ];
      const row2: TableRow = [ null, null, xAxisConfigs.show ? xAxis : null ];
      const row3: TableRow = [ null, null, this.getXAxisLabel(xAxisConfigs) ];

      if (config.legend && config.legend.show) {
        const legendConfig = this.getLegendConfig(config.legend);
        const seriesConfigs = this.getSeriesSettingsFromData(this.props.data);
        const seriesNames = seriesConfigs.map(c => c.series);
        const seriesColours = seriesConfigs.map(c => c.colour);
        const legend = this.createLegend(legendConfig, seriesNames, seriesColours);
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

  private getYAxisLabel(yAxisConfigs: Partial<AxisConfig>): Components.AxisLabel | null {
    return yAxisConfigs.label && yAxisConfigs.label.show
      ? new Components.AxisLabel(yAxisConfigs.label.caption, yAxisConfigs.label.angle || -90)
      : null;
  }

  private getXAxisLabel(xAxisConfigs: Partial<AxisConfig>): Components.AxisLabel | null {
    return xAxisConfigs.label && xAxisConfigs.label.show
      ? new Components.AxisLabel(xAxisConfigs.label.caption, xAxisConfigs.label.angle || 0)
      : null;
  }

  private getLegendConfig(config: Partial<LegendConfig>): LegendConfig {
    const defaultConfig: LegendConfig = {
      show: true,
      xAlignment: 'right',
      yAlignment: 'top',
      maxEntriesPerRow: 5,
      position: 'top'
    };

    return { ...defaultConfig, ...config };
  }

  private createLegend(configs: LegendConfig, domain: string[], colours: string[]) {
    const colorScale = new Scales.Color();
    const legend = new Components.Legend(colorScale);
    colorScale.range(colours);
    colorScale.domain(domain);
    legend.maxEntriesPerRow(configs.maxEntriesPerRow || 5);
    legend.xAlignment(configs.xAlignment || 'right');
    legend.yAlignment(configs.yAlignment || 'top');

    return legend;
  }

  private getSeriesSettingsFromData(data: DataPoint[]) {
    const groupedBySeries = groupBy(data, datum => datum.series);
    const seriesNames = Object.keys(groupedBySeries);
    const seriesSettings = seriesNames.map(name => {
      let match = data.find(datum => datum.series === name && !!(datum.attributes && datum.attributes.stroke));
      if (!match) {
        match = data.find(datum => !datum.series);
      }

      return {
        series: name !== 'undefined' ? name : 'Unnamed',
        colour: match && match.attributes ? `${match.attributes.stroke}` : ''
      };
    });

    return seriesSettings;
  }
}

export default LineChart;
