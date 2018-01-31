// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {Div} from 'glamorous';
import Legend from 'components/atoms/Legend';
import {small} from '../../theme';
import Chart from 'components/atoms/Chart';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {TabsP, HeaderTitle} from 'components/atoms/TabsText';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import { NoData } from 'lib/utils/constants';

type Props = {
  ...SpotLightTabDataQuery,
  currency: string,
  pageData: PageUnit[],
  config: Object,
}

const Overview = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const overviewDistrictPoverty = getPageLine('overview-district-poverty');
  const overviewResources = getPageLine('overview-resources');
  const govtSpendPerPerson = getPageLine('govt-spend-per-person');
  if (!props.overviewTabRegional) throw new Error('regional overview data is missing');
  const overviewTabRegional = props.overviewTabRegional;
  const resourcesUSD = overviewTabRegional.regionalResources &&
    overviewTabRegional.regionalResources.value;
  const resourcesNCU = overviewTabRegional.regionalResources &&
    overviewTabRegional.regionalResources.value_ncu;
  const resourcesValue = props.currency === 'US$' ? resourcesUSD : resourcesNCU;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {overviewDistrictPoverty.title ? overviewDistrictPoverty.title.toUpperCase() : ''}
            {overviewTabRegional.poorestPeople && overviewTabRegional.poorestPeople.toolTip
              ? <TabsToolTip {...overviewTabRegional.poorestPeople.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {overviewTabRegional.poorestPeople && overviewTabRegional.poorestPeople.value
              ? `${overviewTabRegional.poorestPeople.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {overviewResources.title ? overviewResources.title.toUpperCase() : '' }
            {overviewTabRegional.regionalResources && overviewTabRegional.regionalResources.toolTip
              ? <TabsToolTip {...overviewTabRegional.regionalResources.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {resourcesValue ? `${props.currency} ${resourcesValue}` : NoData}
          </TabsP>

          {overviewTabRegional.regionalResourcesBreakdown &&
          overviewTabRegional.regionalResourcesBreakdown.some(obj => obj.data && obj.data.value) ?
            <Grid>
              <Grid.Column width="6">
                <Chart
                  config={props.config.regionalResourcesBreakdown}
                  data={overviewTabRegional.regionalResourcesBreakdown.map(d => d.data)}
                  height="140px"
                />
              </Grid.Column>
              <Grid.Column width="10">
                <Div fontSize={small}>
                  {overviewTabRegional.regionalResourcesBreakdown
                  && overviewTabRegional.regionalResourcesBreakdown.map((datum, i, all) => {
                    const sum = all
                      .reduce((sum, datum) => sum + (datum.data && datum.data.value), 0) / 100;
                    return (
                      <Legend
                        key={datum.data && datum.data.name ? datum.data.name : ''}
                        color={datum.data && datum.data.color ? datum.data.color : ''}
                      >
                        <span><span /></span>
                        <span>
                          {`${Math.round((datum.data && datum.data.value ? datum.data.value : 0) / sum)} `}% {' '}
                          {datum.data && datum.data.name ? datum.data.name.toLowerCase() : ''}
                          {
                            TabsToolTip({ // make flow happy
                              source: datum.toolTip && datum.toolTip.source ? datum.toolTip.source : ' ',
                              heading: datum.data && datum.data.name ? datum.data.name : ' '
                            })

                          }

                        </span>
                      </Legend>);
                  })
                  }
                </Div>
              </Grid.Column>
            </Grid> : ''
          }
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {govtSpendPerPerson.title}
            {overviewTabRegional.localGovernmentSpendPerPerson &&
            overviewTabRegional.localGovernmentSpendPerPerson.toolTip
              ? <TabsToolTip {...overviewTabRegional.localGovernmentSpendPerPerson.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {overviewTabRegional.localGovernmentSpendPerPerson &&
            overviewTabRegional.localGovernmentSpendPerPerson.value
              ? `US$ ${overviewTabRegional.localGovernmentSpendPerPerson.value}`
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Overview;
