// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {Container} from 'semantic-ui-react';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';

type Props = {
  id: string,
};

// TODO: get rid of start year in props
export default (props: Props) =>
  (<Tabs textAlign="center" selected={0} >
    <Pane label="GOVERNMENT FINANCE" id={'government-finance'}>
      <Container>
        <GovernmentFinanceChart startYear={2015} id={props.id} />
      </Container>
    </Pane>
    <Pane label="INTERNATIONAL RESOURCES" id={'government-finance'}>
      <Container>
        <InflowsVsOutflows id={props.id} />
        <InternationalResourcesChart id={props.id} startYear={2015} />
      </Container>
    </Pane>
  </Tabs>
  );
