import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from '../Common';
import Select from '../Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Gross ODA received, US$'},
  {key: 1, value: 'Net ODA received, US$'},
  {key: 2, value: 'Net ODA provided by OECD DAC members, US$'},
  {key: 3, value: 'ODA per person living on under $1.90 a day, US$'},
  {key: 4, value: 'Net ODA provided by DAC members, % of GNI'},
  {key: 5, value: 'Gross ODA provided by DAC members to LDCs, % of GNI'},
  {key: 6, value: 'Gross other official flows received, US$'},
  {key: 8, value: 'Net other official flows provided, US$'},
  {key: 9, value: 'Net south-south development cooperation provided, US$'},
  {key: 10, value: 'South-south development cooperation provided, % of GNI'},
];
const InternationalFinance = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default InternationalFinance;
