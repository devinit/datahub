import { Container, Header, Grid, Divider } from 'semantic-ui-react';
import glamorous from 'glamorous';
import React from 'react';
import { white } from 'components/theme/semantic';
import ExportChart from 'components/molecules/ExportChart';
import ChartFilter from 'components/molecules/CountryProfileChartFilter';
import {SectionHeader} from 'components/atoms/Header';


const Lead = glamorous.span({
  fontSize: '1.5rem',
  fontWeight: '300',
  textAlign: 'center',
  '& span': {
    paddingRight: '2px',
    paddingLeft: '2px',
    fontWeight: '600',
  }
});

const ChartSection = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em'
});

const Government = () => (
  <Container>
    <Grid centered >
      <Grid.Row>
        <Grid.Column width={8} textAlign="center">
          <Lead>
            How does Uganda finance and spend its budget?
              <span>Move the year slider</span>or <span>click a box</span> to drill down.
          </Lead>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} textAlign="center">
          <Header as="h2">Government revenue, financing and expenditure</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider />
    <ChartSection>
      <ExportChart />
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <SectionHeader color={white}>
              REVENUE AND GRANTS <span>2015</span>
            </SectionHeader>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <ChartFilter />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <SectionHeader color={white}>
              FINANCING <span>2015</span>
            </SectionHeader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ChartSection>
    <Header as="h2" textAlign="center">Expenditure</Header>
    <Divider />
    <ChartSection>
      <ExportChart />
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <SectionHeader color={white}>
              EXPENDITURE <span>2015</span>
            </SectionHeader>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <ChartFilter />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ChartSection>
  </Container>
);

export default Government;
