import * as React from 'react';
import { Dataset, Interactions, Plots, Point, Scales } from 'plottable';
import { TreeMapConfig, TreeMapData, TreeMapLabelConfig, autofitStyles, calculatePercentage } from './utils';
import {
  HierarchyNode,
  TreemapLayout,
  color,
  stratify,
  treemap,
  treemapResquarify
} from 'd3';
import { DataPointCommon } from '../../shared/types';
import { createScaleAnimator } from './utils/animator';

export interface TreeMapProps extends DataPointCommon {
  data: TreeMapData[];
  config?: Partial<TreeMapConfig>;
  width: number;
  height: number;
}

export class TreeMap extends React.Component<TreeMapProps> {
  private chartNode?: HTMLDivElement;
  private plot: Plots.Rectangle<{}, {}>;
  private layout: TreemapLayout<TreeMapData>;
  private rootNode: HierarchyNode<TreeMapData>;
  private xScale: Scales.Linear;
  private yScale: Scales.Linear;

  constructor(props) {
    super(props);

    this.setChartNode = this.setChartNode.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div
        className="di-tree-chart"
        ref={ this.setChartNode }
        style={ { height: this.props.height, width: this.props.width } }
      />
    );
  }

  componentDidMount() {
    if (this.chartNode) {
      this.renderChart(this.chartNode, this.props);
    }
  }

  private setChartNode(node: HTMLDivElement) {
    this.chartNode = node;
  }

  private renderChart(chartNode: HTMLDivElement, props: TreeMapProps) {
    this.createAxes(props);
    this.plot = new Plots.Rectangle();
    this.processData(props);

    this.plot.renderTo(chartNode);
    this.plot.onAnchor(() => this.onAnchor(this.plot));
    // this.plot.foreground().append('g').append('text').text('Awesome');
  }

  private createAxes(props: TreeMapProps) {
    this.xScale = new Scales.Linear();
    this.yScale = new Scales.Linear();
    this.resetDomain(props);
  }

  private resetDomain(props: TreeMapProps) {
    this.xScale.domainMin(0);
    this.yScale.domainMin(0);
    this.xScale.domainMax(props.width);
    this.yScale.domainMax(props.height);
  }

  private processData(props: TreeMapProps) {
    if (props.data && props.data.length) {
      this.layout = treemap<TreeMapData>()
        .size([ props.width, props.height ])
        .tile(treemapResquarify);
      this.rootNode = this.createHierarchy(props.data);
      const children = this.layout(this.rootNode).children;

      if (props.config && props.config.labels) {
        this.plot.labelsEnabled(!!props.config.labels.show);
        (this.plot as any)._drawLabels = this.createLabels(this.plot, props);
      }
      this.plot
        .addDataset(new Dataset(children))
        .x(d => d[`x0`], this.xScale)
        .y(d => d[`y0`], this.yScale)
        .x2(d => d[`x1`])
        .y2(d => d[`y1`])
        .attr('fill', d => d.data.fill || '#1F77B4')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .attr('style', 'fill-opacity: 1;shape-rendering: crispedges')
        .label(d => d.data.label)
        .animated(true);
    }
  }

  private createHierarchy(data: TreeMapData[]): HierarchyNode<TreeMapData> {
    return stratify<TreeMapData>()
      .id(d => d.label)
      .parentId(d => d.parentId)(data)
      .sum(d => d.value)
      .sort((a, b) => (b.value as number) - (a.value as number));
  }

  private getNodeDescendants(node: TreeMapData): TreeMapData[] {
    const nodes = this.props.data.filter(data =>
      data.label !== node.label && data.parentId === node.label
    );

    return nodes.reduce((datum: TreeMapData[], data: TreeMapData) => {
      const descendants = this.getNodeDescendants(data);

      return datum.concat(descendants);
    }, [ node ]);
  }

  private createLabels(plot: Plots.Rectangle<{}, {}>, props: TreeMapProps) {
    const config: TreeMapLabelConfig = this.getLabelConfig(props.config && props.config.labels);
    const { showPercentage, showValue, suffix = '', prefix = '' } = config;
    const percentageCalculator = calculatePercentage(props.width, props.height);

    return () => {
      const foreground = plot.foreground();
      const entities = plot.entities();
      foreground.selectAll('foreignObject').remove(); // remove all current labels

      entities.forEach(entity => {
        const node = entity.selection.node() as SVGRectElement | null;
        if (node) {
          const { width, height, x, y } = node.getBBox();

          if (height > 35 && width > 30) {
            const fill = node.getAttribute('fill');
            if (fill) {
              const colour = color(fill);
              if (colour) {
                const { r, g, b } = colour.rgb();
                const brightness = (r + g + b) / (256 * 3);
                const label = (plot as any)._label(entity.datum);
                const percentage = percentageCalculator(entity.datum) || 100;
                const percentageLabel = !showPercentage || percentage === 100 || percentage < 1 ? '' : `${percentage}%`;
                const valueLabel = showValue ? `${prefix}${entity.datum.value}${suffix}` : '';
                const separator = showValue && showPercentage ? ' | ' : '';
                const autofitFontStyle = autofitStyles(width, height, `${label} ${percentageLabel}${valueLabel}`);
                foreground
                  .append('foreignObject')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('x', x)
                  .attr('y', y)
                  .html(`
                    <div class="${brightness > 0.8 ? 'dark' : 'light'}-label plot-label" ${autofitFontStyle.font}>
                      <div class="plot-label-header">${label}</div>
                      <div class="plot-label-value" ${autofitFontStyle.label}>
                        ${percentageLabel}${percentageLabel && separator}${valueLabel}
                      </div>
                    </div>`
                  );
              }
            }
          }
        }
      });
    };
  }

  private getLabelConfig(config: Partial<TreeMapLabelConfig> = {}): TreeMapLabelConfig {
    const defaultConfig: TreeMapLabelConfig = {
      show: true,
      showPercentage: true,
      showValue: true
    };

    return { ...defaultConfig, ...config };
  }

  private onAnchor(plot: Plots.Rectangle<{}, {}>) {
    setTimeout(() => {
      const interaction = new Interactions.Click()
        .onClick(this.onClick);
      interaction.attachTo(plot);
      plot.onDetach(interaction.detachFrom);
    }, 500);
  }

  private onClick(point: Point) {
    const entities = this.plot.entitiesAt(point);
    if (entities && entities.length) {
      const entity = entities.pop();
      if (entity) {
        const { datum } = entity;
        const nextDomain = [ [ 'x0', 'x1' ], [ 'y0', 'y1' ] ].map(([ min, max ]) => [ datum[min], datum[max] ]);
        const previousDomain = [ this.xScale.domain(), this.yScale.domain() ];
        const shouldReset = [ [ nextDomain, previousDomain ] ]
          .every(([ [ [ a, b ], [ c, d ] ], [ [ w, x ], [ y, z ] ] ]) => {
            const diff = (a + b + c + d) - (w + x + y + z);

            return +diff.toFixed(2) === 0;
          });
        const animate = createScaleAnimator(500);
        if (shouldReset) {
          animate([ this.xScale, this.yScale ], [ [ 0, this.props.width ], [ 0, this.props.height ] ])
            .then(() => this.updatePlot(point));
        } else {
          animate([ this.xScale, this.yScale ], nextDomain).then(() => this.updatePlot(point));
        }
      }
    }
  }

  private updatePlot(point: Point) {
    const entities = this.plot.entitiesAt(point);
    if (entities && entities.length) {
      const node: HierarchyNode<TreeMapData> = entities[0].datum;
      if (node && node.children && node.id) {
        const data: TreeMapData[] = this.getNodeDescendants(node.data);
        data[0].parentId = ''; // make parent node
        const root: HierarchyNode<TreeMapData> = this.createHierarchy(data);
        this.plot.datasets([ new Dataset(this.layout(root).children) ]);
        this.resetDomain(this.props);
      }
    }
  }
}
