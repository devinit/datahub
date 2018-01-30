// @flow
import React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import {TabsP, HeaderTitle } from 'components/atoms/TabsText';
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
  const teacherRatioPrivate = getPageLine('primaryTeacherRatioPrivateSchl');
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegional = props.educationTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioAll.title}
            { // $FlowFixMe
              TabsToolTip(educationTabRegional.primaryPupilTeacherRatioAllSchl && educationTabRegional.primaryPupilTeacherRatioAllSchl.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.primaryPupilTeacherRatioAllSchl &&
            educationTabRegional.primaryPupilTeacherRatioAllSchl.value
              ? educationTabRegional.primaryPupilTeacherRatioAllSchl.value
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPublic.title}
            {
              // $FlowFixMe
              TabsToolTip(educationTabRegional.primaryTeacherRatioPublicSchl && educationTabRegional.primaryTeacherRatioPublicSchl.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.primaryTeacherRatioPublicSchl && educationTabRegional.primaryTeacherRatioPublicSchl.value
              // $FlowFixMe
              ? `${educationTabRegional.primaryTeacherRatioPublicSchl.value}`
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPrivate.title}
            { // $FlowFixMe
              TabsToolTip(educationTabRegional.primaryTeacherRatioPrivateSchl && educationTabRegional.primaryTeacherRatioPrivateSchl.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.primaryTeacherRatioPrivateSchl && educationTabRegional.primaryTeacherRatioPrivateSchl.value
              ? educationTabRegional.primaryTeacherRatioPrivateSchl.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
