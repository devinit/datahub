// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {P} from 'glamorous';
import TabsNoData from 'components/atoms/TabsNoData';
import Chart from 'components/atoms/Chart';
import {red} from 'components/theme/semantic';
import {big} from 'components/theme';

type Props = {
  ...TabDataQuery,
  config: any
}

const Government = (props: Props) => {
  if (!props.governmentFinance) return new Error('No Government Finance data');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT IS THE TOTAL REVENUE OF UGANDA?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.governmentFinance.totalRevenue}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW MUCH GOVERNMENT REVENUE COMES FROM EXTERNAL GRANTS (AID)?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.governmentFinance.grantsAsPcOfRevenue}%</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW IS SPENDING ALLOCATED?
          </Header>
          {
            props.governmentFinance.spendingAllocation &&
            props.governmentFinance.spendingAllocation.length ?
              <Chart
                config={props.config.spendingAllocation}
                // TODO: Remove null data from server side
                data={props.governmentFinance.spendingAllocation}
                height="140px"
              /> : <TabsNoData />
          }

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Government;
