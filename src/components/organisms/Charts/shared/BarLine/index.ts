import {
  AxisConfig,
  AxisType,
  BarPlot,
  ChartAxes,
  ChartConfig,
  ChartScales,
  DataPoint,
  LegendConfig,
  LinePlot,
  PlotLabelConfig,
  TimeAxisFormat,
  TimeTickingSteps
} from '../../molecules/BarLineChartTypes';
import { BarChartProps } from '../../molecules/BarChart';
import { Axes, Components, Formatters, Interactions, Plots, Scales } from 'plottable';
import { TimeAxisOrientation, TimeAxisTierConfiguration, TimeInterval } from 'plottable/build/src/axes';
import { groupBy } from 'lodash';

export const xAxisConfigs = (data: DataPoint[], config?: Partial<ChartConfig>): AxisConfig => {
  const defaultXConfigs: AxisConfig = {
    outerPadding: 0,
    innerPadding: 0.5,
    show: true,
    type: 'category',
    position: 'bottom',
    margin: 0
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

export const yAxisConfigs = (config?: Partial<ChartConfig>): AxisConfig => {
  const defaultYConfigs: AxisConfig = {
    outerPadding: 0,
    innerPadding: 0.5,
    show: true,
    type: 'linear',
    position: 'left',
    margin: 0
  };
  const yConfigs = (config && config.yAxis) || {};

  return { ...defaultYConfigs, ...yConfigs };
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

export const getAxis = (configs: AxisConfig, scale: ChartScales): ChartAxes => { // tslint:disable-line
  const { position, prefix = '', suffix = '', type } = configs;
  if (type === 'linear' && scale instanceof Scales.Linear) {
    const axis = new Axes.Numeric(scale, position);
    if (prefix || suffix) {
      axis.formatter(data => `${prefix}${data}${suffix}`);
    }

    return axis;
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

export const getYAxisLabel = (configs: Partial<AxisConfig>): Components.AxisLabel | null => {
  return configs.label && configs.label.show
    ? new Components.AxisLabel(configs.label.caption, configs.label.angle || -90)
    : null;
};

export const getXAxisLabel = (configs: Partial<AxisConfig>): Components.AxisLabel | null => {
  return configs.label && configs.label.show
    ? new Components.AxisLabel(configs.label.caption, configs.label.angle || 0)
    : null;
};

export const getLegendConfig = (config: Partial<LegendConfig>): LegendConfig => {
  const defaultConfig: LegendConfig = {
    show: true,
    xAlignment: 'right',
    yAlignment: 'top',
    maxEntriesPerRow: 5,
    position: 'top'
  };

  return { ...defaultConfig, ...config };
};

export const createLegend = (configs: LegendConfig, domain: string[], colours: string[]) => {
  const colorScale = new Scales.Color();
  const legend = new Components.Legend(colorScale);
  colorScale.range(colours);
  colorScale.domain(domain);
  legend.maxEntriesPerRow(configs.maxEntriesPerRow || 5);
  legend.xAlignment(configs.xAlignment || 'right');
  legend.yAlignment(configs.yAlignment || 'top');

  return legend;
};

export const getSeriesSettingsFromData = (data: DataPoint[]) => {
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
};

export const parseAxisMinMaxToDate = (axisValue: number | Date) =>
  typeof axisValue === 'number' ? new Date(Date.parse(axisValue + '')) : axisValue;

export const setTimeAxisTickingFormat = (ticking: TimeAxisFormat[], tickingStep: Partial<TimeTickingSteps>) => {
  const tiers: TimeAxisTierConfiguration[] = [];

  if (ticking.includes('hours')) {
    tiers.push({
      formatter: Formatters.time('%H:%M'),
      interval: TimeInterval.hour,
      step: tickingStep.hours || 4
    });
  }

  if (ticking.includes('days')) {
    tiers.push({
      formatter: Formatters.time('%d'),
      interval: TimeInterval.day,
      step: tickingStep.days || 7
    });
  }

  if (ticking.includes('months')) {
    tiers.push({
      formatter: Formatters.time('%B'),
      interval: TimeInterval.month,
      step: tickingStep.months || 1
    });
  }

  if (ticking.includes('years')) {
    tiers.push({
      formatter: Formatters.time('%Y'),
      interval: TimeInterval.year,
      step: tickingStep.years || 1
    });
  }

  return tiers;
};
