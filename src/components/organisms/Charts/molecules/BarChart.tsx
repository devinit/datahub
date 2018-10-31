import * as Plottable from 'plottable';
import * as React from 'react';
import { Table } from 'plottable/build/src/components';
import {
  AxisConfig,
  BarChartAttributes,
  BarChartConfig,
  BarChartDataPoint,
  BarPlot,
  CustomLabelConfig
} from './BarChartTypes';
import { groupBy } from 'lodash';

interface BarChartProps {
  data: BarChartDataPoint[];
  config?: Partial<BarChartConfig>;
  width?: string;
  height?: string;
  attributes?: BarChartAttributes;
  getPlot?: (plot: Table) => void;
}

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
    return <div ref={ this.setChartNode } style={ { height: '150px' } }/>;
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
    const xScale = new Plottable.Scales.Category();
    const yScale = new Plottable.Scales.Linear();
    const xAxis = new Plottable.Axes.Category(xScale, this.xAxisConfigs().position || 'bottom');
    const yAxis = new Plottable.Axes.Numeric(yScale, this.yAxisConfigs().position || 'left');
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

    this.barChart = new Plottable.Components.Table([
      [ this.yAxisConfigs().show ? yAxis : null, plot ] as any,
      [ null, this.xAxisConfigs().show ? xAxis : null ]
    ]).renderTo(chartNode);
    if (this.props.getPlot && this.barChart) {
      this.props.getPlot(this.barChart);
    }
  }

  private addDatasets(data: BarChartDataPoint[]) {
    const groupedData = groupBy(data, datum => datum.series);
    const seriesNames = Object.keys(groupedData);
    const plot = seriesNames.length > 1
      ? new Plottable.Plots.ClusteredBar()
      : new Plottable.Plots.Bar();
    seriesNames.forEach(series => plot.addDataset(new Plottable.Dataset(groupedData[series])));

    return plot;
  }

  private setAttributes(plot: BarPlot, props: BarChartProps) {
    const attributes = props.data[0].attributes;
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

  private xAxisConfigs(): Partial<AxisConfig> {
    return (this.props.config && this.props.config.xAxis) || {};
  }

  private yAxisConfigs(): Partial<AxisConfig> {
    return (this.props.config && this.props.config.yAxis) || {};
  }

  private createCustomLabels(plot: BarPlot, entities) {
    entities.forEach(entity => {
      this.drawLabel(entity, plot, this.props.config && this.props.config.labels || {});
    });
  }

  private drawLabel(entity: Plottable.Plots.IPlotEntity, plot: BarPlot, config: Partial<CustomLabelConfig>) { // tslint:disable-line
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
    const interaction = new Plottable.Interactions.Pointer()
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
