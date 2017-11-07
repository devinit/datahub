// @flow
import React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import {TabsP, HeaderTitle } from 'components/atoms/TabsText';
import { P } from 'glamorous';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
/* eslint-disable max-len */
type Props = {
  ...SpotLightTabDataQuery,
  currency: string,
  pageData: PageUnit[]
}

const Educaton = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const teacherRatioAll = getPageLine('primaryPupilTeacherRatioAllSchl');
  const teacherRatioPublic = getPageLine('primaryTeacherRatioPublicSchl');
  const teacherRatioPrivate = getPageLine('primaryTeacherRatioPrivateSchl:');
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegional = props.educationTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioAll.title}
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.primaryPupilTeacherRatioAllSchl &&
            educationTabRegional.primaryPupilTeacherRatioAllSchl.value
              ? educationTabRegional.primaryPupilTeacherRatioAllSchl.value
              : NoData}
          </TabsP>
          <p>
            in government schools and
            { // $FlowFixMe
              TabsToolTip(educationTabRegional.pupilTeacherRatioGovtSchl && educationTabRegional.pupilTeacherRatioGovtSchl.toolTip)
            }
          </p>
          <TabsP>
            {educationTabRegional.pupilTeacherRatioOtherSchl &&
            educationTabRegional.pupilTeacherRatioOtherSchl.value
              ? educationTabRegional.pupilTeacherRatioOtherSchl.value
              : NoData}
          </TabsP>
          <p>
            in all schools
            {// $FlowFixMe
              TabsToolTip(educationTabRegional.pupilTeacherRatioOtherSchl && educationTabRegional.pupilTeacherRatioOtherSchl.toolTip)
            }
          </p>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPublic.title}
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.studentsPassRate && educationTabRegional.studentsPassRate.value
              // $FlowFixMe
              ? `${educationTabRegional.studentsPassRate.value} %`
              : NoData}
          </TabsP>
          <p>and is ranked in
            {
              // $FlowFixMe
              TabsToolTip(educationTabRegional.studentsPassRate && educationTabRegional.studentsPassRate.toolTip)
            }
          </p>
          <TabsP>
            {educationTabRegional.studentsPassDistrictRank &&
            educationTabRegional.studentsPassDistrictRank.value
              ? educationTabRegional.studentsPassDistrictRank.value
              : NoData}
          </TabsP>
          <P>place overall
            { // $FlowFixMe
              TabsToolTip(educationTabRegional.studentsPassDistrictRank && educationTabRegional.studentsPassDistrictRank.toolTip)
            }
          </P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPrivate.title}
            { // $FlowFixMe
              TabsToolTip(educationTabRegional.primaryEducationfunding && educationTabRegional.primaryEducationfunding.toolTip)
            }
          </HeaderTitle>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
