import { IAccessor } from 'plottable/build/src/core/interfaces';
import { Plots } from 'plottable';

export interface BarChartConfig {
  xAxis: Partial<AxisConfig>;
  yAxis: Partial<AxisConfig>;
  labels: Partial<LabelConfig>;
}

export interface AxisConfig {
  show: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  outerPadding: number;
  innerPadding: number;
}

export interface BarChartDataPoint {
  x: number | string;
  y: number;
  series?: string;
  attributes?: BarChartAttributes;
}

export interface BarChartAttributes {
  [key: string]: number | string | IAccessor<number> | IAccessor<string>;
}

export interface LabelConfig {
  show: 'always' | 'hover';
  prefix?: string;
  color?: string;
  suffix?: string;
  orientation?: 'vertical' | 'horizontal';
}

export type BarPlot = Plots.Bar<{}, {}>;
