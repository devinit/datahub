import { red } from 'components/theme/semantic';

export const area = {
  type: 'timearea',
  colors: [red],
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse',
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    tickingStep: 20,
    axisMinimum: 2000,
    axisMaximum: 2013,
  },
};

export const histogram = {
  type: 'bar',
  colors: ['#a0979d'],
  coloring: 'color',
  labeling: {
    showLabels: false,
    suffix: '%',
  },
  linearAxis: {
    showAxis: false,
    indicator: 'value',
    axisMaximum: 65
  },
  categoryAxis: {
    indicator: 'quintileName',
    ticking: 'end',
    innerPadding: 0.5,
  },
  interactions: {
    enable: true,
  },
  highlight: ['value bottom 20%']
};

export default { area, histogram };
