import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';


const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Agriculture allocation as a % of total expenditure'},
  {key: 1, value: 'Donor funds'},
  {key: 2, value: 'Education allocation as a % of total expenditure'},
  {key: 3, value: 'Health allocation as a % of total expenditure'},
  {key: 4, value: 'Locally raised revenues'},
];
const DistrictPublicResources = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default DistrictPublicResources;
