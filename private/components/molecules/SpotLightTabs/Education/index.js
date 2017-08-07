// @flow
import { Container, Header, Grid} from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const Educaton = (props: SpotLightTabDataQuery) => {
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.educationTabRegional.pupilTeacherRatioGovtSchl}</P>
          <P >in government schools  and</P>
          <P fontSize={big} fontWeight={'bold'}>{props.educationTabRegional.pupilTeacherRatioOtherSchl}</P>
          <P>in all schools </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.educationTabRegional.studentsPassRate}</P>
          <P>and is ranked in</P>
          <P fontSize={big} fontWeight={'bold'}>{props.educationTabRegional.studentsPassDistrictRank}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
        </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.educationTabRegional.primaryEducationfunding}</P>

        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
