import { red } from '../theme/semantic';

export const area = {
  type: 'timearea',
  colors: [ red ],
  labeling: {
    suffix: '%'
  },
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse',
    suffix: '%'
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    tickingStep: 20,
    axisMinimum: 2000,
    axisMaximum: 2013
  },
  time: {
    interpolate: true
  }
};

export const histogram = {
  type: 'bar',
  colors: [ '#a0979d' ],
  coloring: 'color',
  labeling: {
    showLabels: true,
    suffix: '%',
    autofit: false
  },
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    ticking: 'sparse'
  },
  categoryAxis: {
    showAxis: true,
    indicator: 'quintileName',
    tickingStep: 1,
    ticking: 'end',
    innerPadding: 0.5
  },
  interactions: {
    enable: true
  },
  tooltips: {
    enable: false
  },
  highlight: [ 'Lowest 20%' ]
};

export default { area, histogram };
