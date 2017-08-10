// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';

type Props = {
  id: string,
};

// TODO: get rid of start year in props
const InflowAndInternational = (props: Props) => (
  <div>
    <InflowsVsOutflows id={props.id} />
    <InternationalResourcesChart id={props.id} startYear={2015} />
  </div>
);
export default (props: Props) =>
  (<Tabs textAlign="center" selected={0} >
    <Pane label="GOVERNMENT FINANCE" id={'government-finance'}>
      <GovernmentFinanceChart startYear={2015} id={props.id} />
    </Pane>
    <Pane label="INTERNATIONAL RESOURCES" id={'government-finance'}>
      <InflowAndInternational id={props.id} />
    </Pane>
  </Tabs>
  );
