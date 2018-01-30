// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
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

const Health = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const healthCareFunding = getPageLine('healthCareFunding');
  const birthAttendanceSkilled = getPageLine('birthAttendanceSkilled');
  const contraceptiveUse = getPageLine('contraceptiveUse');
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  const healthTabRegional = props.healthTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {healthCareFunding.title}
            {
              // $FlowFixMe
              TabsToolTip(healthTabRegional.healthCareFunding && healthTabRegional.healthCareFunding.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegional.healthCareFunding && healthTabRegional.healthCareFunding.value
              ? healthTabRegional.healthCareFunding.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {birthAttendanceSkilled.title}
            { // $FlowFixMe
              TabsToolTip(healthTabRegional.birthAttendanceSkilled && healthTabRegional.birthAttendanceSkilled.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegional.birthAttendanceSkilled && healthTabRegional.birthAttendanceSkilled.value
              // $FlowFixMe
              ? `${healthTabRegional.birthAttendanceSkilled.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {contraceptiveUse.title}
            {
              // $FlowFixMe
              TabsToolTip(healthTabRegional.contraceptiveUse && healthTabRegional.contraceptiveUse.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegional.contraceptiveUse && healthTabRegional.contraceptiveUse.value
              ? healthTabRegional.contraceptiveUse.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
