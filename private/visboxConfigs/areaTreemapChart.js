const areaConfig = {
  type: 'stacked-timearea',
  groupBy: 'flow_category',
  colors: ['rgb(186, 12, 47)', 'rgb(0, 149, 200)', 'rgb(147, 50, 142)', 'rgb(234, 118, 0)', 'rgb(27, 54, 93)'],
  showLabels: true,
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    ticking: 'odd',
    showGridlines: true,
  },
  timeAxis: {
    showAxis: true,
    indicator: 'year',
    axisMinimum: '2000',
    axisMaximum: '2015',
    ticking: 'years',
    tickingStep: 5,
  }
};

const treemapConfig = {
  type: 'treemap',
  colors: ['rgb(186, 12, 47)', 'rgb(0, 149, 200)', 'rgb(147, 50, 142)', 'rgb(234, 118, 0)', 'rgb(27, 54, 93)'],
  tree: {
    id: 'flow_category',
    parent: 'year',
    value: 'value'
  },
  treemap: {
    tile: 'binary'
  }
};


export default {areaConfig, treemapConfig};
