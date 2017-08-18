// @flow
import { Container, Grid } from 'semantic-ui-react';
import glamorous from 'glamorous';
import React from 'react';
import {TabsNoData, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import Chart from 'components/atoms/Chart';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { NoData } from 'lib/utils/constants';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};

export const Legend = glamorous.div({
  textAlign: 'left',
  fontWeight: 100,

  '& span': {
    display: 'table-cell',
    valign: 'middle',
    margin: '2px 0',
  },

  '& span:first-child': {
    padding: '0 2px',
    width: '16px',
  },

  '& span:first-child > span': {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },

}, (props) => {
  return ({
    '& span:first-child > span': {
      backgroundColor: props.color || '#abc'
    },
  });
});

const Government = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const totalrevenueCtry = getPageLine('totalrevenue-ctry');
  const govtRevenueExternal = getPageLine('govt-revenue-external');
  const ctryExpenditure = getPageLine('ctry-expenditure');
  if (!props.governmentFinance) throw new Error('No Government Finance data');
  const governmentFinance = props.governmentFinance;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {totalrevenueCtry.title ? totalrevenueCtry.title.toUpperCase() : ''}
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.totalRevenue.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {governmentFinance.totalRevenue && governmentFinance.totalRevenue.value
              ? governmentFinance.totalRevenue.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {govtRevenueExternal.title}
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.toolTip
              ? <TabsToolTip {...governmentFinance.grantsAsPcOfRevenue.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {governmentFinance.grantsAsPcOfRevenue && governmentFinance.grantsAsPcOfRevenue.value
            && Number(governmentFinance.grantsAsPcOfRevenue.value) ?
              `${governmentFinance.grantsAsPcOfRevenue.value}%`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {ctryExpenditure.title}
            {governmentFinance.spendingAllocation && governmentFinance.spendingAllocation.toolTip
              ? <TabsToolTip {...governmentFinance.spendingAllocation.toolTip} />
              : ''}
          </HeaderTitle>
          {governmentFinance.spendingAllocation &&
          governmentFinance.spendingAllocation.data &&
          governmentFinance.spendingAllocation.data.length ?
            <Grid>
              <Grid.Column width="6">
                <Chart
                  config={props.config.spendingAllocation}
                  data={governmentFinance.spendingAllocation.data}
                  height="140px"
                />
              </Grid.Column>
              <Grid.Column width="10">
                <div>
                  {governmentFinance.spendingAllocation.data.map((d, i) =>
                    (<Legend
                      key={props.config.spendingAllocation.colors[i]}
                      color={props.config.spendingAllocation.colors[i]}
                    >
                      <span><span /></span>
                      <span>{d[props.config.spendingAllocation.circular.label]}</span>
                    </Legend>)
                  )}
                </div>
              </Grid.Column>
            </Grid>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Government;
