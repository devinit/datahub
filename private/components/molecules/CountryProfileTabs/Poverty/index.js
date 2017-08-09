// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

type Props = {
 ...TabDataQuery,
 config: any
}

const Poverty = (props: Props) => {
  if (!props.povertyTab) return new Error('No Poverty data');
  const povertyTab = props.povertyTab;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            IS POVERTY REDUCING OVER TIME?
          </Header>
          <Chart config={props.config.area} data={props.povertyTab.poverty190Trend} height="120px" />
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW DEEP IS POVERTY?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.povertyTab.depthOfExtremePoverty}%</P>
          <P>Depth of extreme poverty</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW IS INCOME DISTRIBUTED?
          </Header>
          {
            povertyTab.incomeDistTrend && povertyTab.incomeDistTrend.length ?
              <div>
                <Chart
                  config={props.config.histogram}
                  data={props.povertyTab.incomeDistTrend}
                  height="120px"
                />
                <P fontWeight="bold" textAlign="left" marginTop="1em">
                  Bottom quintile has {povertyTab.incomeDistTrend[0].value} % of the income.
                </P>
              </div>
              : <P fontSize={big} fontWeight={'bold'} color={red}>No data</P>
          }
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
