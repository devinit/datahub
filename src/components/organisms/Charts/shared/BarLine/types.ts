import { Axes, Component, Plots, Scales, XAlignment, YAlignment } from 'plottable';
import { Table } from 'plottable/build/src/components';
import { ChartAttributes, PlotLabelConfig } from '../types';

export interface ChartConfig {
  xAxis: Partial<AxisConfig>;
  yAxis: Partial<AxisConfig>;
  labels: Partial<PlotLabelConfig>;
  legend: Partial<LegendConfig>;
  gridlines: Partial<GridlinesConfig>;
  tooltip: Partial<TooltipConfig>;
  anchor: Partial<AnchorConfig>;
  spline?: boolean;
}

export type AxisType = 'linear' | 'category' | 'time';
export type TableRow = Array<Component | null | undefined>;

export type TimeAxisFormat = 'years' | 'months' | 'days' | 'hours';
export interface TimeTickingSteps {
  years: number;
  months: number;
  days: number;
  hours: number;
}
export interface AxisConfig {
  show: boolean;
  type: AxisType;
  position: 'top' | 'bottom' | 'left' | 'right';
  outerPadding: number;
  innerPadding: number;
  tickingStep?: number | Partial<TimeTickingSteps>;
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

export interface GridlinesConfig {
  showXGrid: boolean;
  showYGrid: boolean;
}

export interface AnchorConfig {
  range: {
    start?: Date | number;
    end?: Date | number;
  };
  format: string; // can be either a d3.format or a moment().format()
  onChange?: (value: number | Date) => void;
}

export interface DataPoint {
  x: number | string | Date;
  y: number;
  series?: string;
  attributes?: ChartAttributes;
}

export type ChartScales = Scales.Linear | Scales.Category | Scales.Time;
export type ChartAxes = Axes.Numeric | Axes.Category | Axes.Time;
export type LinePlot = Plots.Line<{}>;
export type BarPlot = Plots.Bar<{}, {}>;

export interface TooltipConfig {
  show: boolean;
  x: Partial<TooltipPointConfig>;
  y: Partial<TooltipPointConfig>;
  template?: (datum: DataPoint) => string; // refer to defaultTemplate function in tooltip.ts
}

export interface TooltipPointConfig {
  format: string; // can be either a d3.format or a moment().format()
  prefix?: string;
  suffix?: string;
}

export interface LineAnchorConfig extends AnchorConfig {
  scale: Scales.Time | Scales.Linear;
  axis: Axes.Time | Axes.Numeric;
  plot: Table;
}
