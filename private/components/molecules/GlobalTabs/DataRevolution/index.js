import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Latest (planned) population census'},
  {key: 1, value: 'Number of poverty surveys in past 10 years'},
  {key: 2, value: 'Latest (planned) agricultural census'},
  {key: 3, value: 'Vital statistics from civil registration (births)'},
  {key: 4, value: 'Vital statistics from civil registration (deaths)'},
  {key: 5, value: 'Health management information system'},
  {key: 6, value: 'Education management information system'},
  {key: 7, value: 'Statistical capacity'},
];
const DataRevolution = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default DataRevolution;
