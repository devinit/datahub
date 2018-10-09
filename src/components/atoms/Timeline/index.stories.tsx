import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TimeLine, { Props } from '.';
import config from '../../visbox/linePartition';
import data from './testData';

storiesOf('TimeLine', module).add('Timeline', () => {
  const props: Props = {
      data,
      height: '250px',
      width: '300px',
      config: {
          ...config.line,
          timeAxis: {
            ...config.line.timeAxis,
            axisMinimum: '2013',
            axisMaximum: '2018'
          },
          anchor: { start: '2013' }
      },
      onYearChanged: console.info
    };

  return <div style={ { padding: '5em' } }><TimeLine { ...props } /></div>;
});
