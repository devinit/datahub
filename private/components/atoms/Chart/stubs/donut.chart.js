import React from 'react';
import Chart from '../index';

const config = {
  type: 'pie',
  groupBy: 'Country',
  colors: ['rgb(186, 12, 47)', 'rgb(0, 149, 200)', 'rgb(212, 217, 112)', 'rgb(190, 132, 187)', 'rgb(234, 118, 0)', 'rgb(183, 191, 16)', 'rgb(27, 54, 93)'],
  circular: {
    label: 'flow-name',
    value: 'value',
    innerRadius: 40,
    strokeWidth: 0,
    strokeColor: '#fff',
  },
  legend: {
    showLegend: true,
    symbol: 'circle',
    position: 'right',
    alignment: 'left',
    rowSpan: 1,
  }
};

const data = [
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'Other Official Flows',
    value: 36640000,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'commercial',
    'flow-name': 'Long-term commercial debt',
    value: 0,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'commercial',
    'flow-name': 'Short-term commercial debt',
    value: 110026000,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'Long-term debt (official sources)',
    value: 429365000,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'official',
    'flow-name': 'Official Development Assistance',
    value: 1693450000,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'commercial',
    'flow-name': 'Portfolio Equity',
    value: 90173.1507425804,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'private',
    'flow-name': 'Remittances',
    value: 1049033152,
    concept: 'intl-flows-recipients'
  },
  {
    id: 'UG',
    year: 2015,
    direction: 'in',
    'flow-type': 'commercial',
    'flow-name': 'Foreign Direct Investment',
    value: 1057301000,
    concept: 'intl-flows-recipients'
  }
];

export default {config, data};
