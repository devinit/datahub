import {
  AxisConfig,
  AxisType,
  BarPlot,
  ChartAxes,
  ChartConfig,
  ChartScales,
  DataPoint,
  LinePlot,
  PlotLabelConfig
} from '../../molecules/BarLineChartTypes';
import { BarChartProps } from '../../molecules/BarChart';
import { Axes, AxisOrientation, Interactions, Plots, Scales } from 'plottable';
import { TimeAxisOrientation } from 'plottable/build/src/axes';

export const xAxisConfigs = (data: DataPoint[], config?: Partial<ChartConfig>): AxisConfig => {
  const defaultXConfigs: AxisConfig = {
    outerPadding: 0,
    innerPadding: 0.5,
    show: true,
    type: 'category',
    position: 'bottom'
  };
  const xConfigs: Partial<AxisConfig> = (config && config.xAxis) || {};
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
};

export const yAxisConfigs = (config?: Partial<ChartConfig>): Partial<AxisConfig> => {
  return (config && config.yAxis) || {};
};

export const setAttributes = (plot: BarPlot | LinePlot, props: BarChartProps) => {
  const attributeKeys = props.data.reduce((attributes: string[], data: DataPoint) => {
    if (data.attributes) {
      const keys = Object.keys(data.attributes).filter(key => attributes.indexOf(key) === -1);

      return attributes.concat(keys);
    }

    return attributes;
  }, []);
  if (props.attributes) {
    Object.keys(props.attributes).forEach(attribute =>
      props.attributes && plot.attr(attribute, props.attributes[attribute]));
  }
  if (attributeKeys.length) {
    attributeKeys.forEach(attribute => {
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
};

export const getScale = (type: AxisType): ChartScales => {
  if (type === 'linear') {
    return new Scales.Linear();
  }
  if (type === 'category') {
    return new Scales.Category();
  }

  return new Scales.Time();
};

export const getAxis = (type: AxisType, scale: ChartScales, position: AxisOrientation | TimeAxisOrientation): ChartAxes => { // tslint:disable-line
  if (type === 'linear' && scale instanceof Scales.Linear) {
    return new Axes.Numeric(scale, position);
  }
  if (type === 'category' && scale instanceof Scales.Category) {
    return new Axes.Category(scale, position);
  }

  return new Axes.Time(scale as any, position as TimeAxisOrientation);
};

export const createCustomLabels = (plot: BarPlot | LinePlot, entities, labelConfig?: Partial<PlotLabelConfig>) => {
  entities.forEach(entity => drawLabel(entity, plot, labelConfig || {}));
};

export const drawLabel = (entity: Plots.IPlotEntity, plot: BarPlot | LinePlot, config: Partial<PlotLabelConfig>) => {
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
};

export const showLabelsOnHover = (plot: BarPlot | LinePlot, labelConfig: Partial<PlotLabelConfig>) => {
  const interaction = new Interactions.Pointer()
    .onPointerExit(() => resetPlot(plot))
    .onPointerMove(point => {
      resetPlot(plot);
      const entities = plot.entitiesAt(point);
      if (entities && entities.length) {
        createCustomLabels(plot, entities, labelConfig);
      }
    });

  interaction.attachTo(plot);
  plot.onDetach(interaction.detachFrom);
};

export const resetPlot = (plot: BarPlot | LinePlot) => {
  plot.foreground().select('text').remove();
};
