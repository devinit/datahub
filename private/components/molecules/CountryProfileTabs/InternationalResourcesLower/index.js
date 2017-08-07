import { Container, Grid } from 'semantic-ui-react';
import React from 'react';
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {Select} from 'components/molecules/CountryProfileChartFilter';
import ChartShare from 'components/molecules/ChartShare';
import YearSlider from 'components/molecules/YearSlider';
import {SectionHeader} from 'components/atoms/Header';

export const TextBlock = glamorous.p({
  fontSize: '1.1em',
  paddingLeft: '1em',
  paddingRight: '1em',
  paddingTop: '1.1em',
  lineHeight: '1.5',
  fontWeight: 300,
});
const FlexSpace = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});
const InternationalResources = () => (
  <Container textAlign="center">
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={12} textAlign="center">
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
              to explore how official, commercial, private and illicit
              resources flow to and from Uganda
            </TextBlock>
          <FlexSpace>
            <SectionHeader color={white}>
              RESOURCE FLOWS TO UGANDA <span>4.4BN</span>
            </SectionHeader>
            <SectionHeader color={white}>
              RESOURCE FLOWS LEAVING UGANDA <span>1.2BN</span>
            </SectionHeader>
          </FlexSpace>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6} textAlign="center">
          <YearSlider />
          <ChartShare color="grey" size="medium" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} textAlign="center">
          <SectionHeader color={white}>
            <span>IN DETAIL</span> INTERNATIONAL RESOURCES
          </SectionHeader>
          <TextBlock>
              Where are international resources originating and where are they destined?
              Start by selecting inflows or outflows:
            </TextBlock>
          <Select>
            <option>Inflows in Uganda</option>
            <option>Outflows in Uganda</option>
          </Select>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default InternationalResources;
