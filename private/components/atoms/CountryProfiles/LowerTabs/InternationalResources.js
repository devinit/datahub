import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {LightBg, SectionHeader, Lead} from '../Common';

export const TextBlock = glamorous.div({
  fontSize: '1.3rem',
  paddingLeft: '4em',
  paddingRight: '4em',
});

const InternationalResources = () => (
  <LightBg>
    <Container textAlign="center">
      <Grid>
        <Grid.Column width={16} >
          <SectionHeader color={white}>
            INFLOWS <span>VS</span> OUTFLOWS
          </SectionHeader>
          <Lead>
            <TextBlock>
              A dynamic mix of resources flow to and from Uganda.
              All resources can play a role in ending poverty,
              though different resources impact poverty directly and indirectly
              through different mechanisms and flow for wide-ranging objectives.
            </TextBlock>
          </Lead>
          <Lead>
            <TextBlock>
              To understand the value of different resources for poverty
              reduction we must start by understanding the volumes - move the slider
              to explore how official, commercial, private and illicit
              resources flow to and from Uganda
            </TextBlock>
          </Lead>
        </Grid.Column>

      </Grid>
    </Container>
  </LightBg>
);

export default InternationalResources;
