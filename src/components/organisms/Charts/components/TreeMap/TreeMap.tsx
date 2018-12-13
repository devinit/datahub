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
import glamorous from 'glamorous';
import { css } from 'glamor';
import { DataPointCommon } from '../../shared/types';
import { createScaleAnimator } from './utils/animator';

export interface TreeMapProps extends DataPointCommon {
  data: TreeMapData[];
  config?: Partial<TreeMapConfig>;
  width: number;
  height: number;
}

const NavController = glamorous.div({
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '50px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1000,
  cursor: 'pointer'
});

export class TreeMap extends React.Component<TreeMapProps, { showNavController: boolean }> {
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
    this.hideNavController = this.hideNavController.bind(this);
    this.onGoBack = this.onGoBack.bind(this);

    this.state = { showNavController: false };
  }

  render() {
    return (
      <div className="plottable-tree-map-wrapper">
        <div
          className="plottable-tree-map"
          ref={ this.setChartNode }
          style={ { height: this.props.height, width: this.props.width } }
        />
        <NavController
          { ...this.setNavControllerVisibility(this.state.showNavController) }
          onMouseOut={ this.hideNavController }
          onClick={ this.onGoBack }
        >
          <i className="chevron left big inverted icon" style={ { position: 'relative', top: '45%' } }/>
        </NavController>
      </div>
    );
  }

  componentDidMount() {
    if (this.chartNode) {
      this.renderChart(this.chartNode, this.props);
    }
  }

  private setNavControllerVisibility(visible: boolean) {
    return css({ display: visible ? 'block' : 'none' });
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
      foreground.selectAll('.plot-labels').remove(); // remove all current labels

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
                  .attr('class', 'plot-labels')
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

  private hideNavController() {
    this.setState({ showNavController: false });
  }

  private getEntityAtPoint(point: Point): Plots.IPlotEntity | null {
    const entities = this.plot.entitiesAt(point);
    if (entities && entities.length) {
      const entity = entities.pop();
      if (entity) {
        return entity;
      }
    }

    return null;
  }

  private onClick(point: Point) {
    const entity = this.getEntityAtPoint(point);
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
          .then(() => this.updatePlot(datum));
      } else {
        animate([ this.xScale, this.yScale ], nextDomain).then(() => this.updatePlot(datum));
      }
    }
  }

  private updatePlot(node: HierarchyNode<TreeMapData>) {
    if (node && node.children && node.id) {
      this.updatePlotFromData(node.data);
    }
  }

  private updatePlotFromData(treeData: TreeMapData) {
    const data: TreeMapData[] = this.getNodeDescendants(treeData).slice().map(dat => ({ ...dat }));
    data[0].parentId = ''; // make parent node
    const root: HierarchyNode<TreeMapData> = this.createHierarchy(data);
    this.plot.datasets([ new Dataset(this.layout(root).children) ]);
    this.resetDomain(this.props);
  }

  private onGoBack() {
    const entities = this.plot.entities();
    if (entities && entities.length) {
      const parentId = entities[0].datum.data.parentId;
      const parent = this.props.data.find(data => data.label === parentId);
      if (parent) {
        const grandParent = this.props.data.find(data => data.label === parent.parentId);
        if (grandParent) {
          this.updatePlotFromData(grandParent);
        }
      }
    }
  }

  private onAnchor(plot: Plots.Rectangle<{}, {}>) {
    setTimeout(() => {
      const clickInteraction = new Interactions.Click().onClick(this.onClick);
      clickInteraction.attachTo(plot);
      plot.onDetach(clickInteraction.detachFrom);

      const hoverInteraction = new Interactions.Pointer()
        .onPointerEnter(point => {
          const entity = this.getEntityAtPoint(point);
          if (entity && entity.datum.data.parentId !== this.rootNode.id) {
            this.setState({ showNavController: true });
          }
        })
        .onPointerMove(point => {
          if (!this.state.showNavController) {
            const entity = this.getEntityAtPoint(point);
            if (entity && entity.datum.data.parentId !== this.rootNode.id) {
              this.setState({ showNavController: true });
            }
          }
        })
        .onPointerExit(({ x, y }) => {
          if (x <= 0 || x >= this.props.width || y <= 0 || y >= this.props.height) { // is cursor out of bounds?
            this.setState({ showNavController: false });
          }
        });
      hoverInteraction.attachTo(plot);
      plot.onDetach(hoverInteraction.detachFrom);
    }, 500);
  }
}
