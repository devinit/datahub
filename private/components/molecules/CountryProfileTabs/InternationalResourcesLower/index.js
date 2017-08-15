// @flow
import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import {TextBlock} from 'components/atoms/BodyText';
import { white } from 'components/theme/semantic';
import ChartShare from 'components/molecules/ChartShare';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { SectionHeader } from 'components/atoms/Header';

type Props = {
  children: any[],
  pageData: PageUnit[],
  toolTip: { source?: string, heading?: string}
}

const InternationalResources = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const textBlockA1 = getPageLine('intl-resources-lower-A1');
  const textBlockA2 = getPageLine('intl-resources-lower-A2');
  const textBlockB1 = getPageLine('intl-resources-lower-B1');
  return (
    <Container textAlign="center">
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={12} textAlign="center">
            <SectionHeader color={white}>
              INFLOWS <span>VS</span> OUTFLOWS
            </SectionHeader>
            <TextBlock>{textBlockA1 ? textBlockA1.title : ''}</TextBlock>
            <TextBlock>
              {textBlockA2 ? textBlockA2.title : ''}
              <TabsToolTip {...props.toolTip} color="grey" />
            </TextBlock>
            {props.children[0]}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6} textAlign="center">
            <ChartShare background={false} hover color="grey" size="medium" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12} textAlign="center">
            <SectionHeader color={white}>
              <span>IN DETAIL</span> INTERNATIONAL RESOURCES
            </SectionHeader>
            <TextBlock>{textBlockB1 ? textBlockB1.title : ''}</TextBlock>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {props.children[1]}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6} textAlign="center">
            <ChartShare background={false} hover color="grey" size="medium" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>);
};

export default InternationalResources;
