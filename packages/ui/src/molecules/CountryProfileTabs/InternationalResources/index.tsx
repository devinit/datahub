import {Container, Grid} from 'semantic-ui-react';
import * as React from 'react';
import Chart from '../../../atoms/Chart';
import {Span} from 'glamorous';
import {small} from '../../../theme';
import {HeaderTitle, TabsFootNote, TabsNoData, TabsP} from '../../../atoms/TabsText';
import {NoData, DONOR} from '@devinit/dh-base/lib/utils/constants';
import TabsToolTip from '../../TabsToolTip';
import {PageUnit, getPageUnitById} from '@devinit/dh-base/lib/pageData';
import Legend from '../../../atoms/Legend';
import { TabsData } from '../types';

export type Props = TabsData & {
  config: any;
  countryType: string;
  pagesData: PageUnit[];
};

const International = (props: Props) => {
  const getPageLine = getPageUnitById(props.pagesData);
  const shareGniAllocatedToCtry = getPageLine('share-gni-allocated-to-ctry');
  const resourceInflow = getPageLine('resource-inflow');
  const mixtureOfResources = getPageLine('mixture-of-resources');
  const internationalResources = props.internationalResources;
  if (!internationalResources) throw new Error('International resources tabd data missing');
  let shareOfGNITitle = shareGniAllocatedToCtry.title;
  let shareOfGNITitleToolTip = { source: '', heading: ''};
  let shareOfGNIValue = NoData;
  if (props.countryType === DONOR && internationalResources.netODAOfGNIOut) {
    shareOfGNITitleToolTip =
      internationalResources.netODAOfGNIOut.toolTip || shareOfGNITitleToolTip;
    shareOfGNITitle = shareGniAllocatedToCtry.donor_title || '';
    shareOfGNIValue = internationalResources.netODAOfGNIOut.value || shareOfGNIValue;
  }
  if (props.countryType !== DONOR && internationalResources.netODAOfGNIIn) {
    shareOfGNITitleToolTip = internationalResources.netODAOfGNIIn.toolTip || shareOfGNITitleToolTip;
    shareOfGNIValue = internationalResources.netODAOfGNIIn.value || shareOfGNIValue;
  }
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {shareOfGNITitle ? shareOfGNITitle.toUpperCase() : ''}
            <TabsToolTip {...shareOfGNITitleToolTip} />
          </HeaderTitle>
          <TabsP>
            {shareOfGNIValue}% of GNI
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
            {props.countryType === DONOR ? resourceInflow.donor_title : resourceInflow.title}
            {internationalResources.resourceflowsOverTime &&
            internationalResources.resourceflowsOverTime.toolTip
              ? <TabsToolTip {...internationalResources.resourceflowsOverTime.toolTip} />
              : ''}
          </HeaderTitle>
          {internationalResources.resourceflowsOverTime &&
            internationalResources.resourceflowsOverTime.data
            ? <Chart
              config={props.config.resourcesOverTime}
              data={internationalResources.resourceflowsOverTime.data}
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
                  {internationalResources.mixOfResources.data.map((d: any) =>
                    (<Legend
                      color={d.color}
                      key={`${d[props.config.mixOfResources.circular.label]}_${d.color}`}
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
