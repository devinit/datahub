import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Largest international resource flow'},
  {key: 1, value: 'Total international resource flows, % of GDP'},
  {key: 2, value: 'ODA, % of international resource flows'},
  {key: 3, value: 'Foreign direct investment, % of GDP'},
  {key: 4, value: 'Foreign direct investment per person, US$'},
  {key: 5, value: 'Remittances received per person, US$'},
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
