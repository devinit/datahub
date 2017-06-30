import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Government revenue per person (including grants), 2015 PPP$'},
  {key: 1, value: 'Government revenue (excluding grants), % of GDPs'},
  {key: 2, value: 'Government revenue (including grants), % of GDP'},
  {key: 3, value: 'Grants, % of government revenue'},
  {key: 4, value: 'Government spending per person, 2015 PPP$'},
];
const Vulnerability = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default Vulnerability;
