import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'UK, DFID planned budgets'},
  {key: 1, value: 'Canada, Global Affairs planned budgets'},
  {key: 2, value: 'Denmark, DANIDA and Foreign Affairs planned budgets'},
  {key: 3, value: 'Netherlands, Foreign Affairs planned budgets'},
  {key: 4, value: 'Belgian Development Cooperation planned budgets'},
];
const ForwardLooking = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default ForwardLooking;
