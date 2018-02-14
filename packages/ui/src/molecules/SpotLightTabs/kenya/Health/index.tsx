import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle } from '../../../../atoms/TabsText';
import TabsToolTip from '../../../TabsToolTip';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
import { PageUnit, getPageUnitById } from '@devinit/dh-base/lib/pageData';
import {SpotLightTabData} from '../../types';

export type Props = SpotLightTabData &  {
  currency: string;
  pageData: PageUnit[];
};

const Health = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const healthCareFunding = getPageLine('healthCareFunding');
  const birthAttendanceSkilled = getPageLine('birthAttendanceSkilled');
  const contraceptiveUse = getPageLine('contraceptiveUse');
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  const healthTabRegionalKe = props.healthTabRegional as DH.IHealthTabRegionalKe;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {healthCareFunding.title}
            {
              TabsToolTip(healthTabRegionalKe.healthCareFunding && healthTabRegionalKe.healthCareFunding.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegionalKe.healthCareFunding && healthTabRegionalKe.healthCareFunding.value
              ? healthTabRegionalKe.healthCareFunding.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {birthAttendanceSkilled.title}
            {
              TabsToolTip(healthTabRegionalKe.birthAttendanceSkilled
                 && healthTabRegionalKe.birthAttendanceSkilled.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegionalKe.birthAttendanceSkilled && healthTabRegionalKe.birthAttendanceSkilled.value
              ? `${healthTabRegionalKe.birthAttendanceSkilled.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {contraceptiveUse.title}
            {
              TabsToolTip(healthTabRegionalKe.contraceptiveUse && healthTabRegionalKe.contraceptiveUse.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegionalKe.contraceptiveUse && healthTabRegionalKe.contraceptiveUse.value
              ? healthTabRegionalKe.contraceptiveUse.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
