// @flow
import { Container, Header, Grid} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import TabsNoData from 'components/atoms/TabsNoData';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {NoData} from 'lib/utils/constants';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';

type Props = {
 ...TabDataQuery,
 config: any
}

const Poverty = (props: Props) => {
  if (!props.povertyTab) return new Error('No Poverty data');
  const povertyTab = props.povertyTab;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            IS POVERTY REDUCING OVER TIME?
            {
                povertyTab.poverty190Trend &&
                povertyTab.poverty190Trend.toolTip ?
                  <TabsToolTip {...povertyTab.poverty190Trend.toolTip} /> : ''
              }
          </Header>
          {
            povertyTab.poverty190Trend && povertyTab.poverty190Trend.data ?
              <Chart config={props.config.area} data={povertyTab.poverty190Trend.data} height="120px" /> :
              <TabsNoData />
          }

        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            HOW DEEP IS POVERTY?
             {
                povertyTab.depthOfExtremePoverty &&
                povertyTab.depthOfExtremePoverty.toolTip ?
                  <TabsToolTip {...povertyTab.depthOfExtremePoverty.toolTip} /> : ''
              }
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {
            povertyTab.depthOfExtremePoverty && povertyTab.depthOfExtremePoverty.value ?
            `${povertyTab.depthOfExtremePoverty.value}%` : NoData
            }
          </P>
          <P>Depth of extreme poverty</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            HOW IS INCOME DISTRIBUTED?
             {
                povertyTab.incomeDistTrend &&
                povertyTab.incomeDistTrend.toolTip ?
                  <TabsToolTip {...povertyTab.incomeDistTrend.toolTip} /> : ''
              }
          </Header>
          {
            povertyTab.incomeDistTrend && povertyTab.incomeDistTrend.data ?
              <div>
                <Chart
                  config={props.config.histogram}
                  data={povertyTab.incomeDistTrend.data}
                  height="120px"
                />
                <P fontWeight="bold" textAlign="left" marginTop="1em">
                  Bottom quintile has {povertyTab.incomeDistTrend.data[0].value} % of the income.
                </P>
              </div>
              : <TabsNoData />
          }
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
