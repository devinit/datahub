import * as React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import {TabsNoData, TabsP, HeaderTitle, RuralUrbanPopnText} from '../../../../atoms/Text';
import { red } from '../../../../theme/semantic';
import { Div, P} from 'glamorous';
import { TabsToolTip} from '../../../ToolTip';
import { NoData } from '../../../../../utils/constants';
import Chart from '../../../../atoms/Chart';
import {CSProps} from '../../types';
import { getPageUnitById } from '../../../../pageData';

export type Props = CSProps &  {
  config: any;
};

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const popnDistrict = getPageLine('popn-district');
  const dependencyRatio = getPageLine('dependency-ratio');
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  const populationTabRegional = props.populationTabRegional as DH.IPopulationTabRegionalUg;
  return (
    <Container>
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
            <RuralUrbanPopnText />
            {
              TabsToolTip(populationTabRegional.populationDistribution
                && populationTabRegional.populationDistribution.toolTip)
            }
          </HeaderTitle>

          {populationTabRegional.populationDistribution &&
          populationTabRegional.populationDistribution.data &&
          populationTabRegional.populationDistribution.data.length
            ? <Div paddingRight={'40px'} paddingTop={'2.5em'}>
              <Chart
                config={props.config.populationDistribution}
                data={populationTabRegional.populationDistribution.data}
                height="160px"
              />
            </Div>
            : <TabsNoData />}
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {dependencyRatio.title}
            {
              TabsToolTip(populationTabRegional.averageDependencyRatio
                && populationTabRegional.averageDependencyRatio.toolTip)
            }
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
    </Container>
  );
};
export default Population;
