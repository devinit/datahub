import {
  AxisConfig,
  AxisType,
  ChartAxes,
  ChartConfig,
  ChartScales,
  DataPoint,
  TimeAxisFormat,
  TimeTickingSteps
} from '..';
import { Axes, Formatters, Scales } from 'plottable';
import { TimeAxisOrientation, TimeAxisTierConfiguration, TimeInterval } from 'plottable/build/src/axes';

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
