import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from 'components/atoms/Front/Common';
import Select from 'components/atoms/Front/Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Rural access to safe water (%)'},
  {key: 1, value: 'Rural water source functionality (%)'},
  {key: 2, value: 'Functioning water source committees (%)'},
  {key: 3, value: 'Household sanitation coverage (%)'},
  {key: 4, value: 'District WASH performance score'},
];
const WaterAndSanitation = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default WaterAndSanitation;
