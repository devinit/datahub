import * as React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import {TabsP, HeaderTitle } from '../../../../atoms/TabsText';
import TabsToolTip from '../../../TabsToolTip';
import {SpotLightTabData} from '../../types';
import { PageUnit, getPageUnitById } from '@devinit/dh-base/lib/pageData';
import { NoData } from '@devinit/dh-base/lib/utils/constants';

/* tslint-disable max-len */
export type Props = SpotLightTabData &  {
  currency: string;
  pageData: PageUnit[];
};

const Educaton = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const teacherRatioAll = getPageLine('primaryPupilTeacherRatioAllSchl');
  const teacherRatioPublic = getPageLine('primaryTeacherRatioPublicSchl');
  const teacherRatioPrivate = getPageLine('primaryTeacherRatioPrivateSchl');
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegionalKe = props.educationTabRegional as DH.IEducationTabRegionalKe;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioAll.title}
            {
              TabsToolTip(educationTabRegionalKe.primaryPupilTeacherRatioAllSchl
                && educationTabRegionalKe.primaryPupilTeacherRatioAllSchl.toolTip
              )
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegionalKe.primaryPupilTeacherRatioAllSchl
              && educationTabRegionalKe.primaryPupilTeacherRatioAllSchl.value
              ? educationTabRegionalKe.primaryPupilTeacherRatioAllSchl.value
              : NoData
            }
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPublic.title}
            {
              TabsToolTip(educationTabRegionalKe.primaryTeacherRatioPublicSchl
                && educationTabRegionalKe.primaryTeacherRatioPublicSchl.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegionalKe.primaryTeacherRatioPublicSchl
            && educationTabRegionalKe.primaryTeacherRatioPublicSchl.value
              ? `${educationTabRegionalKe.primaryTeacherRatioPublicSchl.value}`
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatioPrivate.title}
            {
              TabsToolTip(educationTabRegionalKe.primaryTeacherRatioPrivateSchl
                && educationTabRegionalKe.primaryTeacherRatioPrivateSchl.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {educationTabRegionalKe.primaryTeacherRatioPrivateSchl
            && educationTabRegionalKe.primaryTeacherRatioPrivateSchl.value
              ? educationTabRegionalKe.primaryTeacherRatioPrivateSchl.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
