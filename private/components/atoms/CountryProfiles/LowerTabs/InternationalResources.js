import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {LightBg, SectionHeader} from '../Common';

export const TextBlock = glamorous.div({
  fontSize: '1.2em',
  paddingTop: '1em',
  paddingBottom: '1em',
});

const InternationalResources = () => (
  <LightBg>
    <Container textAlign="center">
      <Grid>
        <Grid.Column width={16} >
          <SectionHeader color={white}>
            INFLOWS <span>VS</span> OUTFLOWS
          </SectionHeader>
          <TextBlock>
            A dynamic mix of resources flow to and from Uganda.
            All resources can play a role in ending poverty,
            though different resources impact poverty directly and indirectly
            through different mechanisms and flow for wide-ranging objectives.
          </TextBlock>
          <TextBlock>
          To understand the value of different resources for poverty
          reduction we must start by understanding the volumes - move the slider
          to explore how official, commercial, private and illicit resources flow to and from Uganda
          </TextBlock>
        </Grid.Column>

      </Grid>
    </Container>
  </LightBg>
);

export default InternationalResources;
