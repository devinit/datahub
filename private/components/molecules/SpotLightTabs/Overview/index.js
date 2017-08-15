// @flow
import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { P } from 'glamorous';
import { big } from 'components/theme';
import { red } from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { NoData } from 'lib/utils/constants';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[]
}

const Overview = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const overviewDistrictPoverty = getPageLine('overview-district-poverty');
  const overviewResources = getPageLine('overview-resources');
  const govtSpendPerPerson = getPageLine('govt-spend-per-person');
  if (!props.overviewTabRegional) throw new Error('regional overview data is missing');
  const overviewTabRegional = props.overviewTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {overviewDistrictPoverty.title}
            {overviewTabRegional.poorestPeople && overviewTabRegional.poorestPeople.toolTip
              ? <TabsToolTip {...overviewTabRegional.poorestPeople.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {overviewTabRegional.poorestPeople && overviewTabRegional.poorestPeople.value
              ? overviewTabRegional.poorestPeople.value
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {overviewResources.title}
            {overviewTabRegional.regionalResources && overviewTabRegional.regionalResources.toolTip
              ? <TabsToolTip {...overviewTabRegional.regionalResources.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            ${overviewTabRegional.regionalResources && overviewTabRegional.regionalResources.value
              ? overviewTabRegional.regionalResources.value
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {govtSpendPerPerson.title}
            {overviewTabRegional.localGovernmentSpendPerPerson &&
            overviewTabRegional.localGovernmentSpendPerPerson.toolTip
              ? <TabsToolTip {...overviewTabRegional.localGovernmentSpendPerPerson.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {overviewTabRegional.localGovernmentSpendPerPerson &&
            overviewTabRegional.localGovernmentSpendPerPerson.value
              ? overviewTabRegional.localGovernmentSpendPerPerson.value
              : NoData}
          </P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
