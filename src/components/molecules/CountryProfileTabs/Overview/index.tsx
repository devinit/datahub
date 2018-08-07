import { Div, P } from 'glamorous';
import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { addMinAndMaxYear } from '../../../../utils';
import { DONOR, NoData, RECIPIENT } from '../../../../utils/constants';
import Chart from '../../../atoms/Chart';
import { HeaderTitle, TabsFootNote, TabsNoData, TabsP } from '../../../atoms/Text';
import { TabDataQuery } from '../../../gql-types';
import { getPageUnitById } from '../../../pageData';
import { red } from '../../../theme/semantic';
import { PageUnit } from '../../../types';
import { OverviewChartConfigs } from '../../../visbox/overviewTabCharts';
import { TabsToolTip } from '../../ToolTip';

export type Props = TabDataQuery & {
  countryType: string;
  config: OverviewChartConfigs;
  pageData: PageUnit[];
};

const Overview = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const overviewCtryPoorestPeople = getPageLine('overview-ctry-poorest-people');
  const overviewCtryResources = getPageLine('overview-ctry-resources');
  const avgIncomePerPerson = getPageLine('avg-income-per-person');
  const overviewGovtSpentPerPerson = getPageLine('overview-govt-spentperperson');
  const incomeDistributionCtry = getPageLine('income-distribution-ctry');
  if (!props.overviewTab) { throw new Error('No OverView data'); }
  const overviewTab = props.overviewTab;
  // make typescript f**n happy
  const incomeDistData = overviewTab.incomeDistTrend && overviewTab.incomeDistTrend.data;
  // make typescript f**n happy
  const incomeDistDataObj = incomeDistData && incomeDistData[0];
  // make typescript f**n happy
  const incomeValue = incomeDistDataObj ? incomeDistDataObj.value : 'No Data';
  return (
    <Container>
      <Grid>
        { props.countryType !== DONOR && overviewTab.poorestPeople
          ? <Grid.Column computer={ 5 } tablet={ 12 } mobile={ 12 }>
            <HeaderTitle>
              { overviewCtryPoorestPeople.title ? overviewCtryPoorestPeople.title.toUpperCase() : '' }
              { overviewTab.poorestPeople.toolTip
                ? <TabsToolTip { ...overviewTab.poorestPeople.toolTip } />
                : '' }
            </HeaderTitle>
            <TabsP>
              { overviewTab.poorestPeople.value ? overviewTab.poorestPeople.value : NoData }
            </TabsP>
            <TabsFootNote>out of a population of {
              props.populationTab && props.populationTab.population &&
                        props.populationTab.population.value ?
                props.populationTab.population.value : NoData
            } million people </TabsFootNote>
          </Grid.Column>
          : <Grid.Column computer={ 5 } tablet={ 12 } mobile={ 12 }>
            <HeaderTitle>
              { avgIncomePerPerson.title }
              { overviewTab.averageIncomerPerPerson && overviewTab.averageIncomerPerPerson.toolTip
                ? <TabsToolTip { ...overviewTab.averageIncomerPerPerson.toolTip } />
                : '' }
            </HeaderTitle>
            <Div paddingRight={ '40px' }>
              { overviewTab.averageIncomerPerPerson &&
                overviewTab.averageIncomerPerPerson.data &&
                overviewTab.averageIncomerPerPerson.data.length
                ? <Chart
                  data={ overviewTab.averageIncomerPerPerson.data }
                  height="140px"
                  config={
                    addMinAndMaxYear(props.config.area, overviewTab.averageIncomerPerPerson.data) }
                />
                : <TabsNoData /> }
            </Div>
          </Grid.Column> }
        { props.countryType === RECIPIENT
          ? <Grid.Column computer={ 5 } tablet={ 12 } mobile={ 12 }>
            <HeaderTitle>
              { overviewCtryResources.title }
            </HeaderTitle>
            <P color={ red } fontWeight={ 'bold' } marginBottom={ 0 } textAlign="center">
                Domestic public
              { overviewTab.domesticResources && overviewTab.domesticResources.toolTip
                ? <TabsToolTip { ...overviewTab.domesticResources.toolTip } />
                : '' }
            </P>
            <TabsP fontSize={ '1.6em' }>
              { overviewTab.domesticResources && overviewTab.domesticResources.value
                ? `US$ ${overviewTab.domesticResources.value}`
                : NoData }
            </TabsP>
            <P fontWeight={ 'bold' } marginBottom={ 0 } textAlign="center">
                International
              { overviewTab.internationalResources && overviewTab.internationalResources.toolTip
                ? <TabsToolTip { ...overviewTab.internationalResources.toolTip } />
                : '' }
            </P>
            <TabsP fontSize={ '1.6em' }>
              { overviewTab.internationalResources && overviewTab.internationalResources.value
                ? `US$ ${overviewTab.internationalResources.value}`
                : NoData }
            </TabsP>
          </Grid.Column>
          : '' }
        <Grid.Column computer={ 5 } tablet={ 12 } mobile={ 12 }>
          <HeaderTitle>
            { overviewGovtSpentPerPerson.title }
            { overviewTab.governmentSpendPerPerson && overviewTab.governmentSpendPerPerson.toolTip
              ? <TabsToolTip { ...overviewTab.governmentSpendPerPerson.toolTip } />
              : '' }
          </HeaderTitle>
          <TabsP>
            { overviewTab.governmentSpendPerPerson &&
              overviewTab.governmentSpendPerPerson.value &&
              overviewTab.governmentSpendPerPerson.value !== NoData
              ? `PPP$ ${Number(overviewTab.governmentSpendPerPerson.value).toLocaleString()}`
              : NoData }
          </TabsP>
          <TabsFootNote>Government spending per person per annum</TabsFootNote>
        </Grid.Column>
        { props.countryType === DONOR
          ? <Grid.Column computer={ 5 } tablet={ 12 } mobile={ 1 }>
            <HeaderTitle>
              { incomeDistributionCtry.title }
              { overviewTab.incomeDistTrend && overviewTab.incomeDistTrend.toolTip
                ? <TabsToolTip { ...overviewTab.incomeDistTrend.toolTip } />
                : '' }
            </HeaderTitle>
            { incomeDistData
              ? <div style={ { width: '80%', margin: '0 auto' } }>
                <Chart
                  config={ props.config.histogram }
                  data={ incomeDistData.map((d, i) => i ? d : { ...d, color: '#e84439' }) }
                  height="120px"
                />
                <TabsFootNote textAlign="left" lineHeight={ 2 }>
                  Bottom quintile has { incomeValue } % of the income.
                </TabsFootNote>
              </div>
              : <TabsNoData /> }
          </Grid.Column>
          : '' }
      </Grid>
    </Container>
  );
};

export default Overview;
