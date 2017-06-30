import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Average household size'},
  {key: 1, value: 'Population density (per sq km)'},
  {key: 2, value: 'Urban population (%)'},
  {key: 3, value: 'Average dependency ratio'},
  {key: 4, value: 'Total population'},
];
const Population = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default Population;
