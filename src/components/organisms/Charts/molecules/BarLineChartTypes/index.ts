import { IAccessor } from 'plottable/build/src/core/interfaces';
import { Axes, Plots, Scales } from 'plottable';

export interface ChartConfig {
  xAxis: Partial<AxisConfig>;
  yAxis: Partial<AxisConfig>;
  labels: Partial<PlotLabelConfig>;
}

export type AxisType = 'linear' | 'category' | 'time';

export interface AxisConfig {
  show: boolean;
  type: AxisType;
  position: 'top' | 'bottom' | 'left' | 'right';
  outerPadding: number;
  innerPadding: number;
  tickingStep?: number;
  label?: Partial<AxisLabelConfig>;
  prefix?: string;
  suffix?: string;
}

export interface AxisLabelConfig {
  show: boolean;
  caption: string;
  angle: number;
}

export interface DataPoint {
  x: number | string | Date;
  y: number;
  series?: string;
  attributes?: ChartAttributes;
}

export interface ChartAttributes {
  [key: string]: number | string | IAccessor<number> | IAccessor<string>;
}

export interface PlotLabelConfig {
  show: 'always' | 'hover';
  prefix?: string;
  color?: string;
  suffix?: string;
  orientation?: 'vertical' | 'horizontal';
}

export type ChartScales = Scales.Linear | Scales.Category | Scales.Time;
export type ChartAxes = Axes.Numeric | Axes.Category | Axes.Time;
export type LinePlot = Plots.Line<{}>;
export type BarPlot = Plots.Bar<{}, {}>;
