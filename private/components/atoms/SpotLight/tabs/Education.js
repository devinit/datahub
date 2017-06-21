import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import {TabHeader} from 'components/atoms/Front/Common';
import Select from 'components/atoms/Front/Select';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const options = [
  {key: 0, value: 'Secondary pupils with adequate sitting and writing space (government schools)'},
  {key: 1, value: 'Secondary pupil-teacher ratio (government schools)'},
  {key: 2, value: 'Secondary pupils with adequate sitting and writing space (total)'},
  {key: 3, value: 'Primary education spending per child'},
  {key: 4, value: 'Secondary net enrolment rate'},
  {key: 5, value: 'Primary education donor spending per child'},
  {key: 6, value: 'Primary pupil to teacher ratio-all schools'},
  {key: 7, value: 'Primary pupils with adequate sitting and writing space-all schools (%)'},
  {key: 8, value: 'Primary pupils with adequate sitting and writing space-government schools (%)'},
  {key: 9, value: 'Primary net enrolment rate'},
  {key: 10, value: 'Primary leaving exam performance index'},
  {key: 10, value: 'Secondary pupil-teacher ratio (total)'},
];
const Education = () => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={options} />
      </Container>
    </TabHeader>
  </PaneContainer>
);

export default Education;
