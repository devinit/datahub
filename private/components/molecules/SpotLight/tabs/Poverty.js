import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from 'components/molecules/Front/Common';
import Select from 'components/molecules/Front/Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Decent standard of living score'},
  {key: 1, value: 'Poverty headcount'},
  {key: 2, value: 'Life expectancy'}
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
