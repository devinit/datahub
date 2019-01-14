const line = {
  type: 'timeline',
  colors: [ '#e84439' ],
  linearAxis: {
    indicator: 'value',
    showAxis: true,
    showGridlines: true,
    ticking: 'sparse'
    // axisMinimum: 0
  },
  timeAxis: {
    indicator: 'year',
    showAxis: true,
    axisMinimum: '2000',
    axisMaximum: '2018',
    ticking: 'years',
    tickingStep: 5
  },
  anchor: {
    start: '2015'
  }
};

const partition = {
  type: 'partition',
  colors: [ '#e84439' ],
  orientation: 'horizontal',
  tree: {
    id: 'nodeId',
    parent: 'nodeParent',
    value: 'value'
  }
};

export default { line, partition };
