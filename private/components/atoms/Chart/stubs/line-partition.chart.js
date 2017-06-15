const lineConfig = {
  title: '',
  type: 'line',
  colors: ['#0095cb'],
  linearAxis: {
    indicator: 'value',
    showGridlines: true,
  },
  categoryAxis: {
    indicator: 'year',
  }
};

const partitionConfig = {
  title: '',
  type: 'partition',
  colors: ['#0095cb'],
  orientation: 'horizontal',
  tree: {
    id: 'id',
    parent: 'parent',
    value: 'value'
  }
};

const data = [
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 162690362.6,
    valueNcu: 1580000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 95858194.6,
    valueNcu: 928000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 18799775.23,
    valueNcu: 182000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 32331481.58,
    valueNcu: 313000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'financing',
    value: 88834102.76,
    valueNcu: 860000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 55986143.83,
    valueNcu: 542000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 109389901,
    valueNcu: 1060000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 53300461.65,
    valueNcu: 516000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 28406253.79,
    valueNcu: 275000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 100919672.5,
    valueNcu: 977000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2000,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 29542503.94,
    valueNcu: 286000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 3202159.518,
    valueNcu: 31000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 53713643.53,
    valueNcu: 520000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 24790912.4,
    valueNcu: 240000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 40491823.58,
    valueNcu: 392000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -12808638.07,
    valueNcu: -124000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 38632505.15,
    valueNcu: 374000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 13531706.35,
    valueNcu: 131000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 80880351.69,
    valueNcu: 783000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 10846024.17,
    valueNcu: 105000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 27166708.17,
    valueNcu: 263000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 33880913.61,
    valueNcu: 328000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 24481025.99,
    valueNcu: 237000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 3512045.923,
    valueNcu: 34000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 9813069.49,
    valueNcu: 95000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 5991137.163,
    valueNcu: 58000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 59291598.82,
    valueNcu: 574000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 246772873.8,
    valueNcu: 2390000000000
  },
  {
    year: 2000,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 52474097.91,
    valueNcu: 508000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 28406253.79,
    valueNcu: 275000000000
  },
  {
    year: 2000,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2000,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 34397390.95,
    valueNcu: 333000000000
  },
  {
    year: 2000,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
    value: 4441705.138,
    valueNcu: 43000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'financing',
    value: 35950557.45,
    valueNcu: 351000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 4711469.068,
    valueNcu: 46000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 116557647.8,
    valueNcu: 1140000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 34721478.56,
    valueNcu: 339000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 34311785.6,
    valueNcu: 335000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 61863637.32,
    valueNcu: 604000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 196038082.5,
    valueNcu: 1910000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 223282664.5,
    valueNcu: 2180000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -12905328.32,
    valueNcu: -126000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 44451686.42,
    valueNcu: 434000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 96175422.92,
    valueNcu: 939000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 42915337.81,
    valueNcu: 419000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 14441676.92,
    valueNcu: 141000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2001,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 37077213.1,
    valueNcu: 362000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: -5838124.714,
    valueNcu: -57000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 105393514.6,
    valueNcu: 1030000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 15261062.85,
    valueNcu: 149000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 37589329.3,
    valueNcu: 367000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -2765427.496,
    valueNcu: -27000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 12802905.07,
    valueNcu: 125000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 115533415.4,
    valueNcu: 1130000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 43939570.22,
    valueNcu: 429000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 80504667.11,
    valueNcu: 786000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 22942805.89,
    valueNcu: 224000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 28780930.61,
    valueNcu: 281000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -1126655.647,
    valueNcu: -11000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 6042971.195,
    valueNcu: 59000000000
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 59303056.31,
    valueNcu: 579000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 10139900.82,
    valueNcu: 99000000000
  },
  {
    year: 2001,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2001,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 13315021.28,
    valueNcu: 130000000000
  },
  {
    year: 2001,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 33287553.19,
    valueNcu: 325000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 45504372.11,
    valueNcu: 432000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 57617804.5,
    valueNcu: 547000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 516137.5541,
    valueNcu: 4900000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 264810165.5,
    valueNcu: 2510000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 36972302.34,
    valueNcu: 351000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 12324100.78,
    valueNcu: 117000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 75313949.22,
    valueNcu: 715000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 103122176.6,
    valueNcu: 979000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2002,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: -8015932.217,
    valueNcu: -76100000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 121766329.1,
    valueNcu: 1160000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 11597294.84,
    valueNcu: 110000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 29914911.3,
    valueNcu: 284000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2002,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 2212018.089,
    valueNcu: 21000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 38341646.87,
    valueNcu: 364000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 76936095.81,
    valueNcu: 730000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 58671146.45,
    valueNcu: 557000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 10322751.08,
    valueNcu: 98000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 149574556.5,
    valueNcu: 1420000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 207403029.4,
    valueNcu: 1970000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 14852121.45,
    valueNcu: 141000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2002,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -5793380.709,
    valueNcu: -55000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 36761633.95,
    valueNcu: 349000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2002,
    type: 'financing',
    id: 'financing',
    value: 44345695.97,
    valueNcu: 421000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 132089080.2,
    valueNcu: 1250000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -12956105.95,
    valueNcu: -123000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 50139076.68,
    valueNcu: 476000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 38025644.29,
    valueNcu: 361000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 21909512.5,
    valueNcu: 208000000000
  },
  {
    year: 2002,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 4424036.178,
    valueNcu: 42000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 41396338.52,
    valueNcu: 393000000000
  },
  {
    year: 2002,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 57786339.22,
    valueNcu: 549000000000
  },
  {
    year: 2002,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -1459203.034,
    valueNcu: -13000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 40520945.8,
    valueNcu: 361000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 160961319.3,
    valueNcu: 1430000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 52643555.63,
    valueNcu: 469000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 311483724.7,
    valueNcu: 2780000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -10326667.63,
    valueNcu: -92000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 93164501.43,
    valueNcu: 830000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 131103780.3,
    valueNcu: 1170000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 175665596.1,
    valueNcu: 1570000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 6173551.3,
    valueNcu: 55000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 150185666.2,
    valueNcu: 1340000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 75429572.24,
    valueNcu: 672000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 8193986.27,
    valueNcu: 73000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -2132681.358,
    valueNcu: -19000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 87664428.45,
    valueNcu: 781000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 254125820.8,
    valueNcu: 2260000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 68582542.62,
    valueNcu: 611000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 10775653.18,
    valueNcu: 96000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 19418625,
    valueNcu: 173000000000
  },
  {
    year: 2003,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 55674208.08,
    valueNcu: 496000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2003,
    type: 'financing',
    id: 'financing',
    value: 55449715.31,
    valueNcu: 494000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 52306816.47,
    valueNcu: 466000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 57582396.67,
    valueNcu: 513000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 15041015.89,
    valueNcu: 134000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 40408699.42,
    valueNcu: 360000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 69256020.94,
    valueNcu: 617000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -16051233.38,
    valueNcu: -143000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 28847321.53,
    valueNcu: 257000000000
  },
  {
    year: 2003,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 4265362.716,
    valueNcu: 38000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 39286235.54,
    valueNcu: 350000000000
  },
  {
    year: 2003,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 43663844.65,
    valueNcu: 389000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 150522831.2,
    valueNcu: 1250000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 52925808.55,
    valueNcu: 439000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 86293650.96,
    valueNcu: 716000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
    value: 7133897.691,
    valueNcu: 59200000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 103790981.1,
    valueNcu: 861000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 139219459.5,
    valueNcu: 1160000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 186843046.8,
    valueNcu: 1550000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 4073069.965,
    valueNcu: 33800000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 98356204.31,
    valueNcu: 816000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -36995043.77,
    valueNcu: -307000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 82304934.51,
    valueNcu: 683000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 31548216.48,
    valueNcu: 262000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 12894038.06,
    valueNcu: 107000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 16304330.36,
    valueNcu: 135000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 224778029.8,
    valueNcu: 1870000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 201146993.7,
    valueNcu: 1670000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 63988170.17,
    valueNcu: 531000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2004,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -24101005.71,
    valueNcu: -200000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 6868786.628,
    valueNcu: 57000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 52166626.87,
    valueNcu: 433000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 52648646.98,
    valueNcu: 437000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 14303946.89,
    valueNcu: 119000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 9785008.319,
    valueNcu: 81200000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 351669824.9,
    valueNcu: 2920000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 51503849.21,
    valueNcu: 427000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 36127407.56,
    valueNcu: 300000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'financing',
    value: 12026401.85,
    valueNcu: 99800000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 44623012.08,
    valueNcu: 370000000000
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2004,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 53889848.77,
    valueNcu: 447000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 1903979.451,
    valueNcu: 15800000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -17280421.1,
    valueNcu: -143000000000
  },
  {
    year: 2004,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 377855567.6,
    valueNcu: 3140000000000
  },
  {
    year: 2004,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2004,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 48331399.57,
    valueNcu: 387000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -32470707.72,
    valueNcu: -260000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 403635874.5,
    valueNcu: 3230000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 23229044.76,
    valueNcu: 186000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 15111367.83,
    valueNcu: 121000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 75931501.14,
    valueNcu: 608000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 148241269.5,
    valueNcu: 1190000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 149615030.2,
    valueNcu: 1200000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 247027153.4,
    valueNcu: 1980000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 87421136.18,
    valueNcu: 700000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 101283630.6,
    valueNcu: 811000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 96662799.15,
    valueNcu: 774000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 69936908.95,
    valueNcu: 560000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 28599200.27,
    valueNcu: 229000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -20231748.66,
    valueNcu: -162000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 60820133.31,
    valueNcu: 487000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 35592891.16,
    valueNcu: 285000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 121765154,
    valueNcu: 975000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 499549.3496,
    valueNcu: 4000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 62193894.03,
    valueNcu: 498000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -9241662.968,
    valueNcu: -74000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 15860691.85,
    valueNcu: 127000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'financing',
    value: 6619028.882,
    valueNcu: 53000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -999098.6992,
    valueNcu: -8000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 1373760.711,
    valueNcu: 11000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 392895563.5,
    valueNcu: 3150000000000
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2005,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 9366550.305,
    valueNcu: 75000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 243280533.3,
    valueNcu: 1950000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 228294052.8,
    valueNcu: 1830000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 34219130.45,
    valueNcu: 274000000000
  },
  {
    year: 2005,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 20231748.66,
    valueNcu: 162000000000
  },
  {
    year: 2005,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2005,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 132061685.4,
    valueNcu: 974000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 151450618.7,
    valueNcu: 1120000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 56404169.54,
    valueNcu: 416000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 100063166.2,
    valueNcu: 738000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 16948368.25,
    valueNcu: 125000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 117553882.2,
    valueNcu: 867000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 126773794.5,
    valueNcu: 935000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 70369624.98,
    valueNcu: 519000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 307375606.6,
    valueNcu: 2270000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 302765650.5,
    valueNcu: 2230000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'financing',
    value: -11796064.3,
    valueNcu: -87000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -18304237.71,
    valueNcu: -135000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2006,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -27659736.99,
    valueNcu: -204000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 15999259.63,
    valueNcu: 118000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 31998519.26,
    valueNcu: 236000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -3932021.435,
    valueNcu: -29000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -20202454.96,
    valueNcu: -149000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2006,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: -9355499.275,
    valueNcu: -69000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 33761149.56,
    valueNcu: 249000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -6779347.301,
    valueNcu: -50000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 42981061.89,
    valueNcu: 317000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 94368514.43,
    valueNcu: 696000000000
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 437945835.6,
    valueNcu: 3230000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 290427238.4,
    valueNcu: 2140000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 439437292,
    valueNcu: 3240000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2006,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 12338412.09,
    valueNcu: 91000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2006,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 10304607.9,
    valueNcu: 76000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 88538275.75,
    valueNcu: 653000000000
  },
  {
    year: 2006,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2006,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 32676453.99,
    valueNcu: 241000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 76877798.39,
    valueNcu: 567000000000
  },
  {
    year: 2006,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 30778236.75,
    valueNcu: 227000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 26582093.34,
    valueNcu: 181000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 21148184.76,
    valueNcu: 144000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -15273688.99,
    valueNcu: -104000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -5580770.977,
    valueNcu: -38000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 140547311.2,
    valueNcu: 957000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 144953183,
    valueNcu: 987000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 121748924.7,
    valueNcu: 829000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 564539043.1,
    valueNcu: 3840000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -82536665.51,
    valueNcu: -562000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2007,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2007,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 36568736.14,
    valueNcu: 249000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 179172120.9,
    valueNcu: 1220000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 6755670.13,
    valueNcu: 46000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 95901143.37,
    valueNcu: 653000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 113965217.9,
    valueNcu: 776000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 52429874.71,
    valueNcu: 357000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -30106790.8,
    valueNcu: -205000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 114846392.2,
    valueNcu: 782000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 55660847.38,
    valueNcu: 379000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'financing',
    value: 25554056.58,
    valueNcu: 174000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 34659525.02,
    valueNcu: 236000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 104859749.4,
    valueNcu: 714000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 358637966.5,
    valueNcu: 2440000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 22176221.52,
    valueNcu: 151000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 370680682.8,
    valueNcu: 2520000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 39799708.81,
    valueNcu: 271000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 176969184.9,
    valueNcu: 1210000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 38331084.87,
    valueNcu: 261000000000
  },
  {
    year: 2007,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 72109435.52,
    valueNcu: 491000000000
  },
  {
    year: 2007,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 76368444.95,
    valueNcu: 520000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 391682005.2,
    valueNcu: 2670000000000
  },
  {
    year: 2007,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 532229316.4,
    valueNcu: 3620000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 111492037.5,
    valueNcu: 656000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 176585711.8,
    valueNcu: 1040000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 31442114.23,
    valueNcu: 185000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 489647195.2,
    valueNcu: 2880000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 249157510.6,
    valueNcu: 1470000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -30082455.24,
    valueNcu: -177000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -14786291.56,
    valueNcu: -87000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -2209445.865,
    valueNcu: -13000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 79879965.89,
    valueNcu: 470000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 745093128.6,
    valueNcu: 4380000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 20564842.28,
    valueNcu: 121000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 187972855.9,
    valueNcu: 1110000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 146503256.6,
    valueNcu: 862000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -27703052,
    valueNcu: -163000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
    value: 2039488.491,
    valueNcu: 12000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 231481943.7,
    valueNcu: 1360000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'financing',
    value: 91946939.46,
    valueNcu: 541000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 52516828.64,
    valueNcu: 309000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2008,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 16825780.05,
    valueNcu: 99000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: -13256675.19,
    valueNcu: -78000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 109452549,
    valueNcu: 644000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 105033657.3,
    valueNcu: 618000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 35861005.96,
    valueNcu: 211000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 52346871.26,
    valueNcu: 308000000000
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 122029394.7,
    valueNcu: 718000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 138515260,
    valueNcu: 815000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2008,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 51667041.77,
    valueNcu: 304000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 513951099.7,
    valueNcu: 3020000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 645838022.1,
    valueNcu: 3800000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 119989906.2,
    valueNcu: 706000000000
  },
  {
    year: 2008,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 84128900.24,
    valueNcu: 495000000000
  },
  {
    year: 2008,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 534515942,
    valueNcu: 3150000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 94801145.77,
    valueNcu: 475000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 51292409.4,
    valueNcu: 257000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 236304329.7,
    valueNcu: 1180000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 157070529.9,
    valueNcu: 787000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 1038820976,
    valueNcu: 5210000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 236304329.7,
    valueNcu: 1180000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -11376137.49,
    valueNcu: -57000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -25147251.3,
    valueNcu: -126000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 349267379.2,
    valueNcu: 1750000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 71250545.35,
    valueNcu: 357000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: -81628776.05,
    valueNcu: -409000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 105977701.9,
    valueNcu: 531000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 907296860.4,
    valueNcu: 4550000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 218342007.3,
    valueNcu: 1090000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 95998633.93,
    valueNcu: 481000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 39517109.19,
    valueNcu: 198000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2009,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 656822254.2,
    valueNcu: 3290000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 336893334.9,
    valueNcu: 1690000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 710509639.9,
    valueNcu: 3560000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 56481524.75,
    valueNcu: 283000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -5787859.426,
    valueNcu: -29000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 13172369.73,
    valueNcu: 66000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 72048870.79,
    valueNcu: 361000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 750026749.1,
    valueNcu: 3760000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 118152164.8,
    valueNcu: 592000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 46502456.77,
    valueNcu: 233000000000
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2009,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 183814432.1,
    valueNcu: 921000000000
  },
  {
    year: 2009,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 240894700.9,
    valueNcu: 1210000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 102385237.4,
    valueNcu: 513000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'financing',
    value: 131324534.6,
    valueNcu: 658000000000
  },
  {
    year: 2009,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 148887694.2,
    valueNcu: 746000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 85639615.49,
    valueNcu: 396000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 44549900.99,
    valueNcu: 206000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 175388202.4,
    valueNcu: 811000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: -13408222.63,
    valueNcu: -62000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 186633808.5,
    valueNcu: 863000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 282870245.1,
    valueNcu: 1310000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 1478364675,
    valueNcu: 6840000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 161979979.8,
    valueNcu: 749000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 294332112.8,
    valueNcu: 1360000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -8001681.245,
    valueNcu: -37000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 287411739.9,
    valueNcu: 1330000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -23788782.08,
    valueNcu: -110000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 565307966.9,
    valueNcu: 2610000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 83476998.94,
    valueNcu: 386000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 100994193,
    valueNcu: 467000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2010,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 169549137.7,
    valueNcu: 784000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 51037750.64,
    valueNcu: 236000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 192256611.5,
    valueNcu: 889000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 499996947,
    valueNcu: 2310000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 221668196.7,
    valueNcu: 1030000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 931655210.9,
    valueNcu: 4310000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -5622803.037,
    valueNcu: -26000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 879536152,
    valueNcu: 4070000000000
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 54714198.78,
    valueNcu: 253000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2010,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 307740335.5,
    valueNcu: 1420000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 76124102.66,
    valueNcu: 352000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 198744461.2,
    valueNcu: 919000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 1110719861,
    valueNcu: 5140000000000
  },
  {
    year: 2010,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 924086053,
    valueNcu: 4270000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 147706710.6,
    valueNcu: 683000000000
  },
  {
    year: 2010,
    type: 'financing',
    id: 'financing',
    value: 331312855.9,
    valueNcu: 1530000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 218242816.6,
    valueNcu: 891000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 91853037.28,
    valueNcu: 375000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 61480299.62,
    valueNcu: 251000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 407582544.1,
    valueNcu: 1660000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -35761449.18,
    valueNcu: -146000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 57071353.83,
    valueNcu: 233000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 274579346.1,
    valueNcu: 1120000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 126144837.9,
    valueNcu: 515000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 152353571.2,
    valueNcu: 622000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 1214419624,
    valueNcu: 4960000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 428647507.3,
    valueNcu: 1750000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 2180223693,
    valueNcu: 8900000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 270660283.2,
    valueNcu: 1110000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 949148051.9,
    valueNcu: 3880000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -7348242.983,
    valueNcu: -30000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 383823225.1,
    valueNcu: 1570000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2011,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 115122473.4,
    valueNcu: 470000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 103855167.5,
    valueNcu: 424000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -1959531.462,
    valueNcu: -8000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 118306712,
    valueNcu: 483000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2011,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 134472846.6,
    valueNcu: 549000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 1768722086,
    valueNcu: 7220000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 255228972.9,
    valueNcu: 1040000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 679467534.5,
    valueNcu: 2770000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 111448351.9,
    valueNcu: 455000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 290500539.3,
    valueNcu: 1190000000000
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 1460585764,
    valueNcu: 5960000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 47518637.95,
    valueNcu: 194000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 172193827.2,
    valueNcu: 703000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2011,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 424238561.5,
    valueNcu: 1730000000000
  },
  {
    year: 2011,
    type: 'financing',
    id: 'financing',
    value: 405133129.8,
    valueNcu: 1650000000000
  },
  {
    year: 2011,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 1550479269,
    valueNcu: 6330000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: -343263632.5,
    valueNcu: -1240000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 71582351.71,
    valueNcu: 259000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 314243760.2,
    valueNcu: 1140000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 348791227.2,
    valueNcu: 1260000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 5527594.726,
    valueNcu: 20000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 2565080333,
    valueNcu: 9280000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 530925473.5,
    valueNcu: 1920000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -53341289.11,
    valueNcu: -193000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 506327676.9,
    valueNcu: 1830000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 108340856.6,
    valueNcu: 392000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 160576626.8,
    valueNcu: 581000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 166656981,
    valueNcu: 603000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 1653579962,
    valueNcu: 5980000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 2147746931,
    valueNcu: 7770000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2012,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 53064909.37,
    valueNcu: 192000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 34823846.78,
    valueNcu: 126000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 470121931.5,
    valueNcu: 1700000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 153667133.4,
    valueNcu: 556000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 870596169.4,
    valueNcu: 3150000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 139019007.4,
    valueNcu: 503000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 1543304448,
    valueNcu: 5580000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2012,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -2763797.363,
    valueNcu: -10000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 485322817,
    valueNcu: 1760000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 291857001.6,
    valueNcu: 1060000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 76833566.7,
    valueNcu: 278000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 323640671.2,
    valueNcu: 1170000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 583714003.1,
    valueNcu: 2110000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 399645098.7,
    valueNcu: 1450000000000
  },
  {
    year: 2012,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 1833503171,
    valueNcu: 6630000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 955721128.2,
    valueNcu: 3460000000000
  },
  {
    year: 2012,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: -10778809.72,
    valueNcu: -39000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'financing',
    value: 329168266,
    valueNcu: 1190000000000
  },
  {
    year: 2012,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2012,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 379745757.7,
    valueNcu: 1370000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 45069198.23,
    valueNcu: 158000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 144906029.7,
    valueNcu: 508000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 266992212.3,
    valueNcu: 936000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 253870800.1,
    valueNcu: 890000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 788140472.8,
    valueNcu: 2760000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 86715419.38,
    valueNcu: 304000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 189975228,
    valueNcu: 666000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 3001665652,
    valueNcu: 10500000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 116666468.8,
    valueNcu: 409000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 616135874.5,
    valueNcu: 2160000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 616991618.8,
    valueNcu: 2160000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 210513090.5,
    valueNcu: 738000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 56764369.92,
    valueNcu: 199000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -2852480.901,
    valueNcu: -10000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 1998162871,
    valueNcu: 7010000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 2351870502,
    valueNcu: 8250000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 404481791.7,
    valueNcu: 1420000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 671188755.9,
    valueNcu: 2350000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -57049618.01,
    valueNcu: -200000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 1658147147,
    valueNcu: 5810000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1208596158,
    valueNcu: 4240000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 170863605.9,
    valueNcu: 599000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 2084878290,
    valueNcu: 7310000000000
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 17970629.67,
    valueNcu: 63000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2013,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 591604538.8,
    valueNcu: 2070000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 92420381.18,
    valueNcu: 324000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 464383890.6,
    valueNcu: 1630000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 738222057.1,
    valueNcu: 2590000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 418173700,
    valueNcu: 1470000000000
  },
  {
    year: 2013,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 371678261.3,
    valueNcu: 1300000000000
  },
  {
    year: 2013,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2013,
    type: 'financing',
    id: 'financing',
    value: 594457019.7,
    valueNcu: 2080000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 98106200.58,
    valueNcu: 334000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -65707655.9,
    valueNcu: -224000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 53488440.5,
    valueNcu: 182000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -62271001.57,
    valueNcu: -212000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -7255159.145,
    valueNcu: -24700000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -8811934.184,
    valueNcu: -30000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2014,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 56102647.64,
    valueNcu: 191000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 462920275.8,
    valueNcu: 1580000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 150096612.3,
    valueNcu: 511000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 267207217.6,
    valueNcu: 910000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 867623039.8,
    valueNcu: 2950000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 754889028.5,
    valueNcu: 2570000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2014,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2014,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 546927381.7,
    valueNcu: 1860000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 62535359.59,
    valueNcu: 213000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 183288231,
    valueNcu: 624000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 273169959.7,
    valueNcu: 930000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 3822881407,
    valueNcu: 13000000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 3431954634,
    valueNcu: 11700000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 206199259.9,
    valueNcu: 702000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 190044047.2,
    valueNcu: 647000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 204671858,
    valueNcu: 697000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 288326486.5,
    valueNcu: 982000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 219417161.2,
    valueNcu: 747000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 1969761021,
    valueNcu: 6710000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 470616031.7,
    valueNcu: 1600000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 2522592399,
    valueNcu: 8590000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 2300208553,
    valueNcu: 7830000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 839747954.6,
    valueNcu: 2860000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 809523020.4,
    valueNcu: 2760000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2014,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 363639150.7,
    valueNcu: 1240000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 700548767.6,
    valueNcu: 2390000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1912219091,
    valueNcu: 6510000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1450150636,
    valueNcu: 4940000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1198246810,
    valueNcu: 4080000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 1891041076,
    valueNcu: 6440000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 516085612.1,
    valueNcu: 1760000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 549570962,
    valueNcu: 1870000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 260539520.7,
    valueNcu: 887000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2014,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 543578846.7,
    valueNcu: 1850000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 331328725.3,
    valueNcu: 1130000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 716762726.5,
    valueNcu: 2440000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'financing',
    value: 1017543413,
    valueNcu: 3460000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 19621240.12,
    valueNcu: 66800000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 2604807745,
    valueNcu: 8870000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 543578846.7,
    valueNcu: 1850000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 526894918,
    valueNcu: 1790000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 713972280.7,
    valueNcu: 2430000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 900579673.6,
    valueNcu: 3070000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 286475980.3,
    valueNcu: 975000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 284919205.3,
    valueNcu: 970000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 6168353.929,
    valueNcu: 21000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 2843288057,
    valueNcu: 9680000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 887802369.1,
    valueNcu: 3020000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 984293048.4,
    valueNcu: 3350000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 331328725.3,
    valueNcu: 1130000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 2576080839,
    valueNcu: 8770000000000
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2014,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 5874622.79,
    valueNcu: 20000000000
  },
  {
    year: 2014,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 2398314754,
    valueNcu: 8170000000000
  },
  {
    year: 2014,
    type: 'financing',
    id: 'financing',
    value: 723459796.5,
    valueNcu: 2460000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 946152270,
    valueNcu: 3070000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -1234380,
    valueNcu: -4000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 646197930,
    valueNcu: 2090000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 1023918210,
    valueNcu: 3320000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -40240788,
    valueNcu: -130000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 358217076,
    valueNcu: 1160000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 124980975,
    valueNcu: 405000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 315569247,
    valueNcu: 1020000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 21262195.5,
    valueNcu: 68900000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 336831442.5,
    valueNcu: 1090000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -78383130,
    valueNcu: -254000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 4953998973,
    valueNcu: 16100000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 258602610,
    valueNcu: 838000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -2684776.5,
    valueNcu: -8700000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 656690160,
    valueNcu: 2130000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 37031400,
    valueNcu: 120000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 2944613490,
    valueNcu: 9540000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 306434835,
    valueNcu: 993000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 1049840190,
    valueNcu: 3400000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 139484940,
    valueNcu: 452000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2015,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 470329639.5,
    valueNcu: 1520000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 287301945,
    valueNcu: 931000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1003365783,
    valueNcu: 3250000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 86406600,
    valueNcu: 280000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 2266661135,
    valueNcu: 7350000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 2892152340,
    valueNcu: 9370000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 766241385,
    valueNcu: 2480000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 3408431775,
    valueNcu: 11000000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 79617510,
    valueNcu: 258000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 775560954,
    valueNcu: 2510000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 961890615,
    valueNcu: 3120000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1825370285,
    valueNcu: 5920000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 275575335,
    valueNcu: 893000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 397470360,
    valueNcu: 1290000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 3121129830,
    valueNcu: 10100000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 207684435,
    valueNcu: 673000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2015,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 776764474.5,
    valueNcu: 2520000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 3353964758,
    valueNcu: 10900000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 822004501.5,
    valueNcu: 2660000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2015,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 368771025,
    valueNcu: 1200000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 596514135,
    valueNcu: 1930000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'financing',
    value: 1598491241,
    valueNcu: 5180000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 899338408.5,
    valueNcu: 2910000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 851413605,
    valueNcu: 2760000000000
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 3017133315,
    valueNcu: 9780000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1613951850,
    valueNcu: 5230000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 363216315,
    valueNcu: 1180000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1017129120,
    valueNcu: 3300000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2015,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 17589915,
    valueNcu: 57000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 283598805,
    valueNcu: 919000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 374325735,
    valueNcu: 1210000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 1033145201,
    valueNcu: 3350000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 4437287505,
    valueNcu: 14400000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 381114825,
    valueNcu: 1240000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 1147047615,
    valueNcu: 3720000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 363216315,
    valueNcu: 1180000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 506435254.5,
    valueNcu: 1640000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 69433875,
    valueNcu: 225000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 821726766,
    valueNcu: 2660000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 334177525.5,
    valueNcu: 1080000000000
  },
  {
    year: 2015,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 864652330.5,
    valueNcu: 2800000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2015,
    type: 'financing',
    id: 'financing',
    value: 1049840190,
    valueNcu: 3400000000000
  },
  {
    year: 2015,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 2372786955,
    valueNcu: 7690000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 415110707.5,
    valueNcu: 1280000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1146108952,
    valueNcu: 3520000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 1259646285,
    valueNcu: 3870000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 177300419.7,
    valueNcu: 545000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -104102998.7,
    valueNcu: -320000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 110609436.2,
    valueNcu: 340000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 748240303.5,
    valueNcu: 2300000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 300272087,
    valueNcu: 923000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 262860071.8,
    valueNcu: 808000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 1145783630,
    valueNcu: 3520000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 39363946.4,
    valueNcu: 121000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 3524211829,
    valueNcu: 10800000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 775567340.6,
    valueNcu: 2380000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 317514146.2,
    valueNcu: 976000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 498393106.5,
    valueNcu: 1530000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 500019715.8,
    valueNcu: 1540000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 373144186.1,
    valueNcu: 1150000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 1921676292,
    valueNcu: 5910000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 350046333.3,
    valueNcu: 1080000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 811352746.4,
    valueNcu: 2490000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 3741201517,
    valueNcu: 11500000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 20495277.88,
    valueNcu: 63000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 5441658937,
    valueNcu: 16700000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 617786233.2,
    valueNcu: 1900000000000
  },
  {
    year: 2016,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 4114345703,
    valueNcu: 12600000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 1470454857,
    valueNcu: 4520000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 915455745.2,
    valueNcu: 2810000000000
  },
  {
    year: 2016,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2016,
    type: 'financing',
    id: 'financing',
    value: 1429138980,
    valueNcu: 4390000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 38713302.66,
    valueNcu: 119000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 2982876236,
    valueNcu: 9170000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 547191387.1,
    valueNcu: 1680000000000
  },
  {
    year: 2016,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 964904669.6,
    valueNcu: 2970000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -126557619.7,
    valueNcu: -373000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 6943364959,
    valueNcu: 20500000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 429888751.1,
    valueNcu: 1270000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 847223529.2,
    valueNcu: 2500000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 3071991123,
    valueNcu: 9050000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 1482726000,
    valueNcu: 4370000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 4215420555,
    valueNcu: 12400000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 202560050.8,
    valueNcu: 597000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: -1357186.27,
    valueNcu: -4000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 1797253918,
    valueNcu: 5300000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 582911503.1,
    valueNcu: 1720000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 74645244.86,
    valueNcu: 220000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 1629980711,
    valueNcu: 4800000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 3294569671,
    valueNcu: 9710000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 1669339112,
    valueNcu: 4920000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 43429960.65,
    valueNcu: 128000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 229364479.7,
    valueNcu: 676000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 5044661366,
    valueNcu: 14900000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 95681632.05,
    valueNcu: 282000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 710147715.9,
    valueNcu: 2090000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 1340221442,
    valueNcu: 3950000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2017,
    type: 'financing',
    id: 'financing',
    value: 1898703592,
    valueNcu: 5600000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 1412491611,
    valueNcu: 4160000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 23411463.16,
    valueNcu: 69000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1442010412,
    valueNcu: 4250000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 938833602.4,
    valueNcu: 2770000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 54626747.38,
    valueNcu: 161000000000
  },
  {
    year: 2017,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 154719234.8,
    valueNcu: 456000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 742380889.8,
    valueNcu: 2190000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 1139697170,
    valueNcu: 3360000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2017,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
    value: 239882673.3,
    valueNcu: 707000000000
  },
  {
    year: 2017,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 522177417.5,
    valueNcu: 1540000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 4461749863,
    valueNcu: 13200000000000
  },
  {
    year: 2017,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 487229871,
    valueNcu: 1440000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'international-trade-taxes',
    parent: 'tax-revenue',
    value: 567416793.3,
    valueNcu: 1610000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'grants',
    parent: 'total-revenue-and-grants',
    value: 493666725,
    valueNcu: 1400000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'budget-support',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'nontax-revenue',
    parent: 'revenue',
    value: 263947612.8,
    valueNcu: 748000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'development-expenditure',
    parent: 'total-expenditure',
    value: 3276408536,
    valueNcu: 9290000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'other-expenditure',
    parent: 'total-expenditure',
    value: 56459382.41,
    valueNcu: 160000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'tax-revenue',
    parent: 'revenue',
    value: 5047468788,
    valueNcu: 14300000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'oil-revenue',
    parent: 'revenue',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'externally-financed',
    parent: 'development-expenditure',
    value: 1611915368,
    valueNcu: 4570000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'income-taxes',
    parent: 'tax-revenue',
    value: 1733303040,
    valueNcu: 4910000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'total-expenditure',
    value: 7580730702,
    valueNcu: 21500000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'amortization',
    parent: 'net-external-finance',
    value: -273828004.7,
    valueNcu: -776000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'wages-and-salaries',
    parent: 'recurrent-expenditure',
    value: 1252339676,
    valueNcu: 3550000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'other-external-financing',
    parent: 'net-external-finance',
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'other-recurrent',
    parent: 'recurrent-expenditure',
    value: 1542399753,
    valueNcu: 4370000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'concessional-project-loans',
    parent: 'disbursement',
    value: 539187102,
    valueNcu: 1530000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'domestically-financed',
    parent: 'development-expenditure',
    value: 1664140297,
    valueNcu: 4720000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'excises',
    parent: 'tax-revenue',
    value: 1149654174,
    valueNcu: 3260000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'recurrent-expenditure',
    parent: 'total-expenditure',
    value: 3748550121,
    valueNcu: 10600000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'net-external-finance',
    parent: 'financing',
    value: 1411484560,
    valueNcu: 4000000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'interest-payments',
    parent: 'recurrent-expenditure',
    value: 953810691.6,
    valueNcu: 2700000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'total-revenue-and-grants',
    value: 5805083126,
    valueNcu: 16500000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'budget-support-grants',
    parent: 'grants',
    value: 101274017.2,
    valueNcu: 287000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'nonconcessional-borrowing',
    parent: 'disbursement',
    value: 1144361107,
    valueNcu: 3240000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'net-lending',
    parent: 'total-expenditure',
    value: 499312663.2,
    valueNcu: 1420000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'valueadded-tax',
    parent: 'tax-revenue',
    value: 1562513408,
    valueNcu: 4430000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'financing',
    value: 1775294706,
    valueNcu: 5030000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'disbursement',
    parent: 'net-external-finance',
    value: 1683548209,
    valueNcu: 4770000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'bank-financing',
    parent: 'net-domestic-finance',
    value: 181022894.9,
    valueNcu: 513000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'revenue',
    parent: 'total-revenue-and-grants',
    value: 5311416401,
    valueNcu: 15100000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'project-grants',
    parent: 'grants',
    value: 392392707.8,
    valueNcu: 1110000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'revolving-credit',
    parent: 'disbursement',
    value: 0,
    valueNcu: 0
  },
  {
    year: 2018,
    type: 'financing',
    id: 'exceptional-financing',
    parent: 'net-external-finance',
    value: 2117226.841,
    valueNcu: 6000000000
  },
  {
    year: 2018,
    type: 'total-revenue-and-grants',
    id: 'infrastructure-levy',
    parent: 'tax-revenue',
    value: 34581371.73,
    valueNcu: 98000000000
  },
  {
    year: 2018,
    type: 'financing',
    id: 'net-domestic-finance',
    parent: 'financing',
    value: 363810145.4,
    valueNcu: 1030000000000
  },
  {
    year: 2018,
    type: 'total-expenditure',
    id: 'transfers-to-the-uganda-revenue-authority',
    parent: 'recurrent-expenditure',
  },
  {
    year: 2018,
    type: 'financing',
    id: 'nonbank-financing',
    parent: 'net-domestic-finance',
    value: 182787250.6,
    valueNcu: 518000000000
  }
];

export default {lineConfig, partitionConfig, data};
