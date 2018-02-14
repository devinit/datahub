import * as React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from '../../../../atoms/TabsText';
import { P} from 'glamorous';
import TabsToolTip from '../../../TabsToolTip';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
import { getPageUnitById } from '@devinit/dh-base/lib/pageData';
import {CSProps} from '../../types';

export type Props = CSProps;

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const totalPopulation = getPageLine('totalPopulation');
  const populationDensity = getPageLine('populationDensity');
  const populationBirthRate = getPageLine('populationBirthRate');
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  const populationTabRegionalKe = props.populationTabRegional as DH.IPopulationTabRegionalKe;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {totalPopulation.title}
            {
              TabsToolTip(populationTabRegionalKe.totalPopulation && populationTabRegionalKe.totalPopulation.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {populationTabRegionalKe.totalPopulation && populationTabRegionalKe.totalPopulation.value
              ? populationTabRegionalKe.totalPopulation.value
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {populationDensity.title}
            {
              TabsToolTip(populationTabRegionalKe.populationDensity &&
                populationTabRegionalKe.populationDensity.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {populationTabRegionalKe.populationDensity &&
              populationTabRegionalKe.populationDensity.value
              ? `${populationTabRegionalKe.populationDensity.value}`
              : NoData}
          </TabsP>
          <P fontWeight={'bold'}>per sq km</P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {populationBirthRate.title}
            {
              TabsToolTip(populationTabRegionalKe.populationBirthRate
                && populationTabRegionalKe.populationBirthRate.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {populationTabRegionalKe.populationBirthRate &&
            populationTabRegionalKe.populationBirthRate.value
              ? populationTabRegionalKe.populationBirthRate.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Population;
