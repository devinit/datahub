import { PlotLabelConfig } from '../../../shared/types';

export interface TreeMapData {
  label: string;
  parentId: string;
  value: number;
}

export interface TreeMapConfig {
  labels: Partial<TreeMapLabelConfig>;
  tooltip: Partial<TreeMapTooltipConfig>;
}
export interface TreeMapTooltipConfig {
  show: boolean;
  value: { prefix: string, suffix: string };
  template?: (datum: TreeMapData) => string; // refer to defaultTemplate function in tooltip.ts
}

export interface TreeMapLabelConfig extends PlotLabelConfig {
  showPercentage: boolean;
  showValue: boolean;
}

export interface Datum {
  x1: number;
  x0: number;
  y0: number;
  y1: number;
}
