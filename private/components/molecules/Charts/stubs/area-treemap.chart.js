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

const data = [
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 7158310239.093451,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 3799120960.238667,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 399007146.1093973,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2000',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 8020481615.182924,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 2357165514.4283204,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 209477182.80188376,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2001',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 7848665741.021127,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 1767089539.6771765,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 297717569.26881415,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2002',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 9639569121.479095,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 1733712953.3107038,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 418104766.06141484,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2003',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 10590276592.548264,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 1508715482.4535275,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 301360302.555827,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2004',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 13821684848.888954,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 1006480437.3138069,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 418435868.0515999,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2005',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 16470456634.160759,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 728416990.7295347,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 813344765.8593222,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2006',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 20112632841.101078,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 351835552.61015034,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 1525946903.7213604,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2007',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 14348123095.136219,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 263102225.32089558,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 299983097.02361345,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2008',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 13975986963.674894,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 144660913.79553252,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2009',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 16669729965.492737,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 328720279.824032,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 13866314048.571848,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2010',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 16480410704.259068,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 383671549.88737786,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 14539464947.449678,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2011',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 16359869806.864641,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 232704687.15521875,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 12082205.178032635,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 15496378897.531202,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2012',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 20879704656.632847,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 201305235.54367843,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 8705343658.324612,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 13673732685.920805,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2013',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oda-out',
    value: 22104085473.444008,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'oofs-out',
    value: 518373199.1567999,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 9536131773.460592,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 13319050126.781288,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  },
  {
    id: 'GB',
    year: '2014',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'out',
    flow_type: 'official',
    flow_name: 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'dfis'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'out',
    flow_type: 'commercial',
    flow_name: 'fdi-devcountries',
    value: 3398013750.9549,
    concept: 'intl-flows-donors',
    flow_category: 'fdi'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'in',
    flow_type: 'official',
    flow_name: 'oda-capital-repay',
    value: 19218820000,
    concept: 'intl-flows-donors',
    flow_category: 'oda'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'in',
    flow_type: 'official',
    flow_name: 'oofs-capital-repay',
    value: 0,
    concept: 'intl-flows-donors',
    flow_category: 'oofs'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'pda-out',
    value: 4385048480.75,
    concept: 'intl-flows-donors',
    flow_category: 'pda'
  },
  {
    id: 'GB',
    year: '2015',
    direction: 'out',
    flow_type: 'private',
    flow_name: 'remittances-devcountries',
    value: 15139108223.3654,
    concept: 'intl-flows-donors',
    flow_category: 'remittances'
  }
];

export default {config: {areaConfig, treemapConfig}, data};
