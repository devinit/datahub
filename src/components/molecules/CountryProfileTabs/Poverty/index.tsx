import { Container, Grid } from 'semantic-ui-react';
import * as React from 'react';
import {Div} from 'glamorous';
import Chart from '../../../atoms/Chart';
import {TabsNoData, TabsFootNote, TabsP, HeaderTitle} from '../../../atoms/Text';
import { NoData } from '../../../../utils/constants';
import { TabsToolTip} from '../../ToolTip';
import {PageUnit} from '../../../types';
import {getPageUnitById} from '../../../pageData';
import {TabDataQuery} from '../../../gql-types';

export type Props = TabDataQuery & {
  config: any;
  pageData: PageUnit[];
};

const Poverty = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const povertyReductionCtry = getPageLine('poverty-reduction-ctry');
  const povertyDepthCtry = getPageLine('poverty-depth-ctry');
  const incomeDistributionCtry = getPageLine('income-distribution-ctry');
  if (!props.povertyTab) throw new Error('No Poverty data');
  const povertyTab = props.povertyTab;
  // make typescript f**n happy
  const incomeDistData = povertyTab.incomeDistTrend && povertyTab.incomeDistTrend.data;
  // make typescript f**n happy
  const incomeDistDataObj = incomeDistData && incomeDistData[0];
  // make typescript f**n happy
  const incomeValue: number | string = incomeDistDataObj ? incomeDistDataObj.value : '';
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {povertyReductionCtry.title}
            {povertyTab.poverty190Trend && povertyTab.poverty190Trend.toolTip
              ? <TabsToolTip {...povertyTab.poverty190Trend.toolTip} />
              : ''}
          </HeaderTitle>
          {povertyTab.poverty190Trend && povertyTab.poverty190Trend.data
            && povertyTab.poverty190Trend.data.length
            ? <Chart
              config={props.config.area}
              data={povertyTab.poverty190Trend.data}
              height="120px"
            />
            : <TabsNoData />}
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {povertyDepthCtry.title}
            {povertyTab.depthOfExtremePoverty && povertyTab.depthOfExtremePoverty.toolTip
              ? <TabsToolTip {...povertyTab.depthOfExtremePoverty.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {povertyTab.depthOfExtremePoverty && povertyTab.depthOfExtremePoverty.value
              ? `${povertyTab.depthOfExtremePoverty.value}%`
              : NoData}
          </TabsP>
          <TabsFootNote>Depth of extreme poverty</TabsFootNote>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {incomeDistributionCtry.title}
            {povertyTab.incomeDistTrend && povertyTab.incomeDistTrend.toolTip
              ? <TabsToolTip {...povertyTab.incomeDistTrend.toolTip} />
              : ''}
          </HeaderTitle>
          {incomeDistData && incomeDistData.length
            ? <Div width="70%" margin={'0 auto'}>
              <Chart
                config={props.config.histogram}
                data={incomeDistData.map((d, i) => i ? d : {...d, color: '#e84439'})}
                height="120px"
              />
              <TabsFootNote textAlign="left" lineHeight={2}>
                <span>Bottom quintile has </span>
                <span>
                  {
                    `
                    ${ Number(incomeValue) ?
                      (incomeValue as number).toFixed(1) : ''} % of the income. : ${NoData}
                    `
                  }
                </span>
              </TabsFootNote>
            </Div>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
