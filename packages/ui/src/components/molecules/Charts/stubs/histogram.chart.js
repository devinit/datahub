const config = {
  type: 'stacked-bar',
  groupBy: 'group',
  colors: ['#ba0c2f', '#b8b1b6'],
  linearAxis: {
    indicator: 'value',
    axisMaximum: 50,
    axisMinimum: 0,
    ticking: 'odd',
  },
  categoryAxis: {
    indicator: 'indicator',
    innerPadding: 0.5,
  },
};

const data = [
  { indicator: 'bottom-20pc', value: 6.36, group: 'bottom' },
  { indicator: 'bottom-20pc', value: 0, group: 'top' },
  { indicator: 'second-20pc', value: 10.41, group: 'top' },
  { indicator: 'third-20pc', value: 14.32, group: 'top' },
  { indicator: 'fourth-20pc', value: 20.62, group: 'top' },
  { indicator: 'highest-20pc', value: 48.29, group: 'top' },
];

export default { config, data };
