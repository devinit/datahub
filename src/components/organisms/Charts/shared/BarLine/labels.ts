import { AxisConfig, BarPlot, LinePlot, PlotLabelConfig } from '..';
import { Components, Interactions, Plots } from 'plottable';
import { selectAll } from 'd3';

export const createCustomLabels = (plot: BarPlot | LinePlot, entities, labelConfig?: Partial<PlotLabelConfig>) => {
  entities.forEach(entity => drawLabel(entity, plot, labelConfig || {}));
};

export const drawLabel = (entity: Plots.IPlotEntity, plot: BarPlot | LinePlot, config: Partial<PlotLabelConfig>) => {
  const { height, width, x, y } = (entity as any).bounds;
  const { prefix = '', suffix = '', orientation = 'vertical' } = config;

  plot.foreground()
    .append('text')
    .attr('class', 'plot-label hover-label')
    .attr('x', orientation === 'vertical' ? x + (width / 2) : width + x + 5)
    .attr('y', orientation === 'horizontal' ? y + (height / 2) : y - 10)
    .attr('text-anchor', orientation === 'vertical' ? 'middle' : 'start')
    .attr('style', `fill: ${entity.selection.attr('fill')}`)
    .text(`${prefix}${entity.datum.y}${suffix}`);
};

export const redrawCustomLabels = (entities, labelConfig: Partial<PlotLabelConfig> = {}) => {
  const { orientation = 'vertical' } = labelConfig;
  entities.forEach(entity => {
    const { height, width, x, y } = (entity as any).bounds;

    selectAll('.plot-label').filter((_d, index, nodeList) => {
      const node = nodeList[index] as SVGTextElement;

      return !!(node.textContent && node.textContent.indexOf(entity.datum.y) > -1);
    })
      .attr('x', orientation === 'vertical' ? x + (width / 2) : width + x + 5)
      .attr('y', orientation === 'horizontal' ? y + (height / 2) : y - 10);
  });
};

export const showLabelsOnHover = (plot: BarPlot | LinePlot, labelConfig: Partial<PlotLabelConfig>) => {
  const interaction = new Interactions.Pointer()
    .onPointerExit(() => resetPlot(plot))
    .onPointerMove(point => {
      resetPlot(plot);
      const entities = plot.entitiesAt(point);
      if (entities && entities.length) {
        createCustomLabels(plot, entities, labelConfig);
      }
    });

  interaction.attachTo(plot);
  plot.onDetach(interaction.detachFrom);
};

export const resetPlot = (plot: BarPlot | LinePlot) => {
  plot.foreground().select('text').remove();
};

export const getYAxisLabel = (configs: Partial<AxisConfig>): Components.AxisLabel | null => {
  return configs.label && configs.label.show
    ? new Components.AxisLabel(configs.label.caption, configs.label.angle || -90)
    : null;
};

export const getXAxisLabel = (configs: Partial<AxisConfig>): Components.AxisLabel | null => {
  return configs.label && configs.label.show
    ? new Components.AxisLabel(configs.label.caption, configs.label.angle || 0)
    : null;
};
