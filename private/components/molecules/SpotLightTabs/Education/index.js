// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';

const Educaton = (props: SpotLightTabDataQuery) => {
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegional = props.educationTabRegional;
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
          <P fontSize={big} fontWeight={'bold'} color={red}>{educationTabRegional.pupilTeacherRatioGovtSchl.value}</P>
          <P >in government schools  and</P>
          {
                educationTabRegional &&
                educationTabRegional.pupilTeacherRatioGovtSchl.toolTip ?
                  <TabsToolTip {...educationTabRegional.pupilTeacherRatioGovtSchl.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'}>{educationTabRegional.pupilTeacherRatioOtherSchl.value}</P>
          <P>in all schools </P>
          {
                educationTabRegional &&
                educationTabRegional.pupilTeacherRatioOtherSchl.toolTip ?
                  <TabsToolTip {...educationTabRegional.pupilTeacherRatioOtherSchl.toolTip} /> : ''
              }
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
        </Header>
          {
                educationTabRegional &&
                educationTabRegional.studentsPassRate.toolTip ?
                  <TabsToolTip {...educationTabRegional.studentsPassRate.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{educationTabRegional.studentsPassRate.value}</P>
          <P>and is ranked in</P>
          <P fontSize={big} fontWeight={'bold'}>{educationTabRegional.studentsPassDistrictRank.value}</P>
          <P>place overall</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
          HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
        </Header>
          {
                educationTabRegional &&
                educationTabRegional.primaryEducationfunding.toolTip ?
                  <TabsToolTip {...educationTabRegional.primaryEducationfunding.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{educationTabRegional.primaryEducationfunding.value}</P>

        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
