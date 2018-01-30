// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from 'components/atoms/TabsText';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[]
}

const Poverty = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const poorestPeople = getPageLine('poorestPeople');
  const povertyGap = getPageLine('povertyGap');
  const meanExpenditure = getPageLine('meanExpenditure');
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegional = props.povertyTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {poorestPeople.title }
            { // $FlowFixMe
              TabsToolTip(povertyTabRegional.poorestPeople &&
                povertyTabRegional.poorestPeople.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.poorestPeople && povertyTabRegional.poorestPeople.value
              ? `${povertyTabRegional.poorestPeople.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            { povertyGap.title}
            {
              // $FlowFixMe
             TabsToolTip(povertyTabRegional. povertyGap && povertyTabRegional. povertyGap.toolTip) // eslint-disable-line
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.povertyGap && povertyTabRegional.povertyGap.value
              ? povertyTabRegional.povertyGap.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {meanExpenditure.title}
            {
              // $FlowFixMe
             TabsToolTip(povertyTabRegional.meanExpenditure && povertyTabRegional.meanExpenditure.toolTip) // eslint-disable-line
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.meanExpenditure && povertyTabRegional.meanExpenditure.value
              ? povertyTabRegional.meanExpenditure.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
