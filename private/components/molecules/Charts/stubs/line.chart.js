const config = {
  type: 'line',
  groupBy: 'flow-type',
  colors: ['#ba0c2f', '#93328e', '#b7bf10', '#004862'],
  linearAxis: {
    indicator: 'value',
    showAxis: true,
    ticking: 'odd',
    axisMinimum: 0,
  },
  categoryAxis: {
    indicator: 'year',
    showAxis: true,
    ticking: 'all',
  },
};

const data = [
  {
    year: '2000',
    'flow-type': 'official',
    value: 1550563175.9061928,
  },
  {
    year: '2000',
    'flow-type': 'commercial',
    value: 274119643.544919,
  },
  {
    year: '2000',
    'flow-type': 'private',
    value: 360819173.530645,
  },
  {
    year: '2001',
    'flow-type': 'official',
    value: 1364009416.8230696,
  },
  {
    year: '2001',
    'flow-type': 'commercial',
    value: 272800335.79748785,
  },
  {
    year: '2001',
    'flow-type': 'private',
    value: 569663142.677145,
  },
  {
    year: '2002',
    'flow-type': 'official',
    value: 1170684348.4147398,
  },
  {
    year: '2002',
    'flow-type': 'commercial',
    value: 381752271.2847154,
  },
  {
    year: '2002',
    'flow-type': 'private',
    value: 718261806.428443,
  },
  {
    year: '2003',
    'flow-type': 'official',
    value: 1553756416.6127555,
  },
  {
    year: '2003',
    'flow-type': 'commercial',
    value: 375805571.11353564,
  },
  {
    year: '2003',
    'flow-type': 'private',
    value: 498164870.579599,
  },
  {
    year: '2004',
    'flow-type': 'official',
    value: 1693993996.255575,
  },
  {
    year: '2004',
    'flow-type': 'commercial',
    value: 558759559.3271204,
  },
  {
    year: '2004',
    'flow-type': 'private',
    value: 444933874.886054,
  },
  {
    year: '2005',
    'flow-type': 'official',
    value: 1438728843.777582,
  },
  {
    year: '2005',
    'flow-type': 'commercial',
    value: 530875370.07905346,
  },
  {
    year: '2005',
    'flow-type': 'private',
    value: 436956787.575439,
  },
  {
    year: '2006',
    'flow-type': 'official',
    value: 5548811426.055255,
  },
  {
    year: '2006',
    'flow-type': 'commercial',
    value: 1176552672.0964146,
  },
  {
    year: '2006',
    'flow-type': 'private',
    value: 528691815.391469,
  },
  {
    year: '2007',
    'flow-type': 'official',
    value: 1781234860.051543,
  },
  {
    year: '2007',
    'flow-type': 'commercial',
    value: 885456326.575279,
  },
  {
    year: '2007',
    'flow-type': 'private',
    value: 504662699.758881,
  },
  {
    year: '2008',
    'flow-type': 'official',
    value: 2003944615.6503737,
  },
  {
    year: '2008',
    'flow-type': 'commercial',
    value: 1989733422.4387083,
  },
  {
    year: '2008',
    'flow-type': 'private',
    value: 697466432.691064,
  },
  {
    year: '2009',
    'flow-type': 'official',
    value: 2188709883.364566,
  },
  {
    year: '2009',
    'flow-type': 'commercial',
    value: 1196328360.297419,
  },
  {
    year: '2009',
    'flow-type': 'private',
    value: 756788845.39117,
  },
  {
    year: '2010',
    'flow-type': 'official',
    value: 2114090536.116424,
  },
  {
    year: '2010',
    'flow-type': 'commercial',
    value: 521505002.2429,
  },
  {
    year: '2010',
    'flow-type': 'private',
    value: 739089069.679324,
  },
  {
    year: '2011',
    'flow-type': 'official',
    value: 1655758725.5462089,
  },
  {
    year: '2011',
    'flow-type': 'commercial',
    value: 1187583939.794154,
  },
  {
    year: '2011',
    'flow-type': 'private',
    value: 800559387.75051,
  },
  {
    year: '2012',
    'flow-type': 'official',
    value: 2441946491.1747966,
  },
  {
    year: '2012',
    'flow-type': 'commercial',
    value: 1076657601.5367575,
  },
  {
    year: '2012',
    'flow-type': 'private',
    value: 788136373.557356,
  },
  {
    year: '2013',
    'flow-type': 'official',
    value: 1967147160.6688018,
  },
  {
    year: '2013',
    'flow-type': 'commercial',
    value: 2339696485.806067,
  },
  {
    year: '2013',
    'flow-type': 'private',
    value: 812397265.923611,
  },
  {
    year: '2014',
    'flow-type': 'official',
    value: 1869736840.930511,
  },
  {
    year: '2014',
    'flow-type': 'commercial',
    value: 1066023033.8530264,
  },
  {
    year: '2014',
    'flow-type': 'private',
    value: 747983183.952756,
  },
  {
    year: '2015',
    'flow-type': 'official',
    value: 3091465000,
  },
  {
    year: '2015',
    'flow-type': 'commercial',
    value: 1387649519.4522276,
  },
  {
    year: '2015',
    'flow-type': 'private',
    value: 1049033152,
  },
];

export default { config, data };
