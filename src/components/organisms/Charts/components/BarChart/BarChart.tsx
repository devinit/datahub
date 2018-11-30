import { Axes, Components, Dataset, Plots, Scales } from 'plottable';
import * as React from 'react';
import { Table } from 'plottable/build/src/components';
import {
  AxisConfig,
  ChartAttributes,
  ChartConfig,
  ChartScales,
  DataPoint,
  LegendConfig,
  createCustomLabels,
  createLegend,
  createTooltip,
  getAxis,
  getLegendConfig,
  getScale,
  getSeriesSettingsFromData,
  parseAxisMinMaxToDate,
  redrawCustomLabels,
  setAttributes,
  setTimeAxisTickingFormat,
  showLabelsOnHover,
  xAxisConfigs as parseXAxisConfigs,
  yAxisConfigs as parseYAxisConfigs
} from '../../shared';
import { groupBy } from 'lodash';

export interface BarChartProps {
  data: DataPoint[];
  config?: Partial<ChartConfig>;
  width?: string;
  height?: string;
  attributes?: ChartAttributes;
  getPlot?: (plot: Table) => void;
  onBeforeRender?: (chart: BarChart) => void;
}

type Scales = Scales.Linear | Scales.Category | Scales.Time;
type Axes = Axes.Numeric | Axes.Category | Axes.Time;

