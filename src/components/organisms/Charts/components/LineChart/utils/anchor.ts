import * as moment from 'moment';
import { Scales, SimpleSelection } from 'plottable';
import { ChartAttributes, LineAnchorConfig } from '../../../shared';
import { drag, event, format as d3Format, select } from 'd3';
interface Bounds {
  selection: ClientRect;
  axis: ClientRect;
}

export const createTimeAxisAnchor = (configs: LineAnchorConfig) => {
  const { axis, plot, scale, range = {}, format, onChange } = configs;

  const originDate: moment.Moment = moment(new Date(scale.domainMin()));
  const startDate: moment.Moment = moment(range.start || originDate);

  const content = plot.content();
  content.attr('style', 'z-index: 1');
  const contentNode = content.node() as Element | null;
  const axisNode = axis.content().node() as Element | null;
  if (contentNode && axisNode) {
    const bounds: Bounds = {
      axis: axisNode.getBoundingClientRect(),
      selection: contentNode.getBoundingClientRect()
    };
    const { startPosition, xPosition, yPosition } = getPositionData(scale, startDate.toDate().getTime(), bounds);
    const circleRadius = 20;
    createAnchorElements(content, xPosition, yPosition, circleRadius, startDate.format(format || 'YYYY'), bounds);

    const dragListener = onTimeAxisDrag(startPosition, scale as Scales.Time, {
      selection: bounds.selection,
      axis: bounds.axis
    }, format, onChange);
    select('.anchor').call(drag().on('drag', dragListener));
    select('.anchor-label').call(drag().on('drag', dragListener));
  }
};

export const createLinearAxisAnchor = (configs: LineAnchorConfig) => {
  const { axis, plot, scale, range = {}, format, onChange } = configs;

  const origin: number = scale.domainMin() as number;
  const start: number = range.start as number || origin;

  const content = plot.content();
  content.attr('style', 'z-index: 1');
  const contentNode = content.node() as Element | null;
  const axisNode = axis.content().node() as Element | null;
  if (contentNode && axisNode) {
    const bounds: Bounds = {
      axis: axisNode.getBoundingClientRect(),
      selection: contentNode.getBoundingClientRect()
    };
    const { startPosition, xPosition, yPosition } = getPositionData(scale, start, bounds);
    const circleRadius = 20;
    createAnchorElements(content, xPosition, yPosition, circleRadius, d3Format(format || '.0f')(start), bounds);

    const dragListener = onLinearAxisDrag(startPosition, scale as Scales.Linear, bounds, format, onChange);
    select('.anchor').call(drag().on('drag', dragListener));
    select('.anchor-label').call(drag().on('drag', dragListener));
  }
};

const createAnchorElements = (content: SimpleSelection<void>, x: number, y: number, radius: number, text: string, bounds: Bounds) => { // tslint:disable-line
  addAnchorCircle(content)(x, y, radius);
  addAnchorText(content)(text, x, y + 5, {});
  addAnchorLine(content)({
    x1: x,
    x2: x,
    y1: y + radius + 1,
    y2: bounds.axis.top - bounds.selection.top
  });
};

const updateAnchor = (position: number, text: string) => {
  select('.anchor').attr('cx', position);
  select('.anchor-label').attr('x', position).text(text);
  select('.anchor-line').attr('x1', position).attr('x2', position);
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
      .attr('text-anchor', 'middle')
      .attr('style', 'cursor: ew-resize');

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

const getPositionData = (scale: Scales.Time | Scales.Linear, startValue: number, bounds: Bounds) => {
  const startPosition = scale.scaleTransformation(startValue);
  const leftOffset = bounds.axis.left - bounds.selection.left;
  const xPosition = leftOffset + startPosition;
  const yPosition = 10;

  return { startPosition, xPosition, yPosition };
};

const onTimeAxisDrag = (start: number, scale: Scales.Time, bounds: Bounds, format: string, onChange?: (date: Date) => void) => { // tslint:disable-line
  const leftOffset = bounds.axis.left - bounds.selection.left;
  let currentDate = new Date(scale.invertedTransformation(start));

  return () => {
    const { x } = event;
    const newDate = new Date(scale.invertedTransformation(x - leftOffset));
    const minDate = scale.domainMin();
    const maxDate = scale.domainMax();
    if (newDate !== currentDate && newDate >= minDate && newDate <= maxDate) {
      const xPosition = scale.scaleTransformation(newDate.getTime()) + leftOffset;
      updateAnchor(xPosition, moment(newDate).format(format || 'YYYY'));

      if (onChange) {
        onChange(newDate);
      }
    }
    currentDate = newDate;
  };
};

const onLinearAxisDrag = (start: number, scale: Scales.Linear, bounds: Bounds, format: string, onChange?: (number: number) => void) => { // tslint:disable-line
  const leftOffset = bounds.axis.left - bounds.selection.left;
  let currentValue = scale.invertedTransformation(start);

  return () => {
    const { x } = event;
    const newValue = scale.invertedTransformation(x - leftOffset);
    const minValue = scale.domainMin();
    const maxValue = scale.domainMax();
    if (newValue !== currentValue && newValue >= minValue && newValue <= maxValue) {
      const xPosition = scale.scaleTransformation(newValue) + leftOffset;
      updateAnchor(xPosition, d3Format(format || '.0f')(newValue));

      if (onChange) {
        onChange(newValue);
      }
    }
    currentValue = newValue;
  };
};
