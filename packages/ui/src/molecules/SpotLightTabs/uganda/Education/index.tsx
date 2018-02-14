// @flow
import * as React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import {TabsP, HeaderTitle } from '../../../../atoms/TabsText';
import { P } from 'glamorous';
import TabsToolTip from '../../../TabsToolTip';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
import {SpotLightTabData} from '../../types';
import { PageUnit, getPageUnitById } from '@devinit/dh-base/lib/pageData';

export type Props = SpotLightTabData &  {
  currency: string;
  pageData: PageUnit[];
};

const Educaton = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const teacherRatio = getPageLine('teacher-ratio');
  const stdPassRatio = getPageLine('std-pass-ratio');
  const educationFunding = getPageLine('education-funding');
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegional = props.educationTabRegional as DH.IEducationTabRegionalUg;
  const fundingUSD = educationTabRegional.primaryEducationfunding &&
    educationTabRegional.primaryEducationfunding.value ?
    educationTabRegional.primaryEducationfunding.value : NoData;
  const fundingNCU = educationTabRegional.primaryEducationfunding &&
    educationTabRegional.primaryEducationfunding.value_ncu ?
    educationTabRegional.primaryEducationfunding.value_ncu : NoData;
  const fundingValue = props.currency === 'US$' ? fundingUSD : fundingNCU;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {teacherRatio.title}
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.pupilTeacherRatioGovtSchl &&
            educationTabRegional.pupilTeacherRatioGovtSchl.value
              ? educationTabRegional.pupilTeacherRatioGovtSchl.value
              : NoData}
          </TabsP>
          <p>
            in government schools and
            {
              TabsToolTip(educationTabRegional.pupilTeacherRatioGovtSchl
                && educationTabRegional.pupilTeacherRatioGovtSchl.toolTip)
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
            {
              TabsToolTip(educationTabRegional.pupilTeacherRatioOtherSchl
                && educationTabRegional.pupilTeacherRatioOtherSchl.toolTip)
            }
          </p>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {stdPassRatio.title}
          </HeaderTitle>
          <TabsP>
            {educationTabRegional.studentsPassRate && educationTabRegional.studentsPassRate.value
              ? `${educationTabRegional.studentsPassRate.value} %`
              : NoData}
          </TabsP>
          <p>and is ranked in
            {
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
            {
              TabsToolTip(educationTabRegional.studentsPassDistrictRank
                && educationTabRegional.studentsPassDistrictRank.toolTip)
            }
          </P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {educationFunding.title}
            {
              TabsToolTip(educationTabRegional.primaryEducationfunding
                && educationTabRegional.primaryEducationfunding.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {
              fundingValue ? `${props.currency} ${fundingValue}` : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
