import { Interactions, Plots } from 'plottable';
import Tooltip from 'tooltip.js';
import { TreeMapData, TreeMapTooltipConfig as TooltipConfig } from './types';
import { TreeMapProps } from '../TreeMap';
import { HierarchyNode } from 'd3';
import { calculatePercentage } from '.';

const getTooltipConfig = (config: Partial<TooltipConfig>): TooltipConfig => {
  return {
    show: true,
    value: { prefix: '', suffix: '' },
    ...config
  };
};

const defaultTemplate = (datum: HierarchyNode<TreeMapData>, percentage: number, config: TooltipConfig) => {
  return `
    <div>
      <div>${datum.id || ''}</div>
      <span>${percentage}% | ${config.value.prefix}${datum.value}${config.value.suffix}</span>
    </div>
  `;
};

export const createTooltip = (chartNode: HTMLDivElement, plot: Plots.Rectangle<{}, {}>, props: TreeMapProps) => { // tslint:disable-line
  const config: Partial<TooltipConfig> = props.config ? props.config.tooltip || {} : {};
  const tooltipAnchor = plot.foreground().append('circle')
    .attr('r', 3)
    .attr('opacity', '0');
  const percentageCalculator = calculatePercentage(props.width, props.height);

  const tooltip = new Tooltip(tooltipAnchor.node(), { title: 'Tooltip', container: chartNode, html: true });
  const pointer = new Interactions.Pointer()
      .onPointerEnter(() => tooltip.show())
      .onPointerMove(point => {
        tooltip.hide();
        const closest = plot.entityNearest(point);
        if (closest) {
          const { datum } = closest;
          tooltipAnchor
            .attr('cx', point.x)
            .attr('cy', point.y);
          const title = config.template
            ? config.template(datum)
            : defaultTemplate(datum, percentageCalculator(datum), getTooltipConfig(config));
          tooltip.updateTitleContent(title);
          tooltip.show();
        }
      })
      .onPointerExit(() => tooltip.hide());

  pointer.attachTo(plot);
};
