import { Interactions } from 'plottable';
import Tooltip from 'tooltip.js';
import { BarPlot, DataPoint, LinePlot, TooltipConfig, TooltipPointConfig } from './types';
import * as moment from 'moment';
import { format as d3Format } from 'd3';

const getDefaultTooltipPointConfig = (value: number | string | Date): TooltipPointConfig => {
  if (value instanceof Date) {
    return { format: 'MMM D YYYY', prefix: '', suffix: '' };
  }
  if (typeof value === 'number') {
    return { format: '.1f', prefix: '', suffix: '' };
  }

  return { format: '', prefix: '', suffix: '' };
};

const getTooltipConfig = (datum: DataPoint, config: Partial<TooltipConfig>): TooltipConfig => {
  return {
    show: true,
    x: { ...getDefaultTooltipPointConfig(datum.x), ...config.x },
    y: { ...getDefaultTooltipPointConfig(datum.y), ...config.y }
  };
};

const formatDataPointValue = (value: number | string | Date, format: string): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (value instanceof Date && format) {
    return moment(value).format(format);
  }
  if (typeof value === 'number') {
    return d3Format(format)(value);
  }

  return '';
};

const defaultTemplate = (datum: DataPoint, config: TooltipConfig) => {
  // tslint:disable-next-line:no-string-literal
  const color = datum.attributes ? (datum.attributes['stroke'] || datum.attributes['fill']) : '';
  const x = formatDataPointValue(datum.x, config.x.format || '');
  const y = formatDataPointValue(datum.y, config.y.format || '');

  return `
    <div>
      <div style="color: ${color}">${datum.series || ''}</div>
      <span>${config.x.prefix}${x}${config.x.suffix} - ${config.y.prefix}${y}${config.y.suffix}</span>
    </div>
  `;
};

export const createTooltip = (chartNode: HTMLDivElement, plot: BarPlot | LinePlot, config: Partial<TooltipConfig>) => {
  const tooltipAnchor = plot.foreground().append('circle')
    .attr('r', 3)
    .attr('opacity', '0');

  const tooltip = new Tooltip(tooltipAnchor.node(), { title: 'Tooltip', container: chartNode, html: true });
  const pointer = new Interactions.Pointer()
      .onPointerEnter(() => tooltip.show())
      .onPointerMove(point => {
        tooltip.hide();
        const closest = plot.entityNearest(point);
        if (closest) {
          const { datum, position } = closest;
          tooltipAnchor
            .attr('cx', position.x)
            .attr('cy', position.y);
          const title = config.template
            ? config.template(datum)
            : defaultTemplate(datum, getTooltipConfig(datum, config));
          tooltip.updateTitleContent(title);
          tooltip.show();
        }
      })
      .onPointerExit(() => tooltip.hide());

  pointer.attachTo(plot);
};
