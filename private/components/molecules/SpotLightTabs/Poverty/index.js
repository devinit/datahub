// @flow
import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { P } from 'glamorous';
import { big } from 'components/theme';
import { red } from 'components/theme/semantic';
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
  const povertyLevels = getPageLine('poverty-levels');
  const lifeExpectancy = getPageLine('life-expectancy');
  const stdOfLiving = getPageLine('std-of-living');
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegional = props.povertyTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {povertyLevels.title}
            {povertyTabRegional.poorestPeople && povertyTabRegional.poorestPeople.toolTip
              ? <TabsToolTip {...povertyTabRegional.poorestPeople.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {povertyTabRegional.poorestPeople && povertyTabRegional.poorestPeople.value
              ? povertyTabRegional.poorestPeople.value
              : NoData}
          </P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {lifeExpectancy.title}
            {povertyTabRegional.lifeExpectancy && povertyTabRegional.lifeExpectancy.toolTip
              ? <TabsToolTip {...povertyTabRegional.lifeExpectancy.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {povertyTabRegional.lifeExpectancy && povertyTabRegional.lifeExpectancy.value
              ? povertyTabRegional.lifeExpectancy.value
              : NoData}
          </P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            {stdOfLiving.title}
            {povertyTabRegional.stdOfLiving && povertyTabRegional.stdOfLiving.toolTip
              ? <TabsToolTip {...povertyTabRegional.stdOfLiving.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {povertyTabRegional.stdOfLiving && povertyTabRegional.stdOfLiving.value
              ? povertyTabRegional.stdOfLiving.value
              : NoData}
          </P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
