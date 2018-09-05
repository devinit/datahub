const line = {
  type: 'timeline',
  colors: [ '#0095cb' ],
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
  colors: [ '#0095cb' ],
  orientation: 'horizontal',
  tree: {
    id: 'nodeId',
    parent: 'nodeParent',
    value: 'value'
  }
};

export default { line, partition };
