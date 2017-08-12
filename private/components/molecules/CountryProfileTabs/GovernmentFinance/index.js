// @flow
import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { P } from 'glamorous';
import TabsNoData from 'components/atoms/TabsNoData';
import Chart from 'components/atoms/Chart';
import { red } from 'components/theme/semantic';
import { big } from 'components/theme';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { NoData } from 'lib/utils/constants';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};

const Government = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const totalrevenueCtry = getPageLine('totalrevenue-ctry');
  if (!props.governmentFinance) throw new Error('No Government Finance data');
  const governmentFinance = props.governmentFinance;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {totalrevenueCtry.title ? totalrevenueCtry.title.toUpperCase() : ''}
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.totalRevenue.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.value
              ? governmentFinance.totalRevenue.value
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            HOW MUCH GOVERNMENT REVENUE COMES FROM EXTERNAL GRANTS (AID)?
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.grantsAsPcOfRevenue.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.value
              ? `${governmentFinance.grantsAsPcOfRevenue.value}%`
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            HOW IS SPENDING ALLOCATED?
            {governmentFinance.spendingAllocation && governmentFinance.spendingAllocation.toolTip
              ? <TabsToolTip {...governmentFinance.spendingAllocation.toolTip} />
              : ''}
          </Header>
          {governmentFinance.spendingAllocation &&
          governmentFinance.spendingAllocation.data &&
          governmentFinance.spendingAllocation.data.length
            ? <Chart
              config={props.config.spendingAllocation}
              data={governmentFinance.spendingAllocation.data}
              height="140px"
            />
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Government;
