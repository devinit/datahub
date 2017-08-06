// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import TabsNoData from 'components/atoms/TabsNoData';
import {P, Div} from 'glamorous';
import {RECIPIENT, DONOR, NoData} from 'lib/utils/constants';
import {big} from 'components/theme';
import type {OverviewChartConfigs} from 'visboxConfigs/overviewTabCharts';
import TabsToolTip from 'components/molecules/TabsToolTip';
import Chart from 'components/atoms/Chart';
import {red} from 'components/theme/semantic';

type Props = {
  countryType: string,
  config: OverviewChartConfigs,
  ...TabDataQuery
}

const Overview = (props: Props) => {
  if (!props.overviewTab) return new Error('No OverView data');
  const overviewTab = props.overviewTab;
  return (
    <Container>
      <Grid textAlign={'center'}>
        {
         props.countryType === RECIPIENT && overviewTab.poorestPeople ?
           <Grid.Column computer={5} tablet={16} mobile={16}>
             <Header textAlign="center" as="h3">
              HOW MANY OF THE POOREST PEOPLE GLOBALLY LIVE IN UGANDA?
            </Header>
             {
                overviewTab.poorestPeople.toolTip ?
                  <TabsToolTip {...overviewTab.poorestPeople.toolTip} /> : ''
              }
             <P fontSize={big} fontWeight={'bold'} color={red}> {
               overviewTab.poorestPeople.value ? overviewTab.poorestPeople.value : NoData
               }</P>
             <P>out of a population of 39 million people</P>
           </Grid.Column>
          :
           <Grid.Column computer={5} tablet={16} mobile={16}>
             <Header textAlign="center" as="h3">
              WHAT IS THE AVERAGE INCOME PER PERSON PER YEAR?
            </Header>
             {
              overviewTab.averageIncomerPerPerson && overviewTab.averageIncomerPerPerson.toolTip ?
                <TabsToolTip {...overviewTab.averageIncomerPerPerson.toolTip} /> : ''
            }
             <Div paddingRight={'40px'}>
               { overviewTab.averageIncomerPerPerson && overviewTab.averageIncomerPerPerson.data ?
                 <Chart
                   config={props.config.area}
                   data={overviewTab.averageIncomerPerPerson.data}
                   height="140px"
                 /> : <TabsNoData />
               }
             </Div>
           </Grid.Column>
        }
        {
          props.countryType === RECIPIENT ?
            <Grid.Column computer={5} tablet={16} mobile={16}>
              <Header textAlign="center" as="h3"> WHAT RESOURCES ARE AVAILABLE?</Header>
              <P>Domestic public</P>
              <P fontSize={big} fontWeight={'bold'} color={red}>{
                overviewTab.domesticResources && overviewTab.domesticResources.value ?
                overviewTab.domesticResources.value : NoData
                }</P>
              <P>International</P>
              <P fontSize={big} fontWeight={'bold'}>{
                 overviewTab.internationalResources && overviewTab.internationalResources.value ?
                  overviewTab.internationalResources.value : NoData
                }</P>
            </Grid.Column> : ''
        }
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
          HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            overviewTab.governmentSpendPerPerson && overviewTab.governmentSpendPerPerson.value ?
            overviewTab.governmentSpendPerPerson.value : NoData
            }</P>
          <P>out of a population of 39 million people</P>
        </Grid.Column>
        {
        props.countryType === DONOR ?
          <Grid.Column computer={5} tablet={16} mobile={16}>
            <Header textAlign="center" as="h3">
              HOW IS INCOME DISTRIBUTED?
            </Header>
            {
            overviewTab.incomeDistTrend && overviewTab.incomeDistTrend.data
            && overviewTab.incomeDistTrend.data.length ?
              <div>
                <Chart
                  config={props.config.histogram}
                  data={props.overviewTab.incomeDistTrend}
                  height="120px"
                />
                <P fontWeight="bold" textAlign="left" marginTop="1em">
                  Bottom quintile has {overviewTab.incomeDistTrend.data[0].value} % of the income.
                </P>
              </div>
              : <TabsNoData />
          }
          </Grid.Column> : ''
      }
      </Grid>
    </Container>
  );
};

export default Overview;
