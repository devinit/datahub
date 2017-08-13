// @flow
import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {TabsNoData, TabsFootNote, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import { NoData } from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';

type Props = {
  ...TabDataQuery,
  config: any,
};

const Poverty = (props: Props) => {
  if (!props.povertyTab) return new Error('No Poverty data');
  const povertyTab = props.povertyTab;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            IS POVERTY REDUCING OVER TIME?
            {povertyTab.poverty190Trend && povertyTab.poverty190Trend.toolTip
              ? <TabsToolTip {...povertyTab.poverty190Trend.toolTip} />
              : ''}
          </HeaderTitle>
          {povertyTab.poverty190Trend && povertyTab.poverty190Trend.data
            ? <Chart
              config={props.config.area}
              data={povertyTab.poverty190Trend.data}
              height="120px"
            />
            : <TabsNoData />}
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            HOW DEEP IS POVERTY?
            {povertyTab.depthOfExtremePoverty && povertyTab.depthOfExtremePoverty.toolTip
              ? <TabsToolTip {...povertyTab.depthOfExtremePoverty.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {povertyTab.depthOfExtremePoverty && povertyTab.depthOfExtremePoverty.value
              ? `${povertyTab.depthOfExtremePoverty.value}%`
              : NoData}
          </TabsP>
          <TabsFootNote>Depth of extreme poverty</TabsFootNote>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            HOW IS INCOME DISTRIBUTED?
            {povertyTab.incomeDistTrend && povertyTab.incomeDistTrend.toolTip
              ? <TabsToolTip {...povertyTab.incomeDistTrend.toolTip} />
              : ''}
          </HeaderTitle>
          {povertyTab.incomeDistTrend &&
          povertyTab.incomeDistTrend.data &&
          povertyTab.incomeDistTrend.data.length
            ? <div>
              <Chart
                config={props.config.histogram}
                data={povertyTab.incomeDistTrend.data}
                height="120px"
              />
              <TabsFootNote textAlign="left">
                  Bottom quintile has {povertyTab.incomeDistTrend.data[0].value} % of the income.
              </TabsFootNote>
            </div>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
