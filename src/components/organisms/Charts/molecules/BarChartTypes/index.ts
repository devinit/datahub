import { IAccessor } from 'plottable/build/src/core/interfaces';
import { Plots } from 'plottable';

export interface BarChartConfig {
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
}

export interface AxisLabelConfig {
  show: boolean;
  caption: string;
  angle: number;
}

export interface BarChartDataPoint {
  x: number | string | Date;
  y: number;
  series?: string;
  attributes?: BarChartAttributes;
}

export interface BarChartAttributes {
  [key: string]: number | string | IAccessor<number> | IAccessor<string>;
}

export interface PlotLabelConfig {
  show: 'always' | 'hover';
  prefix?: string;
  color?: string;
  suffix?: string;
  orientation?: 'vertical' | 'horizontal';
}

export type BarPlot = Plots.Bar<{}, {}>;
