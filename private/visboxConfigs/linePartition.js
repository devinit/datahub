const line = {
  type: 'timeline',
  colors: ['#0095cb'],
  linearAxis: {
    indicator: 'value',
    showAxis: true,
    showGridlines: true,
    ticking: 'sparse',
    axisMinimum: 0,
  },
  timeAxis: {
    indicator: 'year',
    showAxis: true,
    axisMinimum: '2000',
    axisMaximum: '2018',
    ticking: 'years',
    tickingStep: 10,
  },
  anchor: {
    start: '2015'
  }
};

const partition = {
  title: '',
  type: 'partition',
  colors: ['#0095cb'],
  coloring: 'color',
  orientation: 'horizontal',
  tree: {
    id: 'nodeId',
    parent: 'nodeParent',
    value: 'value'
  }
};

export default { line, partition };
