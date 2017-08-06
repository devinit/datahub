// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import TabsNoData from 'components/atoms/TabsNoData';
import {P, Div} from 'glamorous';
import {RECIPIENT, DONOR} from 'lib/utils/constants';
import {big} from 'components/theme';
import type {OverviewChartConfigs} from 'visboxConfigs/overviewTabCharts';
import Chart from 'components/atoms/Chart';
import {red} from 'components/theme/semantic';

type Props = {
  countryType: string,
  config: OverviewChartConfigs,
  ...TabDataQuery
}

const Overview = (props: Props) => {
  if (!props.overViewTab) throw new Error('No OverView data');
  return (
    <Container>
      <Grid textAlign={'center'}>
        {
         props.countryType === RECIPIENT ?
           <Grid.Column computer={5} tablet={16} mobile={16}>
             <Header textAlign="center" as="h3">
              HOW MANY OF THE POOREST PEOPLE GLOBALLY LIVE IN UGANDA?
            </Header>
             <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.poorestPeople}</P>
             <P>out of a population of 39 million people</P>
           </Grid.Column>
          :
           <Grid.Column computer={5} tablet={16} mobile={16}>
             <Header textAlign="center" as="h3">
              WHAT IS THE AVERAGE INCOME PER PERSON PER YEAR?
            </Header>
             <Div paddingRight={'40px'}>
               { props.overViewTab.averageIncomerPerPerson &&
                props.overViewTab.averageIncomerPerPerson.length ?
                  <Chart
                    config={props.config.area}
                    data={props.overViewTab.averageIncomerPerPerson}
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
              <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.domesticResources}</P>
              <P>International</P>
              <P fontSize={big} fontWeight={'bold'}>{props.overViewTab.internationalResources}</P>
            </Grid.Column> : ''
        }
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
          HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.overViewTab.governmentSpendPerPerson}</P>
          <P>out of a population of 39 million people</P>
        </Grid.Column>
        {
        props.countryType === DONOR ?
          <Grid.Column computer={5} tablet={16} mobile={16}>
            <Header textAlign="center" as="h3">
              HOW IS INCOME DISTRIBUTED?
            </Header>
            {
            props.overViewTab.incomeDistTrend && props.overViewTab.incomeDistTrend.length ?
              <div>
                <Chart
                  config={props.config.histogram}
                  data={props.overViewTab.incomeDistTrend}
                  height="120px"
                />
                <P fontWeight="bold" textAlign="left" marginTop="1em">
                  Bottom quintile has {props.overViewTab.incomeDistTrend[0].value} % of the income.
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
