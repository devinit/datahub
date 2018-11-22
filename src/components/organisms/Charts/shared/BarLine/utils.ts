import { DataPoint } from '..';
import { groupBy } from 'lodash';

export const getSeriesSettingsFromData = (data: DataPoint[]) => {
  const groupedBySeries = groupBy(data, datum => datum.series);
  const seriesNames = Object.keys(groupedBySeries);
  const seriesSettings = seriesNames.map(name => {
    let match = data.find(datum => datum.series === name && !!(datum.attributes && datum.attributes.stroke));
    if (!match) {
      match = data.find(datum => !datum.series);
    }

    return {
      series: name !== 'undefined' ? name : 'Unnamed',
      colour: match && match.attributes ? `${match.attributes.stroke}` : ''
    };
  });

  return seriesSettings;
};

export const parseAxisMinMaxToDate = (axisValue: number | Date) =>
  typeof axisValue === 'number' ? new Date(Date.parse(axisValue + '')) : axisValue;
