export const populationDistribution = {
  type: 'stacked-timearea',
  colors: ['rgb(0, 149, 203)', 'rgb(186, 12, 47)'],
  groupBy: 'group',
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
    // Every 30 years
    tickingStep: 20,
    axisMinimum: 2013,
    axisMaximum: 2015,
  },
};

export default { populationDistribution };
