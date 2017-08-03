const config = {
  type: 'dual-sidebar',
  orientation: 'horizontal',
  groupBy: 'flow_type',
  subGroupBy: 'flow_category',
  splitBy: 'direction',
  coloring: 'color',
  showLabels: true,
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    ticking: 'odd'
  },
  categoryAxis: {
    showAxis: true,
    indicator: 'flow_name',
    innerPadding: 1.5,
    outerPadding: 1,
  },
  dualSidebar: {
    gutter: 150
  }
};

export default config;
