// @flow
/* eslint-disable max-len */
import * as React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from '../../../../atoms/TabsText';
import { P} from 'glamorous';
import TabsToolTip from '../../../TabsToolTip';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
// import type {PageUnit} from 'components/organisms/PagesData';
// import {getPageUnitById} from 'components/organisms/PagesData';

interface Props  {
  ...SpotLightTabDataQuery;
  pageData: PageUnit[];
  config: object;
}

const Population = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const totalPopulation = getPageLine('totalPopulation');
  const populationDensity = getPageLine('populationDensity');
  const populationBirthRate = getPageLine('populationBirthRate');
  if (!props.populationTabRegional) throw new Error('regional population data is missing');
  const populationTabRegional = props.populationTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {totalPopulation.title}
            { // $FlowFixMe
              TabsToolTip(populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {populationTabRegional.totalPopulation && populationTabRegional.totalPopulation.value
              ? populationTabRegional.totalPopulation.value
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            { populationDensity.title}
            { // $FlowFixMe
              TabsToolTip(populationTabRegional.populationDensity && populationTabRegional.populationDensity.toolTip)
            }
          </HeaderTitle>
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
            {populationBirthRate.title}
            { // $FlowFixMe
              TabsToolTip(populationTabRegional.populationBirthRate && populationTabRegional.populationBirthRate.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {populationTabRegional.populationBirthRate &&
            populationTabRegional.populationBirthRate.value
              ? populationTabRegional.populationBirthRate.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Population;
