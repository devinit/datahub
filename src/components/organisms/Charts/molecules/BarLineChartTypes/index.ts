import { IAccessor } from 'plottable/build/src/core/interfaces';
import { Axes, Component, Plots, Scales, XAlignment, YAlignment } from 'plottable';

export interface ChartConfig {
  xAxis: Partial<AxisConfig>;
  yAxis: Partial<AxisConfig>;
  labels: Partial<PlotLabelConfig>;
  legend: Partial<LegendConfig>;
}

export type AxisType = 'linear' | 'category' | 'time';
export type TableRow = Array<Component | null | undefined>;

export type TimeAxisFormat = 'years' | 'months' | 'days' | 'hours';
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
  margin: number;
  axisMin?: number | Date;
  axisMax?: number | Date;
  timeFormat?: TimeAxisFormat[];
}

export interface AxisLabelConfig {
  show: boolean;
  caption: string;
  angle: number;
}

export interface LegendConfig {
  show: boolean;
  position: 'top' | 'bottom' | 'right';
  xAlignment: XAlignment;
  yAlignment: YAlignment;
  maxEntriesPerRow: number;
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
