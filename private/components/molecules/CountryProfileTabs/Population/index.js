// @flow
import { Grid } from 'semantic-ui-react';
import React from 'react';
import { Div } from 'glamorous';
import {TabsNoData, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import Chart from 'components/atoms/Chart';
import { NoData } from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';

type Props = {
  ...TabDataQuery,
  config: any,
};

const Population = (props: Props) => {
  if (!props.populationTab) throw new Error('No Population data');
  const populationTab = props.populationTab;
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <HeaderTitle>
          WHAT IS THE POPULATION?
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
          WHAT IS THE URBAN VS RURAL SPLIT?
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
          WHAT IS THE AGE PROFILE?
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
