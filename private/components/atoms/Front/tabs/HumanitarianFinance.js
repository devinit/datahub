import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from '../Common';
import Select from '../Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Humanitarian assistance'},
];
const HumanitarianFinance = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default HumanitarianFinance;
