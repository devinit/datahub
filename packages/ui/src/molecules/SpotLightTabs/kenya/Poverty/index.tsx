import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from '../../../../atoms/Text';
import {TabsToolTip} from '../../../ToolTipContainer';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
import { getPageUnitById } from '@devinit/dh-base/lib/pageData';

import {CSProps} from '../../types';

export type Props = CSProps;

const Poverty = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const poorestPeople = getPageLine('poorestPeople');
  const povertyGap = getPageLine('povertyGap');
  const meanExpenditure = getPageLine('meanExpenditure');
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegionalKe = props.povertyTabRegional as DH.IPovertyTabKe;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {poorestPeople.title}
            {
              TabsToolTip(povertyTabRegionalKe.poorestPeople &&
                povertyTabRegionalKe.poorestPeople.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegionalKe.poorestPeople && povertyTabRegionalKe.poorestPeople.value
              ? `${povertyTabRegionalKe.poorestPeople.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {povertyGap.title}
            {
             TabsToolTip(povertyTabRegionalKe.povertyGap &&
              povertyTabRegionalKe. povertyGap.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegionalKe.povertyGap && povertyTabRegionalKe.povertyGap.value
              ? povertyTabRegionalKe.povertyGap.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {meanExpenditure.title}
            {
             TabsToolTip(povertyTabRegionalKe.meanExpenditure
              && povertyTabRegionalKe.meanExpenditure.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegionalKe.meanExpenditure && povertyTabRegionalKe.meanExpenditure.value
              ? povertyTabRegionalKe.meanExpenditure.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
