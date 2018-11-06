import { Axes, AxisOrientation, Components, Dataset, Interactions, Plots, Scales } from 'plottable';
import * as React from 'react';
import { Table } from 'plottable/build/src/components';
import {
  AxisConfig,
  AxisType,
  BarChartAttributes,
  BarChartConfig,
  BarChartDataPoint,
  BarPlot,
  LabelConfig
} from './BarChartTypes';
import { groupBy } from 'lodash';
import { TimeAxisOrientation } from 'plottable/build/src/axes';

export interface BarChartProps {
  data: BarChartDataPoint[];
  config?: Partial<BarChartConfig>;
  width?: string;
  height?: string;
  attributes?: BarChartAttributes;
  getPlot?: (plot: Table) => void;
}

type Scales = Scales.Linear | Scales.Category | Scales.Time;
type Axes = Axes.Numeric | Axes.Category | Axes.Time;

class BarChart extends React.Component<BarChartProps> {
  static defaultProps: BarChartProps = {
    data: [],
    config: {
      xAxis: { show: true, position: 'bottom' },
      yAxis: { show: true, position: 'left' }
    }
  };
  private chartNode?: HTMLDivElement;
  private barChart?: Table;

  constructor(props) {
    super(props);

    this.setChartNode = this.setChartNode.bind(this);
  }

  render() {
    return <div ref={ this.setChartNode } style={ { height: '135px' } }/>;
  }

  componentDidMount() {
    if (this.chartNode) {
      this.renderChart(this.chartNode, this.props.data);
    }
  }

  private setChartNode(node: HTMLDivElement) {
    this.chartNode = node;
  }

  private renderChart(chartNode: HTMLDivElement, data: BarChartDataPoint[]) {
    const xConfigs = this.xAxisConfigs(data);
    const yConfigs = this.yAxisConfigs();

    const xScale = this.getScale(xConfigs.type);
    if (xScale instanceof Scales.Category) {
      xScale.innerPadding(xConfigs.innerPadding as number);
      xScale.outerPadding(xConfigs.outerPadding as number);
    }
    const xAxis = this.getAxis(xConfigs.type, xScale, xConfigs.position || 'bottom');

    const yScale = new Scales.Linear();
    if (yConfigs.tickingStep) {
      const yScaleTickGenerator = Scales.TickGenerators.intervalTickGenerator(yConfigs.tickingStep);
      yScale.tickGenerator(yScaleTickGenerator);
    }
    const yAxis = new Axes.Numeric(yScale, yConfigs.position || 'left');

    const plot = this.addDatasets(data)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)
      .animated(true);
    this.setAttributes(plot, this.props);
    plot.onAnchor(() => {
      setTimeout(() => {
        if (this.props.config && this.props.config.labels) {
          if (this.props.config.labels.show === 'always') {
            this.createCustomLabels(plot, plot.entities());
          } else if (this.props.config.labels.show === 'hover') {
            this.showLabelsOnHover(plot);
          }
        }
      }, 500);
    });

    this.barChart = new Components.Table([
      [ yConfigs.show ? yAxis : null, plot ] as any,
      [ null, xConfigs.show ? xAxis : null ]
    ]).renderTo(chartNode);
    if (this.props.getPlot && this.barChart) {
      this.props.getPlot(this.barChart);
    }
  }

  private getScale(type: AxisType): Scales {
    if (type === 'linear') {
      return new Scales.Linear();
    }
    if (type === 'category') {
      return new Scales.Category();
    }

    return new Scales.Time();
  }

  private getAxis(type: AxisType, scale: Scales, position: AxisOrientation | TimeAxisOrientation): Axes {
    if (type === 'linear' && scale instanceof Scales.Linear) {
      return new Axes.Numeric(scale, position);
    }
    if (type === 'category' && scale instanceof Scales.Category) {
      return new Axes.Category(scale, position);
    }

    return new Axes.Time(scale as any, position as TimeAxisOrientation);
  }

  private addDatasets(data: BarChartDataPoint[]) {
    const groupedData = groupBy(data, datum => datum.series);
    const seriesNames = Object.keys(groupedData);
    const plot = seriesNames.length > 1
      ? new Plots.ClusteredBar()
      : new Plots.Bar();
    seriesNames.forEach(series => plot.addDataset(new Dataset(groupedData[series])));

    return plot;
  }

  private setAttributes(plot: BarPlot, props: BarChartProps) {
    const attributes = props.data[0] ? props.data[0].attributes : {};
    if (props.attributes) {
      Object.keys(props.attributes).forEach(attribute =>
        props.attributes && plot.attr(attribute, props.attributes[attribute]));
    }
    if (attributes) {
      Object.keys(attributes).forEach(attribute => {
        plot.attr(attribute, d => {
          if (d.attributes) {
            return d.attributes[attribute];
          } else if (props.attributes) {
            return props.attributes[attribute];
          }

          return null;
        });
      });
    }
  }

  private xAxisConfigs(data: BarChartDataPoint[]): AxisConfig {
    const defaultXConfigs: AxisConfig = {
      outerPadding: 0,
      innerPadding: 0.5,
      show: true,
      type: 'category',
      position: 'bottom'
    };
    const xConfigs: Partial<AxisConfig> = (this.props.config && this.props.config.xAxis) || {};
    if (!xConfigs.type && data.length && typeof data[0].x === 'number') {
      xConfigs.type = 'linear';
    }
    if (!xConfigs.type && data.length && typeof data[0].x === 'string') {
      xConfigs.type = 'category';
    }
    if (!xConfigs.type && data.length && data[0].x instanceof Date) {
      xConfigs.type = 'time';
    }

    return { ...defaultXConfigs, ...xConfigs };
  }

  private yAxisConfigs(): Partial<AxisConfig> {
    return (this.props.config && this.props.config.yAxis) || {};
  }

  private createCustomLabels(plot: BarPlot, entities) {
    entities.forEach(entity => {
      this.drawLabel(entity, plot, this.props.config && this.props.config.labels || {});
    });
  }

  private drawLabel(entity: Plots.IPlotEntity, plot: BarPlot, config: Partial<LabelConfig>) { // tslint:disable-line
    const { height, width, x, y } = (entity as any).bounds;
    const { prefix = '', suffix = '', orientation = 'vertical' } = config;

    plot.foreground()
      .append('text')
      .attr('class', 'plot-label hover-label')
      .attr('x', orientation === 'vertical' ? x + (width / 2) : width + x + 5)
      .attr('y', orientation === 'horizontal' ? y + (height / 2) : y - 10)
      .attr('text-anchor', orientation === 'vertical' ? 'middle' : 'start')
      .attr('style', `fill: ${entity.selection.attr('fill')}`)
      .text(`${prefix}${entity.datum.y}${suffix}`);
  }

  private showLabelsOnHover(plot: BarPlot) {
    const interaction = new Interactions.Pointer()
      .onPointerExit(() => this.resetPlot(plot))
      .onPointerMove(point => {
        this.resetPlot(plot);
        const entities = plot.entitiesAt(point);
        if (entities && entities.length) {
          this.createCustomLabels(plot, entities);
        }
      });

    interaction.attachTo(plot);
    plot.onDetach(interaction.detachFrom);
  }

  private resetPlot(plot: BarPlot) {
    plot.foreground().select('text').remove();
  }
}

export default BarChart;
