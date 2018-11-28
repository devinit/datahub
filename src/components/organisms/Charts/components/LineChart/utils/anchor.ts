import * as moment from 'moment';
import { Axes, Scales, SimpleSelection } from 'plottable';
import { AnchorConfig, ChartAttributes } from '../../../shared';
import { drag, event, select } from 'd3';
import { Table } from 'plottable/build/src/components';

export interface LineAnchorConfig extends AnchorConfig {
  scale: Scales.Time;
  axis: Axes.Time;
  plot: Table;
}

interface Bounds {
  selection: ClientRect;
  axis: ClientRect;
}

export const createTimeAxisAnchor = (configs: LineAnchorConfig) => {
  const { axis, plot, scale, range = {}, format, onChange } = configs;

  const originDate: moment.Moment = moment(new Date(scale.domainMin()));
  const startDate: moment.Moment = moment(range.startDate || originDate);

  const content = plot.content();
  content.attr('style', 'z-index: 1');
  const contentNode = content.node() as Element | null;
  const axisNode = axis.content().node() as Element | null;
  if (contentNode && axisNode) {
    const contentBounds = contentNode.getBoundingClientRect();
    const axisBounds = axisNode.getBoundingClientRect();
    const startPosition = scale.scaleTransformation(startDate.toDate().getTime());
    const leftOffset = axisBounds.left - contentBounds.left;
    const xPosition = leftOffset + startPosition;
    const yPosition = 10;
    const circleRadius = 20;
    addAnchorCircle(content)(xPosition, yPosition, circleRadius);
    addAnchorText(content)(startDate.format(format || 'YYYY'), xPosition, yPosition + 5, {});
    addAnchorLine(content)({
      x1: xPosition,
      x2: xPosition,
      y1: yPosition + circleRadius + 1,
      y2: axisBounds.top - contentBounds.top
    });

    const dragListener = onDrag(startPosition, scale, {
      selection: contentBounds,
      axis: axisBounds
    }, format, onChange);
    select('.anchor').call(drag().on('drag', dragListener));
    select('.anchor-label').call(drag().on('drag', dragListener));
  }
};

const addAnchorCircle = (selection: SimpleSelection<void>) =>
  (x: number, y: number, radius: number, attributes: ChartAttributes = {}) => {
    const circle = selection.append('circle');
    circle
      .attr('class', 'anchor')
      .attr('cx', x)
      .attr('cy', y)
      .attr('fill', 'rgb(232, 68, 58)')
      .attr('r', radius)
      .attr('style', 'cursor: ew-resize');

    Object.keys(attributes).map(attribute => circle.attr(attribute, attribute[attribute]));

    return circle;
  };

const addAnchorText = (selection: SimpleSelection<void>) =>
  (text: string, x: number, y: number, attributes: ChartAttributes = {}) => {
    const textElement = selection.append('text');
    textElement
      .text(text)
      .attr('class', 'anchor-label')
      .attr('x', x)
      .attr('y', y)
      .attr('fill', '#ffffff')
      .attr('font-size', 13)
      .attr('text-anchor', 'middle');

    Object.keys(attributes).map(attribute => textElement.attr(attribute, attribute[attribute]));

    return textElement;
  };

const addAnchorLine = (selection: SimpleSelection<void>) =>
  (position: { x1: number, x2: number, y1: number, y2: number }, attributes: ChartAttributes = {}) => {
    const line = selection.append('line');
    line
      .attr('class', 'anchor-line')
      .attr('x1', position.x1)
      .attr('x2', position.x2)
      .attr('y1', position.y1)
      .attr('y2', position.y2)
      .attr('stroke', '#444')
      .attr('stroke-width', 2)
      .attr('style', 'cursor: ew-resize');

    Object.keys(attributes).map(attribute => line.attr(attribute, attribute[attribute]));

    return line;
  };

const onDrag = (startPosition: number, scale: Scales.Time, bounds: Bounds, format: string, onChangeAnchor?: (date: Date) => void) => { // tslint:disable-line
  const leftOffset = bounds.axis.left - bounds.selection.left;
  let currentDate = new Date(scale.invertedTransformation(startPosition));

  return () => {
    const { x } = event;
    const xDate = scale.invertedTransformation(x - leftOffset);
    const newDate = new Date(xDate);
    const minDate = scale.domainMin();
    const maxDate = scale.domainMax();
    if (newDate !== currentDate && newDate >= minDate && newDate <= maxDate) {
      const xPosition = scale.scaleTransformation(newDate.getTime()) + leftOffset;

      select('.anchor').attr('cx', xPosition);
      select('.anchor-label').attr('x', xPosition).text(moment(newDate).format(format || 'YYYY'));
      select('.anchor-line').attr('x1', xPosition).attr('x2', xPosition);

      if (onChangeAnchor) {
        onChangeAnchor(newDate);
      }
    }
    currentDate = new Date(xDate);
  };
};
