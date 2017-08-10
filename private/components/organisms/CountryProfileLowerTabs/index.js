// @flow
import React from 'react';
import { Tab, Container } from 'semantic-ui-react';
import {lighterGrey} from 'components/theme/semantic';
import glamorous from 'glamorous';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';

type Props = {
  id: string,
};
const TabsContainer = glamorous.section({
  backgroundColor: lighterGrey,
  '& .ui.attached.tabular.menu': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    border: 'none'
  },
  '& .ui.tabular.menu .item': {
    border: 'none'
  },
  '& .ui.tabular.menu .item .active': {
    borderBottom: '3px solid red'
  },
  '& .ui.tab.active': {
    backgroundColor: lighterGrey
  }
});
// TODO: get rid of start year in props
const panes = (id: string) => [
  { menuItem: 'GOVERNMENT FINANCE',
    render: () => <Tab.Pane><GovernmentFinanceChart id={id} startYear={2015} /></Tab.Pane>
  },
  { menuItem: 'INTERNATIONAL RESOURCES',
    render: () =>
      (<Tab.Pane>
        <InflowsVsOutflows id={id} />
        <InternationalResourcesChart id={id} startYear={2015} />
      </Tab.Pane>)
  }
];
export default (props: Props) =>
  (<TabsContainer>
    <Container>
      <Tab panes={panes(props.id)} />
    </Container>
  </TabsContainer>
  );
