// @flow
import * as d3 from 'd3';

type IConfig = {
  height: string,
  width: string,
  element: HTMLElement
}
const createLayout = (width: number, height: number) =>
  d3.treemap()
    .tile(d3.treemapResquarify.ratio((1 / 2)))
    .size([width, height])
    .paddingInner(1);

const createRoot = (data: any): any =>
  d3.hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => { return b.value - a.value; });

const positionLeaves = (cell, root) =>
  cell
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', (d) => `translate(${d.x0} , ${d.y0})`);

const drawLeavesRects = (cell) =>
  cell
    .append('rect')
    .attr('id', (d) => d.data.id)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', d => d.data.color);


export const draw = ({height, width, element}: IConfig, data: Object[]) => {
  const root = createRoot({name: 'countries', children: data });
  const treemap = createLayout(Number(width), Number(height));
  // mutates root
  treemap(root);
  const cell = d3.select(element).selectAll('g');
  positionLeaves(cell, root);
  drawLeavesRects(cell);
};
