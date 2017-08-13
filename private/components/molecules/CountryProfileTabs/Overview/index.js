// @flow
import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import {TabsNoData, TabsFootNote, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import { P, Div } from 'glamorous';
import { RECIPIENT, DONOR, NoData } from 'lib/utils/constants';
import type { OverviewChartConfigs } from 'visboxConfigs/overviewTabCharts';
import TabsToolTip from 'components/molecules/TabsToolTip';
import Chart from 'components/atoms/Chart';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { red} from 'components/theme/semantic';

type Props = {
  countryType: string,
  config: OverviewChartConfigs,
  pagesData: PageUnit[],
  ...TabDataQuery,
};

const Overview = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const overviewCtryPoorestPeople = getPageLine('overview-ctry-poorest-people');
  if (!props.overviewTab) throw new Error('No OverView data');
  const overviewTab = props.overviewTab;
  return (
    <Container>
      <Grid textAlign={'center'}>
        {props.countryType === RECIPIENT && overviewTab.poorestPeople
          ? <Grid.Column computer={5} tablet={16} mobile={16}>
            <HeaderTitle>
              {overviewCtryPoorestPeople.title ? overviewCtryPoorestPeople.title.toUpperCase() : ''}
              {overviewTab.poorestPeople.toolTip
                ? <TabsToolTip {...overviewTab.poorestPeople.toolTip} />
                : ''}
            </HeaderTitle>
            <TabsP>
              {' '}{overviewTab.poorestPeople.value ? overviewTab.poorestPeople.value : NoData}
            </TabsP>
            <TabsFootNote>out of a population of {
              props.populationTab && props.populationTab.population &&
                        props.populationTab.population.value ?
                props.populationTab.population.value : NoData
            } million people </TabsFootNote>
          </Grid.Column>
          : <Grid.Column computer={5} tablet={16} mobile={16}>
            <HeaderTitle>
                WHAT IS THE AVERAGE INCOME PER PERSON PER YEAR?
            </HeaderTitle>
            {overviewTab.averageIncomerPerPerson && overviewTab.averageIncomerPerPerson.toolTip
              ? <TabsToolTip {...overviewTab.averageIncomerPerPerson.toolTip} />
              : ''}
            <Div paddingRight={'40px'}>
              {overviewTab.averageIncomerPerPerson &&
                overviewTab.averageIncomerPerPerson.data &&
                overviewTab.averageIncomerPerPerson.data.length
                ? <Chart
                  config={props.config.area}
                  data={overviewTab.averageIncomerPerPerson.data}
                  height="140px"
                />
                : <TabsNoData />}
            </Div>
          </Grid.Column>}
        {props.countryType === RECIPIENT
          ? <Grid.Column computer={5} tablet={16} mobile={16}>
            <HeaderTitle>
              WHAT RESOURCES ARE AVAILABLE?
            </HeaderTitle>
            <P color={red} fontWeight={'bold'} marginBottom={0}>
                Domestic public
              {overviewTab.domesticResources && overviewTab.domesticResources.toolTip
                ? <TabsToolTip {...overviewTab.domesticResources.toolTip} />
                : ''}
            </P>
            <TabsP fontSize={'1.6em'}>
              {overviewTab.domesticResources && overviewTab.domesticResources.value
                ? `US$ ${overviewTab.domesticResources.value}`
                : NoData}
            </TabsP>
            <P fontWeight={'bold'} marginBottom={0}>
                International
              {overviewTab.internationalResources && overviewTab.internationalResources.toolTip
                ? <TabsToolTip {...overviewTab.internationalResources.toolTip} />
                : ''}
            </P>
            <TabsP fontSize={'1.6em'}>
              {overviewTab.internationalResources && overviewTab.internationalResources.value
                ? `US$ ${overviewTab.internationalResources.value}`
                : NoData}
            </TabsP>
          </Grid.Column>
          : ''}
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            HOW MUCH DOES THE GOVERNMENT SPEND PER PERSON?
            {overviewTab.governmentSpendPerPerson && overviewTab.governmentSpendPerPerson.toolTip
              ? <TabsToolTip {...overviewTab.governmentSpendPerPerson.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {overviewTab.governmentSpendPerPerson && overviewTab.governmentSpendPerPerson.value
              ? `PPP$ ${overviewTab.governmentSpendPerPerson.value}`
              : NoData}
          </TabsP>
          <TabsFootNote>Government spending per person per annum</TabsFootNote>
        </Grid.Column>
        {props.countryType === DONOR
          ? <Grid.Column computer={5} tablet={16} mobile={16}>
            <HeaderTitle>
                HOW IS INCOME DISTRIBUTED?
              {overviewTab.incomeDistTrend && overviewTab.incomeDistTrend.toolTip
                ? <TabsToolTip {...overviewTab.incomeDistTrend.toolTip} />
                : ''}
            </HeaderTitle>
            {overviewTab.incomeDistTrend &&
              overviewTab.incomeDistTrend.data &&
              overviewTab.incomeDistTrend.data.length
              ? <div>
                <Chart
                  config={props.config.histogram}
                  data={overviewTab.incomeDistTrend.data}
                  height="120px"
                />
                <TabsFootNote textAlign="left">
                      Bottom quintile has {overviewTab.incomeDistTrend.data[0].value} % of the
                      income.
                </TabsFootNote>
              </div>
              : <TabsNoData />}
          </Grid.Column>
          : ''}
      </Grid>
    </Container>
  );
};

export default Overview;
