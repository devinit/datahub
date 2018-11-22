import { LegendConfig } from '..';
import { Components, Scales } from 'plottable';

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
