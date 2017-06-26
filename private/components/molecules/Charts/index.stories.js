import React from 'react';
import {storiesOf} from '@storybook/react';
import Chart from '../../atoms/Chart';

import donut from './stubs/donut.chart';
import line from './stubs/line.chart';
import histogram from './stubs/histogram.chart';
import area from './stubs/area.chart';
import govtrfeStub from './stubs/line-partition.chart';
import inflowsOutflowsStub from './stubs/sidebar.chart';
import internationalResources from './stubs/area-treemap.chart';

import GovtRFE from '../RevenueFinanceExpenditure/index';
import InflowsOutFlows from '../InflowsVsOutflows/index';
import InternationalResources from '../InternationalResources/index';

const chartStories = storiesOf('Chart DontTest', module)
  .add('How have resource in flows changed over time?', () =>
    <Chart config={line.config} data={line.data} height="150px" />
  )
  .add('What is the mix of resources?', () =>
    <Chart config={donut.config} data={donut.data} height="150px" />
  )
  .add('How is income distributed?', () =>
    <Chart config={histogram.config} data={histogram.data} height="120px" />
  )
  .add('Is Poverty reducing over time?', () =>
    <Chart config={area.config} data={area.data} height="120px" />
  )
  .add('Inflow Vs Outflows', () => (
    <InflowsOutFlows
      startYear={2010}
      data={inflowsOutflowsStub.data}
      config={inflowsOutflowsStub.config}
    />
  ))
  .add('International Resources', () => (
    <InternationalResources
      startYear="2015"
      data={internationalResources.data}
      config={internationalResources.config}
    />
  ))
  .add('Revenue, financing and expenditure', () => (
    <GovtRFE
      startYear={2014}
      revenueLevel="total-revenue-and-grants"
      financeLevel="financing"
      expenditureLevel="total-expenditure"
      currencies={['Constant US$', 'Current UGX']}
      data={govtrfeStub.data}
      config={{line: govtrfeStub.lineConfig, partition: govtrfeStub.partitionConfig}}
    />
  ));

export default chartStories;
