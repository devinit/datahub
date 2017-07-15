// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import PTag from 'components/atoms/PTag';
import {red} from 'components/theme/semantic';

const Educaton = (props: SpotLightTabDataQuery) => {
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?
        </Header>
          <PTag size={'big'} fontWeight={'bold'}>{props.educationTabRegional.pupilTeacherRatioGovtSchl}</PTag>
          <PTag >in government schools  and</PTag>
          <PTag size={'big'} fontWeight={'bold'}>{props.educationTabRegional.pupilTeacherRatioOtherSchl}</PTag>
          <PTag>in all schools </PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
        </Header>
          <PTag size={'big'} fontWeight={'bold'}>{props.educationTabRegional.studentsPassRate}</PTag>
          <PTag>and is ranked in</PTag>
          <PTag size={'big'} fontWeight={'bold'}>{props.educationTabRegional.studentsPassDistrictRank}</PTag>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
        </Header>
          <PTag size={'big'} fontWeight={'bold'}>{props.educationTabRegional.primaryEducationfunding}</PTag>

        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
