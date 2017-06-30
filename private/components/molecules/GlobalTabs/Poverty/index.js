import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Number of people living in extreme poverty'},
  {key: 1, value: '% of population living in extreme poverty'},
  {key: 2, value: 'Depth of extreme poverty (poverty gap)'},
  {key: 3, value: '% of population living on less than $3.10 a day'},
  {key: 4, value: 'Number of people in the P20'},
  {key: 5, value: '% of people in the P20'},
  {key: 6, value: '% of people in the P20 (subnational level)'},
  {key: 7, value: '% of people in the P20 (survey level)'},
];
const Poverty = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default Poverty;
