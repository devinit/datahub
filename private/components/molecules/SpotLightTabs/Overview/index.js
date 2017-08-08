// @flow
import { Container, Header, Grid} from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {NoData} from 'lib/utils/constants';

const Overview = (props: SpotLightTabDataQuery) => {
  if (!props.overviewTabRegional) throw new Error('regional overview data is missing');
  const overviewTabRegional = props.overviewTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
          WHAT PERCENTAGE OF PEOPLE IN BUIKWE LIVE BELOW THE NATIONAL POVERTY LINE?
           {
              overviewTabRegional.poorestPeople &&
              overviewTabRegional.poorestPeople.toolTip ?
                <TabsToolTip {...overviewTabRegional.poorestPeople.toolTip} /> : ''
            }
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{
            overviewTabRegional.poorestPeople &&
            overviewTabRegional.poorestPeople.value ?
            overviewTabRegional.poorestPeople.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
          WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN BUIKWE?
           {
              overviewTabRegional.regionalResources &&
              overviewTabRegional.regionalResources.toolTip ?
                <TabsToolTip {...overviewTabRegional.regionalResources.toolTip} /> : ''
            }
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>${
           overviewTabRegional.regionalResources &&
           overviewTabRegional.regionalResources.value ?
           overviewTabRegional.regionalResources.value : NoData
            }</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
          HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
           {
              overviewTabRegional.localGovernmentSpendPerPerson &&
              overviewTabRegional.localGovernmentSpendPerPerson.toolTip ?
                <TabsToolTip {...overviewTabRegional.localGovernmentSpendPerPerson.toolTip} /> : ''
            }
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{
           overviewTabRegional.localGovernmentSpendPerPerson &&
           overviewTabRegional.localGovernmentSpendPerPerson.value ?
           overviewTabRegional.localGovernmentSpendPerPerson.value : NoData
            }</P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
