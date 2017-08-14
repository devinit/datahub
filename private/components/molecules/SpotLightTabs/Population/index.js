// @flow
import { Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { red } from 'components/theme/semantic';
import { P } from 'glamorous';
import { big } from 'components/theme';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[]
}

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const popnDistrict = getPageLine('popn-district');
  const popnDistribution = getPageLine('popn-distribution');
  const dependencyRatio = getPageLine('dependency-ratio');
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  const populationTabRegional = props.populationTabRegional;
  return (
    <Grid textAlign={'center'}>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header textAlign="center" as="h3">
          {popnDistrict.title}
        </Header>
        <P color={red}>
          The total population is
          {populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.toolTip
            ? <TabsToolTip {...populationTabRegional.totalPopulation.toolTip} />
            : ''}
        </P>
        <P fontSize={big} fontWeight={'bold'} color={red}>
          {populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.value
            ? populationTabRegional.totalPopulation.value
            : NoData}
        </P>
        <P>
          and the population density is
          {populationTabRegional.populationDensity &&
          populationTabRegional.populationDensity.toolTip
            ? <TabsToolTip {...populationTabRegional.populationDensity.toolTip} />
            : ''}
        </P>
        <P fontSize={big} fontWeight={'bold'}>
          {populationTabRegional.populationDensity && populationTabRegional.populationDensity.value
            ? `${populationTabRegional.populationDensity.value}`
            : NoData}
        </P>
        <P>per sq km</P>
      </Grid.Column>
      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header textAlign="center" as="h3">
          {popnDistribution.title}
          {populationTabRegional.populationDistribution &&
          populationTabRegional.populationDistribution.toolTip
            ? <TabsToolTip {...populationTabRegional.populationDistribution.toolTip} />
            : ''}
        </Header>
      </Grid.Column>

      <Grid.Column computer={5} tablet={16} mobile={16}>
        <Header textAlign="center" as="h3">
          {dependencyRatio.title}
          {populationTabRegional.averageDependencyRatio &&
          populationTabRegional.averageDependencyRatio.toolTip
            ? <TabsToolTip {...populationTabRegional.averageDependencyRatio.toolTip} />
            : ''}
        </Header>
        <P fontSize={big} fontWeight={'bold'} color={red}>
          {populationTabRegional.averageDependencyRatio &&
          populationTabRegional.averageDependencyRatio.value
            ? populationTabRegional.averageDependencyRatio.value
            : NoData}
        </P>
        <P>Compared with the all-district average:</P>
        <P fontSize={big} fontWeight={'bold'}>
          {populationTabRegional.allAverageDependencyRatio &&
          populationTabRegional.allAverageDependencyRatio.value
            ? populationTabRegional.allAverageDependencyRatio.value
            : NoData}
        </P>
      </Grid.Column>
    </Grid>
  );
};
export default Population;
