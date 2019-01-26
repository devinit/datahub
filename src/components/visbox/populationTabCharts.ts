import { darkRed, lightRed, red } from '../theme/semantic';

export const populationDistribution = {
  type: 'stacked-timearea',
  colors: [ lightRed, red ],
  groupBy: 'group',
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse'
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    // Every 30 years
    tickingStep: 20,
    axisMinimum: 1960,
    axisMaximum: 2016
  }
};

export const populationPerAgeBand = {
  type: 'stacked-timearea',
  colors: [ lightRed, red, darkRed ],
  groupBy: 'band',
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse'
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    // Every 30 years
    tickingStep: 20,
    axisMinimum: 1960,
    axisMaximum: 2016
  }
};

export default { populationDistribution, populationPerAgeBand };