export class BarChart extends React.Component<BarChartProps> {
  static defaultProps: BarChartProps = {
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
  private barChart?: Table;
  private xScale: ChartScales;
  private yScale: Scales.Linear;
  private xAxis: Axes.Numeric | Axes.Category | Axes.Time;
  private yAxis: Axes.Numeric;
  private plot: Plots.Bar<{}, {}>;

  constructor(props) {
    super(props);

    this.setChartNode = this.setChartNode.bind(this);
    this.onAnchor = this.onAnchor.bind(this);
  }

  render() {
    return (
      <div
        className="di-bar-chart"
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

  renderTable(table: Table) {
    if (this.chartNode) {
      table.renderTo(this.chartNode);
    }
  }

  private setChartNode(node: HTMLDivElement) {
    this.chartNode = node;
  }

  private renderChart(chartNode: HTMLDivElement, data: DataPoint[]) {
    const xConfigs = parseXAxisConfigs(data, this.props.config);
    const yConfigs = parseYAxisConfigs(this.props.config);
    const configs = this.getConfigs(this.props.config);

    this.barChart = new Components.Table();

    this.createAxes(xConfigs, yConfigs, this.barChart);
    this.setAxisLabel(xConfigs, this.barChart, 1, 0);

    this.plot = this.addDatasets(data)
      .x(d => d.x, this.xScale)
      .y(d => d.y, this.yScale)
      .animated(true);
    this.barChart.add(this.plot, 1, 2);
    this.createGridlines(this.barChart, configs);
    this.createChartLegend(data, this.barChart, configs.legend);

    setAttributes(this.plot, this.props);
    this.plot.onAnchor(() => this.onAnchor(this.plot, configs));

    if (this.props.onBeforeRender) {
      this.props.onBeforeRender(this);
    }
    this.barChart.renderTo(chartNode);
    if (this.props.getPlot && this.barChart) {
      this.props.getPlot(this.barChart);
    }
    this.onResize(this.plot, configs);
  }

  private getConfigs(config: Partial<ChartConfig> = {}) {
    return { ...BarChart.defaultProps.config, ...config };
  }

  private createAxes(xConfigs: AxisConfig, yConfigs: AxisConfig, chartTable: Table) {
    this.xScale = getScale(xConfigs.type);
    if (this.xScale instanceof Scales.Category) {
      this.xScale.innerPadding(xConfigs.innerPadding as number);
      this.xScale.outerPadding(xConfigs.outerPadding as number);
    }
    this.xAxis = getAxis(xConfigs, this.xScale);
    if (xConfigs.show) {
      chartTable.add(this.xAxis, 2, 2);

      this.xAxis.showEndTickLabels(true);
      this.xAxis.margin(xConfigs.margin);

      if (xConfigs.tickingStep) {
        if (this.xScale instanceof Scales.Linear && typeof xConfigs.tickingStep === 'number') {
          const xScaleTickGenerator = Scales.TickGenerators.intervalTickGenerator(xConfigs.tickingStep);
          this.xScale.tickGenerator(xScaleTickGenerator);
          if (xConfigs.axisMin && typeof xConfigs.axisMin === 'number') {
            this.xScale.domainMin(xConfigs.axisMin);
          }
          if (xConfigs.axisMax && typeof xConfigs.axisMax === 'number') {
            this.xScale.domainMax(xConfigs.axisMax);
          }
        } else if (this.xScale instanceof Scales.Time && typeof xConfigs.tickingStep !== 'number') {
          if (xConfigs.axisMin) {
            this.xScale.domainMin(parseAxisMinMaxToDate(xConfigs.axisMin));
          }
          if (xConfigs.axisMax) {
            this.xScale.domainMax(parseAxisMinMaxToDate(xConfigs.axisMax));
          }
        }
      }
      if (this.xAxis instanceof Axes.Time && xConfigs.timeFormat) {
        const tickingStep = typeof xConfigs.tickingStep !== 'number' ? xConfigs.tickingStep : {};
        this.xAxis.axisConfigurations([ setTimeAxisTickingFormat(xConfigs.timeFormat, tickingStep || {}) ]);
      }
    }

    this.yScale = new Scales.Linear();
    this.yAxis = getAxis(yConfigs, this.yScale) as Axes.Numeric;

    if (yConfigs.show) {
      chartTable.add(this.yAxis, 1, 1);

      this.yAxis.margin(yConfigs.margin);
      if (typeof yConfigs.tickingStep === 'number') {
        const yScaleTickGenerator = Scales.TickGenerators.intervalTickGenerator(yConfigs.tickingStep);
        this.yScale.tickGenerator(yScaleTickGenerator);
      }
    }
  }

  private setAxisLabel(configs: AxisConfig, chartTable: Table, row: number, column: number) {
    if (configs.label && configs.label.show) {
      const label = new Components.AxisLabel(configs.label.caption, configs.label.angle || -90);
      chartTable.add(label, row, column);
    }
  }

  private createGridlines(chartTable: Table, config: Partial<ChartConfig>) {
    if (config.gridlines) {
      const { showXGrid, showYGrid } = config.gridlines;
      if (showXGrid || showYGrid) {
        const gridlines = new Components.Gridlines(showXGrid ? this.xScale : null, showYGrid ? this.yScale : null);
        if (chartTable.has(this.plot)) {
          chartTable.remove(this.plot);
          const group = new Components.Group([ this.plot, gridlines ]);
          chartTable.add(group, 1, 2);
        } else {
          chartTable.add(gridlines, 1, 2);
        }
      }
    }
  }

  private createChartLegend(data: DataPoint[], chartTable: Table, userConfig: Partial<LegendConfig> = {}) {
    const config = getLegendConfig(userConfig);
    if (config.show) {
      const seriesConfigs = getSeriesSettingsFromData(data);
      const seriesNames = seriesConfigs.map(c => c.series);
      const seriesColours = seriesConfigs.map(c => c.colour);

      const legend = createLegend(config, seriesNames, seriesColours);
      if (config.position === 'top') {
        chartTable.add(legend, 0, 2);
      } else if (config.position === 'bottom') {
        chartTable.add(legend, 3, 2);
      } else if (config.position === 'right') {
        chartTable.add(legend, 1, 3);
      }
    }
  }

  private addDatasets(data: DataPoint[]) {
    const groupedData = groupBy(data, datum => datum.series);
    const seriesNames = Object.keys(groupedData);
    const plot = seriesNames.length > 1
      ? new Plots.ClusteredBar()
      : new Plots.Bar();
    seriesNames.forEach(series => plot.addDataset(new Dataset(groupedData[series])));

    return plot;
  }

  private onAnchor(plot: Plots.Bar<{}, {}>, config: Partial<ChartConfig>) {
    setTimeout(() => {
      if (config && config.labels) {
        if (config.labels.show === 'always') {
          createCustomLabels(plot, plot.entities(), config.labels);
        } else if (config.labels.show === 'hover') {
          showLabelsOnHover(plot, config.labels);
        }
      }
      if (this.chartNode && config.tooltip && config.tooltip.show) {
        createTooltip(this.chartNode, plot, config.tooltip || {});
      }
    }, 500);
  }

  private onResize(plot: Plots.Bar<{}, {}>, config: Partial<ChartConfig>) {
    window.addEventListener('resize', () => {
      if (this.barChart && this.chartNode) {
        this.barChart.redraw();
        this.plot.redraw().onResize(() => {
          setTimeout(() => {
            if (config && config.labels) {
              redrawCustomLabels(plot.entities(), config.labels);
            }
          }, 100);
        });
        if (this.xAxis) {
          this.xAxis.redraw();
        }
        if (this.yAxis) {
          this.yAxis.redraw();
        }
      }
    });
  }
}
