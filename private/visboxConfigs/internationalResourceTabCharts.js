export const resourcesOverTime = {
  type: 'timeline',
  colors: [
    'rgb(44, 160, 44)',
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(214, 39, 40)',
    'rgb(27, 54, 93)',
    'rgb(190, 132, 187)',
    'rgb(0, 149, 200)'
  ],
  groupBy: 'flow_type',
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    axisMargin: 0,
    ticking: 'sparse',
    axisMinimum: 0,
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    ticking: 'years',
    tickingStep: 20,
    axisMinimum: 2000,
    axisMaximum: 2015
  },
  legend: {
    showLegend: true,
  }
};

export const mixOfResources = {
  type: 'pie',
  colors: [
    'rgb(44, 160, 44)',
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(214, 39, 40)',
    'rgb(27, 54, 93)',
    'rgb(190, 132, 187)',
    'rgb(0, 149, 200)'
  ],
  circular: {
    label: 'flow_name',
    value: 'value',
    innerRadius: 70,
    strokeWidth: 0,
    strokeColor: '#fff',
  },
  legend: {
    showLegend: true,
    position: 'bottom',
    alignment: 'center',
    symbol: 'circle',
  }
};

export default {resourcesOverTime, mixOfResources};
