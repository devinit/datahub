const data = {
  startYear: 2010,
  maxYear: 2015,
  minYear: 2000,
  countries: [
    {text: 'Uganda', value: 'Uganda'}
  ],
  indicators: [
    {text: 'Small', value: 'Small'}
  ],
  colorables: [
    {text: 'region', value: 'region'},
    {text: 'income-group', value: 'income-group'}
  ],
  incomeGroups: [
    {name: 'LDCs', color: '#ba0c2f'},
    {name: 'LMICs', color: '#b7bf10'},
  ],
  regions: [
    {name: 'Europe', color: '#1b365d'},
    {name: 'Far East Asia', color: '#ea7600'},
  ],
  points: [],
  config: {
    type: 'bubble',

    colors: ['#ba0c2f', '#93328e', '#b7bf10', '#004862'],

    groupBy: 'Region',

    horizontalAxis: {
      showAxis: true,

      // Axis Label
      axisLabel: 'Government revenue per person (excluding grants), 2015 PPP$',
      indicator: 'Height',

      showGridlines: true,
    },

    verticalAxis: {
      showAxis: true,

      // Axis Label
      axisLabel: 'Number of people living in extreme poverty',
      indicator: 'Weight',

      axisMinimum: 0,
      axisMaximum: 80,

      showGridlines: true,
    },

    bubble: {
      indicator: 'Age',
      label: 'Age (Yrs)',
      minimum: 0,
      maximum: 100,
    },
  }
};

export default data;

