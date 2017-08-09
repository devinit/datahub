// @flow
import React from 'react';
import {graphql} from 'react-apollo';
import BubbleChart from 'components/molecules/BubbleChartWidgets';
import QUERY from './query.graphql';

const objectify = (list, groupFn) => {
  return list.reduce((all, d) => ({
    ...all,
    [groupFn(d)]: d,
  }), {});
};

const toDropdownOptions = (list: string[]) => {
  return list
    .filter(d => d)
    .map(d => {
      return {
        text: d.replace('-', ' '),
        value: d,
        key: d,
      };
    });
};

const toSentenceCase = d => d.split(/-/)
  .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
  .join(' ');

const toRadioOptions = (list: string[], colors: string[]) => {
  return list
    .filter(d => d)
    .map((d, i) => {
      return {
        name: d.split(/-/).map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`).join(' '),
        color: colors[i % colors.length],
      };
    });
};

const withData = graphql(QUERY, {
  options: (props) => ({
    variables: {
      indicator: '',
      fetchBubbleSize: false,
    }
  }),
  props: ({data, ownProps}) => {
    const {error, loading} = data;

    if (error) throw new Error(error);

    const [points] = [
      [
        objectify((data.bubbleChartPovverty && data.bubbleChartPovverty.revenuePerPerson) || [], d => `${d.year}-${d.id}`),
        objectify((data.bubbleChartPovverty && data.bubbleChartPovverty.percentageInExtremePoverty) || [], d => `${d.year}-${d.id}`),
        objectify(data.bubbleSize || [], d => `${d.year}-${d.id}`)
      ]
    ].map(([revenue, poverty, indicator]) => {
      return Object
        .keys({...revenue, ...poverty, ...indicator})
        .map(key => {
          return {
            ...(revenue[key] || {}),
            revenuePerPerson: revenue[key] && revenue[key].value,
            percentageInExtremePoverty: poverty[key] && poverty[key].value,
            indicatorValue: indicator[key] ? indicator[key].value : 11,
          };
        })
        .filter(d =>
          typeof d.revenuePerPerson === 'number' &&
          typeof d.percentageInExtremePoverty === 'number'
        );
    });

    const allData = [
      ...((data.bubbleChartPovverty && data.bubbleChartPovverty.revenuePerPerson) || []),
      ...((data.bubbleChartPovverty && data.bubbleChartPovverty.percentageInExtremePoverty) || []),
      ...(data.bubbleSize || [])
    ];

    const incomeGroups = toRadioOptions(
      Object.keys(objectify(allData, d => d.income_group)),
      ownProps.config.colors
    );

    const regions = toRadioOptions(
      Object.keys(objectify(allData, d => d.region)),
      ownProps.config.colors
    );

    const countries = toDropdownOptions(Object.keys(objectify(allData, d => d.name)));

    const indicators = (data.bubbleChartIndicatorsList || [])
      .map(({id, name}) => ({value: id, key: id, text: name}));

    return {
      loading,
      points,
      incomeGroups,
      regions,
      countries,
      indicators,
      colorables: [
        {text: 'region', value: 'region'},
        {text: 'income-group', value: 'income-group'}
      ]
    };
  }
});


export default withData(BubbleChart);
