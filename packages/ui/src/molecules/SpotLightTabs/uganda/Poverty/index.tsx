import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from '../../../../atoms/Text';
import {TabsToolTip} from '../../../ToolTip';
import { NoData } from '@devinit/dh-base/lib/utils/constants';
import {CSProps} from '../../types';
import { getPageUnitById } from '@devinit/dh-base/lib/pageData';

export type Props = CSProps &  {
  config: any;
};

const Poverty = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const povertyLevels = getPageLine('poverty-levels');
  const lifeExpectancy = getPageLine('life-expectancy');
  const stdOfLiving = getPageLine('std-of-living');
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegional = props.povertyTabRegional as DH.IPovertyTabUg;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {povertyLevels.title ? povertyLevels.title.toUpperCase() : ''}
            {
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
            {lifeExpectancy.title}
            {
             TabsToolTip(povertyTabRegional.lifeExpectancy &&
              povertyTabRegional.lifeExpectancy.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.lifeExpectancy && povertyTabRegional.lifeExpectancy.value
              ? povertyTabRegional.lifeExpectancy.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {stdOfLiving.title}
            {
             TabsToolTip(povertyTabRegional.stdOfLiving &&
              povertyTabRegional.stdOfLiving.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.stdOfLiving && povertyTabRegional.stdOfLiving.value
              ? povertyTabRegional.stdOfLiving.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
