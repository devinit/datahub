// @flow
import { Grid } from 'semantic-ui-react';
import React from 'react';
import { Div, Span } from 'glamorous';
import {TabsNoData, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import Chart from 'components/atoms/Chart';
import { red, blue } from 'components/theme/semantic';
import { NoData } from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const popnCtry = getPageLine('popn-ctry');
  const popnDistributionAgeCtry = getPageLine('popn-distribution-age-ctry');
  if (!props.populationTab) throw new Error('No Population data');
  const populationTab = props.populationTab;
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <HeaderTitle>
          {popnCtry.title }
          {populationTab.population && populationTab.population.toolTip
            ? <TabsToolTip {...populationTab.population.toolTip} />
            : ''}
        </HeaderTitle>
        <TabsP>
          {populationTab.population && populationTab.population.value
            ? populationTab.population.value
            : NoData}
        </TabsP>
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <HeaderTitle>
          WHAT IS THE <Span color={red}>URBAN</Span> VS <Span color={blue}>RURAL</Span> SPLIT?
          {populationTab.populationDistribution && populationTab.populationDistribution.toolTip
            ? <TabsToolTip {...populationTab.populationDistribution.toolTip} />
            : ''}
        </HeaderTitle>
        {populationTab.populationDistribution &&
        populationTab.populationDistribution.data &&
        populationTab.populationDistribution.data.length
          ? <Div paddingRight={'40px'}>
            <Chart
              config={props.config.populationDistribution}
              data={populationTab.populationDistribution.data}
              height="140px"
            />
          </Div>
          : <TabsNoData />}
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <HeaderTitle>
          {popnDistributionAgeCtry.title }
          {populationTab.populationPerAgeBand && populationTab.populationPerAgeBand.toolTip
            ? <TabsToolTip {...populationTab.populationPerAgeBand.toolTip} />
            : ''}
        </HeaderTitle>
        {populationTab.populationPerAgeBand &&
        populationTab.populationPerAgeBand.data &&
        populationTab.populationPerAgeBand.data.length
          ? <Div paddingRight={'40px'}>
            <Chart
              config={props.config.populationPerAgeBand}
              data={populationTab.populationPerAgeBand.data}
              height="140px"
            />
          </Div>
          : <TabsNoData />}
      </Grid.Column>
    </Grid>
  );
};

export default Population;
