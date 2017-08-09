const config = {
  type: 'dual-sidebar',
  orientation: 'horizontal',
  groupBy: 'flow-type',
  subGroupBy: 'flow-group',
  splitBy: 'direction',
  colors: ['rgb(186, 12, 47)', 'rgb(0, 149, 200)', 'rgb(147, 50, 142)', 'rgb(234, 118, 0)', 'rgb(27, 54, 93)'],
  showLabels: true,
  linearAxis: {
    showAxis: true,
    indicator: 'value',
    ticking: 'odd'
  },
  categoryAxis: {
    showAxis: true,
    indicator: 'flow-name',
    innerPadding: 1.5,
    outerPadding: 1,
  }
};

const data = [
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 6459886583.87196,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 6956985491.00185,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 7017019406.0603285,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 7999063883.558006,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 8809133332.177177,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 11707934401.589764,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 13149662014.534489,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 10462270828.687757,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 11582213323.042606,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 12609445040.637808,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 14426314980.947468,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 14401018808.635235,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 14430967849.500216,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 18377992133.317646,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 18697399669.0104,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 69842365.52214941,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 177249354.03017935,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 136078787.9753905,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 203882606.09030738,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 294716155.5356173,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 352291741.2165322,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 551967279.9458752,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 1588848249.0141025,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 460984962.0156013,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 227756987.17284796,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 373902497.4242109,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 346565315.937305,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 321483659.5607371,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 416952087.2192007,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 567780967.4056,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 2528934.518076212,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 69534933.56320737,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 2141054.52623042,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 1498489.9918361525,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 19545419.72144986,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 252644574.0011749,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 365390466.8675421,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 247904679.34300092,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 300292018.8653215,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 73266885.88760497,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 54902745.17173488,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 11012392.893024074,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 17025752.3540438,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 14467431.047565233,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 8428127.886130251,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 29400199.253297247,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 20209282.400518913,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 64472732.1536714,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 189486216.22269168,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 107076763.1856,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 43657349.35946804,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 5289896.245333009,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 354647638.62374914,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 331962507.9267964,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 253197476.7223626,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 238903489.07423034,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 239241432.7609871,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 158596282.0236787,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 75910083.61328375,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 55801633.376017764,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 36149236.133555375,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 22705464.31823371,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 49886680.095122464,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 60577044.58114317,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 28038659.166924555,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 1969836.5534978025,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 68549405.9952,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 399007146.1093973,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 209477182.80188376,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 297717569.26881415,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 418104766.06141484,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 301360302.555827,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 418435868.0515999,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 813344765.8593222,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 1525946903.7213604,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 299983097.02361345,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 12082205.178032635,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 8705343658.324612,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 9536131773.460592,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 13866314048.571848,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 14539464947.449678,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 15496378897.531202,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 13673732685.920805,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 13319050126.781288,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  },
  {
    id: 'GB',
    year: 2000,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2001,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2002,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2003,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2004,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2005,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2006,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2007,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2008,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2009,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2010,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2011,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2012,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2013,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2014,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'dfis-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'dfis'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'commercial',
    'flow-name': 'fdi-devcountries',
    value: 3398013750.9549,
    concept: 'intl-flows-donors',
    'flow-group': 'fdi'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-capital-repay',
    value: 131240000,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oda-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oda-out',
    value: 18676160000,
    concept: 'intl-flows-donors',
    'flow-group': 'oda'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-capital-repay',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'oofs-interest',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'official',
    'flow-name': 'oofs-out',
    value: 0,
    concept: 'intl-flows-donors',
    'flow-group': 'oofs'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'pda-out',
    value: 4385048480.75,
    concept: 'intl-flows-donors',
    'flow-group': 'pda'
  },
  {
    id: 'GB',
    year: 2015,
    direction: 'out',
    'flow-type': 'private',
    'flow-name': 'remittances-devcountries',
    value: 15139108223.3654,
    concept: 'intl-flows-donors',
    'flow-group': 'remittances'
  }
];

export default {config, data};
