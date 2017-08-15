// @flow
import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { P } from 'glamorous';
import { big } from 'components/theme';
import { red } from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[]
}

const Health = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const healthPerformance = getPageLine('health-performance');
  const caseOfTb = getPageLine('case-of-tb');
  const healthCareFunding = getPageLine('health-care-funding');
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  const healthTabRegional = props.healthTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {healthPerformance.title}
            {healthTabRegional.districtPerformance && healthTabRegional.districtPerformance.toolTip
              ? <TabsToolTip {...healthTabRegional.districtPerformance.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {healthTabRegional.districtPerformance && healthTabRegional.districtPerformance.value
              ? healthTabRegional.districtPerformance.value
              : NoData}
          </P>
          <P>out of 100, and is ranked in</P>
          <P fontSize={big} fontWeight={'bold'}>
            ...
          </P>
          <P>place overall</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {caseOfTb.title}
            {healthTabRegional.treatmeantOfTb && healthTabRegional.treatmeantOfTb.toolTip
              ? <TabsToolTip {...healthTabRegional.treatmeantOfTb.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {healthTabRegional.treatmeantOfTb && healthTabRegional.treatmeantOfTb.value
              ? healthTabRegional.treatmeantOfTb.value
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {healthCareFunding.title}
            {healthTabRegional.healthCareFunding && healthTabRegional.healthCareFunding.toolTip
              ? <TabsToolTip {...healthTabRegional.healthCareFunding.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {healthTabRegional.healthCareFunding && healthTabRegional.healthCareFunding.value
              ? healthTabRegional.healthCareFunding.value
              : NoData}
          </P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
