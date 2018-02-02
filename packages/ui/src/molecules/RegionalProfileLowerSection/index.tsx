import { Container, Header, Grid, Divider } from 'semantic-ui-react';
import React from 'react';
import ExportChart from '../ExportChart';
import { LightBg } from '../../atoms/Backgrounds';
import ChartFilter from '../CountryProfileChartFilter';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  paddingTop: '1em',
});

const RegionalProfileLowerSection = () =>
  (<Wrapper>
    <LightBg>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Header as="h2" textAlign="center">
                Revenue
              </Header>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="right">
              <ExportChart />
              <ChartFilter />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Header as="h2" textAlign="center">
                Expenditure
              </Header>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="right">
              <ExportChart />
              <ChartFilter />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </LightBg>
  </Wrapper>);

export default RegionalProfileLowerSection;
