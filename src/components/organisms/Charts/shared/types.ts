import { IAccessor } from 'plottable';

export interface ChartAttributes {
  [key: string]: number | string | IAccessor<number> | IAccessor<string>;
}

export interface DataPointCommon {
  attributes?: ChartAttributes;
}

export interface PlotLabelConfig {
  show: 'always' | 'hover' | boolean;
  prefix?: string;
  color?: string;
  suffix?: string;
  orientation?: 'vertical' | 'horizontal';
}
