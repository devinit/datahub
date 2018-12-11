import { PlotLabelConfig } from '../../../shared/types';

export interface TreeMapData {
  label: string;
  parentId: string;
  value: number;
}

export interface TreeMapConfig {
  labels: Partial<TreeMapLabelConfig>;
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
