import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from 'components/atoms/Front/Common';
import Select from 'components/atoms/Front/Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'District league table overall score'},
  {key: 1, value: 'HMIS reporting score'},
  {key: 2, value: 'Approved posts that are filled (%)'},
  {key: 3, value: 'Tuberculosis treatment success rate'},
  {key: 4, value: 'Diphtheria treatment coverage rate'},
  {key: 5, value: 'Tetanus vaccine coverage rate'},
  {key: 6, value: 'Antenatal care coverage rate'},
  {key: 7, value: 'Primary health spending per person'},
];
const Health = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default Health;
