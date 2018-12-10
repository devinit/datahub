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
    axisMaximum: 2015
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
    showLabels: false,
    suffix: '%'
  },
  linearAxis: {
    showAxis: false,
    indicator: 'value',
    suffix: '%'
  },
  categoryAxis: {
    indicator: 'quintileName',
    ticking: 'end',
    innerPadding: 0.5
  },
  interactions: {
    enable: true
  },
  tooltips: {
    enable: false
  },
  highlight: [ 'value bottom 20%' ]
};

export default { area, histogram };
