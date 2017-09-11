// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import {TabsNoData, TabsP, HeaderTitle, TabWrapper} from 'components/atoms/TabsText';
import { red } from 'components/theme/semantic';
import { Div, P } from 'glamorous';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import Chart from 'components/atoms/Chart';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[],
  config: Object,
}

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const popnDistrict = getPageLine('popn-district');
  const popnDistribution = getPageLine('popn-distribution');
  const dependencyRatio = getPageLine('dependency-ratio');
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  const populationTabRegional = props.populationTabRegional;
  return (
    <TabWrapper>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {popnDistrict.title}
          </HeaderTitle>
          <P color={red} fontWeight={'bold'}>
            The total population is
            {populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.toolTip
              ? <TabsToolTip {...populationTabRegional.totalPopulation.toolTip} />
              : ''}
          </P>
          <TabsP>
            {populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.value
              ? populationTabRegional.totalPopulation.value
              : NoData}
          </TabsP>
          <P fontWeight={'bold'}>
            and the population density is
            {populationTabRegional.populationDensity &&
            populationTabRegional.populationDensity.toolTip
              ? <TabsToolTip {...populationTabRegional.populationDensity.toolTip} />
              : ''}
          </P>
          <TabsP>
            {populationTabRegional.populationDensity &&
              populationTabRegional.populationDensity.value
              ? `${populationTabRegional.populationDensity.value}`
              : NoData}
          </TabsP>
          <P fontWeight={'bold'}>per sq km</P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {popnDistribution.title}
            {populationTabRegional.populationDistribution &&
            populationTabRegional.populationDistribution.toolTip
              ? <TabsToolTip {...populationTabRegional.populationDistribution.toolTip} />
              : ''}
          </HeaderTitle>

          {populationTabRegional.populationDistribution &&
          populationTabRegional.populationDistribution.data &&
          populationTabRegional.populationDistribution.data.length
            ? <Div paddingRight={'40px'}>
              <Chart
                config={props.config.populationDistribution}
                data={populationTabRegional.populationDistribution.data}
                height="140px"
              />
            </Div>
            : <TabsNoData />}
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {dependencyRatio.title}
            {populationTabRegional.averageDependencyRatio &&
            populationTabRegional.averageDependencyRatio.toolTip
              ? <TabsToolTip {...populationTabRegional.averageDependencyRatio.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {populationTabRegional.averageDependencyRatio &&
            populationTabRegional.averageDependencyRatio.value
              ? populationTabRegional.averageDependencyRatio.value
              : NoData}
          </TabsP>
          <P fontWeight={'bold'}>Compared with the all-district average:</P>
          <TabsP>
            {populationTabRegional.allAverageDependencyRatio &&
            populationTabRegional.allAverageDependencyRatio.value
              ? populationTabRegional.allAverageDependencyRatio.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </TabWrapper>
  );
};
export default Population;
