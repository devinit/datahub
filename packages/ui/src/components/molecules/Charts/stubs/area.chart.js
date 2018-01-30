const config = {
  type: 'area',
  groupBy: 'Country',
  colors: ['#ba0c2f', '#93328e', '#b7bf10', '#004862'],
  linearAxis: {
    showAxis: true,
    indicator: 'Poverty',
    ticking: 'end',
  },
  categoryAxis: {
    showAxis: true,
    indicator: 'Year',
    ticking: 'end',
  },
};

const data = [
  { Country: 'UG', Poverty: 62.56, Year: '2000' },
  { Country: 'UG', Poverty: 62.52, Year: '2001' },
  { Country: 'UG', Poverty: 62.48, Year: '2002' },
  { Country: 'UG', Poverty: 60.0, Year: '2003' },
  { Country: 'UG', Poverty: 57.53, Year: '2004' },
  { Country: 'UG', Poverty: 55.05, Year: '2005' },
  { Country: 'UG', Poverty: 51.34, Year: '2006' },
  { Country: 'UG', Poverty: 47.63, Year: '2007' },
  { Country: 'UG', Poverty: 43.92, Year: '2008' },
  { Country: 'UG', Poverty: 42.14, Year: '2009' },
  { Country: 'UG', Poverty: 40.36, Year: '2010' },
  { Country: 'UG', Poverty: 36.99, Year: '2011' },
  { Country: 'UG', Poverty: 34.82, Year: '2012' },
  { Country: 'UG', Poverty: 34.64, Year: '2013' },
];

export default { config, data };
