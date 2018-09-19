const areaConfig = {
  type: 'stacked-timearea',
  groupBy: 'flow_name',
  coloring: 'color',
  showLabels: true,
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    ticking: 'odd',
    showGridlines: true
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    axisMinimum: 2000,
    axisMaximum: 2016,
    ticking: 'years',
    tickingStep: 5
  }
};

const treemapConfig = {
  type: 'treemap',
  coloring: 'color',
  colors: [],
  labeling: {
    prefix: 'US$ '
  },
  tree: {
    id: 'flow_name',
    value: 'value'
  },
  treemap: {
    tile: 'binary'
  }
};

export default { areaConfig, treemapConfig };
