import React from 'react';
import {storiesOf} from '@storybook/react';
import poverty from './poverty.story';
import resources from './resources.story';
import GovtRFE from './GovtRFE';
import InflowsOutFlows from './InflowsOutFlows';
import InternationalResources from './InternationalResources';
import govtrfeStub from './stubs/line-partition.chart';
import inflowsOutflowsStub from './stubs/sidebar.chart';
import internationalResources from './stubs/area-treemap.chart';

const chartStories = storiesOf('Chart DontTest', module)
  .add('Poverty', () => poverty)
  .add('International Resources', () => resources)
  .add('Government revenue, financing and expenditure', () => (
    <GovtRFE
      startYear="2016"
      data={govtrfeStub.data}
      config={{line: govtrfeStub.lineConfig, partition: govtrfeStub.partitionConfig}}
    />
  ))
  .add('Inflow Vs Outflows', () => (
    <InflowsOutFlows
      startYear={2010}
      data={inflowsOutflowsStub.data}
      config={inflowsOutflowsStub.config}
    />
  ))
  .add('In Detail International Resources', () => (
    <InternationalResources
      startYear="2015"
      data={internationalResources.data}
      config={internationalResources.config}
    />
  ));

export default chartStories;
