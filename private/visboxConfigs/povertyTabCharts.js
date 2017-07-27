export const area = {
  type: 'timearea',
  colors: ['rgb(186, 12, 47)'],
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
    axisMaximum: 2013
  }
};

export const histogram = {
  type: 'bar',
  colors: ['#a0979d'],
  coloring: 'color',
  labeling: {
    showLabels: true,
    suffix: '%'
  },
  linearAxis: {
    showAxis: false,
    indicator: 'value',
  },
  categoryAxis: {
    indicator: 'quintileName',
    ticking: 'end',
    innerPadding: 0.2,
  }
};

export default { area, histogram };
