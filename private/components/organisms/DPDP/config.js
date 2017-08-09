export default {
  type: 'bubble',

  colors: [
    'rgb(44, 160, 44)',
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(214, 39, 40)',
    'rgb(27, 54, 93)',
    'rgb(190, 132, 187)',
    'rgb(0, 149, 200)'
  ],

  coloring: 'color',

  horizontalAxis: {
    showAxis: true,

    // Axis Label
    axisLabel: 'Government revenue per person (excluding grants), 2015 PPP$',
    indicator: 'revenuePerPerson',

    axisMinimum: -1e3,
    axisMaximum: 1.5e4,

    showGridlines: true,
  },

  verticalAxis: {
    showAxis: true,

    // Axis Label
    axisLabel: 'Number of people living in extreme poverty',
    indicator: 'numberInExtremePoverty',

    axisMinimum: -5e7,
    axisMaximum: 5e8,

    showGridlines: true,
  },

  bubble: {
    indicator: 'indicatorValue',
    minimum: 0,
    maximum: 200,
  },
};
