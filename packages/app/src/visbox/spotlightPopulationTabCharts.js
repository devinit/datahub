export const populationDistribution = {
  type: 'stacked-bar',
  colors: ['rgb(0, 149, 203)', '#e8443a'],
  groupBy: 'group',
  labeling: {
    suffix: '%',
  },
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'odd',
    suffix: '%',
    axisMinimum: 0,
    axisMaximum: 100
  },
  categoryAxis: {
    showAxis: true,
    indicator: 'year',
    outerPadding: 1,
  },
};

export default { populationDistribution };
