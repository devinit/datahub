// @flow
import { Container, Grid} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {TabsNoData, TabsFootNote, TabsP, HeaderTitle} from 'components/atoms/TabsText';
import { NoData } from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};
// TODO: move to separate file
const getResourcesOverTime = (data: any[]) =>
  [data]
    .map(list => {
      const years = list.reduce((all, d) => {
        if (all[d.year]) {
          return { ...all, [d.year]: [d, ...all[d.year]] };
        }

        return { [d.year]: [d], ...all };
      }, {});

      const types: any = Object.keys(years).map(y => {
        const types = years[y].reduce((all, d) => {
          if (all[d.flow_type]) {
            return { ...all, [d.flow_type]: [d, ...all[d.flow_type]] };
          }

          return { [d.flow_type]: [d], ...all };
        }, {});

        return Object.keys(types).map(t =>
          types[t].reduce((s, d) => ({ ...s, value: s.value + d.value })),
        );
      });
      return Object.keys(types).map(t => types[t]).reduce((all, d) => [...all, ...d], []);
    })
    .reduce((_, d) => d);

const International = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const shareGniAllocatedToCtry = getPageLine('share-gni-allocated-to-ctry');
  const resourceInflow = getPageLine('resource-inflow');
  const mixtureOfResources = getPageLine('mixture-of-resources');
  if (!props.internationalResources) throw new Error('No international resources data');
  const internationalResources = props.internationalResources;
  const resourcesOverTime =
    internationalResources.resourcesOverTime && internationalResources.resourcesOverTime.data
      ? getResourcesOverTime(internationalResources.resourcesOverTime.data)
      : null;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {shareGniAllocatedToCtry.title ? shareGniAllocatedToCtry.title : ''}
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.toolTip
              ? <TabsToolTip {...internationalResources.netODAOfGNIIn.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.value
              ? `${internationalResources.netODAOfGNIIn.value} of GNI`
              : NoData}
          </TabsP>
          <TabsFootNote>
            Gross national income is{' '}
            {internationalResources.GNI && internationalResources.GNI.value
              ? internationalResources.GNI.value
              : NoData}
          </TabsFootNote>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {resourceInflow.title ? resourceInflow.title : ''}
            {internationalResources.resourcesOverTime &&
            internationalResources.resourcesOverTime.toolTip
              ? <TabsToolTip {...internationalResources.resourcesOverTime.toolTip} />
              : ''}
          </HeaderTitle>
          {resourcesOverTime
            ? <Chart
              config={props.config.resourcesOverTime}
              data={resourcesOverTime}
              height="140px"
            />
            : <TabsNoData />}
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {mixtureOfResources.title ? mixtureOfResources.title : ''}
            {internationalResources.mixOfResources && internationalResources.mixOfResources.toolTip
              ? <TabsToolTip {...internationalResources.mixOfResources.toolTip} />
              : ''}
          </HeaderTitle>
          {internationalResources.mixOfResources && internationalResources.mixOfResources.data
            ? <Chart
              config={props.config.mixOfResources}
              data={internationalResources.mixOfResources.data}
              height="140px"
            />
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
