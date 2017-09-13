// @flow
import {Container, Grid} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {Span} from 'glamorous';
import {small} from 'components/theme';
import {HeaderTitle, TabsFootNote, TabsNoData, TabsP} from 'components/atoms/TabsText';
import {NoData} from 'lib/utils/constants';
import TabsToolTip from 'components/molecules/TabsToolTip';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import Legend from 'components/atoms/Legend';

type Props = {
  ...TabDataQuery,
  config: any,
  pagesData: PageUnit[],
};

const International = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const shareGniAllocatedToCtry = getPageLine('share-gni-allocated-to-ctry');
  const resourceInflow = getPageLine('resource-inflow');
  const mixtureOfResources = getPageLine('mixture-of-resources');
  const internationalResources = props.internationalResources;
  if (!internationalResources) throw new Error('Internationa resources missing');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {shareGniAllocatedToCtry.title}
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.toolTip
              ? <TabsToolTip {...internationalResources.netODAOfGNIIn.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {internationalResources.netODAOfGNIIn && internationalResources.netODAOfGNIIn.value
            && Number(internationalResources.netODAOfGNIIn.value)
              ? `${internationalResources.netODAOfGNIIn.value}% of GNI`
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
            {resourceInflow.title }
            {internationalResources.resourceInflowsOverTime &&
            internationalResources.resourceInflowsOverTime.toolTip
              ? <TabsToolTip {...internationalResources.resourceInflowsOverTime.toolTip} />
              : ''}
          </HeaderTitle>
          {internationalResources.resourceInflowsOverTime &&
            internationalResources.resourceInflowsOverTime.data
            ? <Chart
              config={props.config.resourcesOverTime}
              data={internationalResources.resourceInflowsOverTime.data}
              height="140px"
            />
            : <TabsNoData />}
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {mixtureOfResources.title}
            {internationalResources.mixOfResources && internationalResources.mixOfResources.toolTip
              ? <TabsToolTip {...internationalResources.mixOfResources.toolTip} />
              : ''}
          </HeaderTitle>
          {internationalResources.mixOfResources && internationalResources.mixOfResources.data ?
            <Grid>
              <Grid.Column width="2" />
              <Grid.Column width="6">
                <Chart
                  config={props.config.mixOfResources}
                  data={internationalResources.mixOfResources.data}
                  height="140px"
                />
              </Grid.Column>
              <Grid.Column width="8">
                <div>
                  {internationalResources.mixOfResources.data.map((d, i) =>
                    (<Legend
                      color={props.config.mixOfResources.colors[i]}
                      key={`${d[props.config.mixOfResources.circular.label]}_${props.config.mixOfResources.colors[i]}`}
                    >
                      <span><span /></span>
                      <Span fontSize={small}>{d[props.config.mixOfResources.circular.label]}</Span>
                    </Legend>)
                  )}
                </div>
              </Grid.Column>
            </Grid>
            : <TabsNoData />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
