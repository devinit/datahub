import { Grid } from 'semantic-ui-react';
import * as React from 'react';
import { Div } from 'glamorous';
import {TabsNoData, TabsP, HeaderTitle, RuralUrbanPopnText} from '../../../atoms/Text';
import Chart from '../../../atoms/Chart';
import { NoData } from '../../../../utils/constants';
import { TabsToolTip } from '../../ToolTip';
import {PageUnit} from '../../../types';
import {getPageUnitById} from '../../../pageData';
import {TabDataQuery} from '../../../gql-types';

export type Props = TabDataQuery & {
  config: any;
  pageData: PageUnit[];
};

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const popnCtry = getPageLine('popn-ctry');
  const popnDistributionAgeCtry = getPageLine('popn-distribution-age-ctry');
  if (!props.populationTab) throw new Error('No Population data');
  const populationTab = props.populationTab;
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <HeaderTitle>
          {popnCtry.title}
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
          <RuralUrbanPopnText />
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
          {popnDistributionAgeCtry.title}
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
