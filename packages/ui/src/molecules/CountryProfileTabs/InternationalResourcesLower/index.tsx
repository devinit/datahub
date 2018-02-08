// @flow
import { Container, Grid } from 'semantic-ui-react';
import * as React from 'react';
import {TextBlock} from '../../../atoms/BodyText';
import { white } from '../../../theme/semantic';
import {PageUnit} from '@devinit/dh-base/lib/PagesData';
import {getPageUnitById} from '@devinit/dh-base/lib/PagesData';
import TabsToolTip from '../../TabsToolTip';
import { SectionHeader } from '../../../atoms/Header';

interface Props {
  children: any[];
  pageData: PageUnit[];
  toolTip: { source?: string, heading?: string};
}

const InternationalResources = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const textBlockA1 = getPageLine('intl-resources-lower-A1');
  const textBlockA2 = getPageLine('intl-resources-lower-A2');
  const textBlockB1 = getPageLine('intl-resources-lower-B1');
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <SectionHeader color={white}>
              INFLOWS <span>VS</span> OUTFLOWS
            </SectionHeader>
            <TextBlock>{textBlockA1 ? textBlockA1.title : ''}</TextBlock>
            <TextBlock>
              {textBlockA2 ? textBlockA2.title : ''}
              <TabsToolTip {...props.toolTip}  color="grey" />
            </TextBlock>
            {props.children[0]}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
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
      </Grid>
    </Container>);
};

export default InternationalResources;
