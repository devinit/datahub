// @flow
import React, {Component} from 'react';
import glamorous from 'glamorous';
import { Dropdown, Grid, Label, Segment, Container, Header } from 'semantic-ui-react';
import { SectionHeader } from 'components/atoms/Header';
import { makeUnique } from '@devinit/charts/lib/factories/createDataset';
import LoadingBar from 'components/molecules/LoadingBar';
import ExportChart from 'components/molecules/ExportChart';
import TreeChart from 'components/atoms/TreeChart/index';
import Timeline from 'components/atoms/Timeline/index';
import { LightBg } from 'components/atoms/Backgrounds';
import TourContainer from 'components/molecules/TourContainer';
import {PrintContainer} from 'components/atoms/Container';
import GovernmentFinanceTour from 'components/atoms/GovernmentFinanceTour';

type State = {
  year: number,
  budgetTypes: [string],
  budgetType: string,
  currency: string,
  currencies: Object[],
  revenueLevel?: string,
  financeLevel?: string,
  expenditureLevel?: string,
  revenueTrend: Object[],
  financeTrend: Object[],
  expenditureTrend: Object[],
  revenueTree: Object[],
  financeTree: Object[],
  expenditureTree: Object[],
};
type Props = {
  currencyCode: string,
  loading: boolean,
   // from cached shared state
  year?: number,
    // from cached shared state
  budgetType: string,
  startYear: number,
  revenueAndGrants: Object[],
  finance: Object[],
  // for scrolling to this chart, think of it has the chart container ID
  chartId?: string,
  expenditure: Object[],
  data: [],
  config: {
    line: {},
    partition: {},
  },
  cached?: State
};

const CardContainer = glamorous.div({
  background: 'rgb(255,255,255)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  paddingLeft: '0em',
  paddingRight: '1.5em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
});

const HeadingContainer = glamorous.div({
  paddingLeft: '0',
  paddingRight: '0',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
});

export default class GovtRFE extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = this.calculateInitialState(props);
  }

  componentWillReceiveProps(props: Props) {
    this.setState(this.calculateInitialState(props));
  }

  // eslint-disable-next-line react/sort-comp
  calculateInitialState(props: Props) {
    const year = props.year || props.startYear;
    const currencies = [
      { text: 'Constant 2015 US$', value: 'US$' },
      { text: `Current ${props.currencyCode}`, value: props.currencyCode },
    ];
    const currency = 'US$';
    const budgetTypes = this.calculateBudgetTypes(
      [...props.finance, ...props.revenueAndGrants, ...props.expenditure],
      year,
    );
    const budgetType = props.budgetType ? props.budgetType : budgetTypes[0] && budgetTypes[0].value;
    const revenueTrend = this.calculateTrend(props.revenueAndGrants, currency);
    const financeTrend = this.calculateTrend(props.finance, currency);
    const expenditureTrend = this.calculateTrend(props.expenditure, currency);

    const revenueTree = this.calculateTree(revenueTrend, year, budgetType, currency);
    const financeTree = this.calculateTree(financeTrend, year, budgetType, currency);
    const expenditureTree = this.calculateTree(expenditureTrend, year, budgetType, currency);

    return {
      year,
      currencies,
      currency,
      budgetTypes,

      budgetType,

      revenueTrend,
      financeTrend,
      expenditureTrend,

      revenueTree,
      financeTree,
      expenditureTree,
    };
  }
  setYear(year: number) {
    const budgetTypes = this.calculateBudgetTypes(
      [...this.props.finance, ...this.props.revenueAndGrants, ...this.props.expenditure],
      year,
    );
    const budgetType = budgetTypes[0] && budgetTypes[0].value;
    const currency = this.state.currency;

    const revenueTrend = this.calculateTrend(this.props.revenueAndGrants, currency);
    const financeTrend = this.calculateTrend(this.props.finance, currency);
    const expenditureTrend = this.calculateTrend(this.props.expenditure, currency);

    this.setState({
      year,
      budgetType,
      budgetTypes,
      revenueTree: this.calculateTree(revenueTrend, year, budgetType, currency),
      financeTree: this.calculateTree(financeTrend, year, budgetType, currency),
      expenditureTree: this.calculateTree(expenditureTrend, year, budgetType, currency),
    });
  }

  setBudgetType(budgetType: string) {
    const currency = this.state.currency;
    const year = this.state.year;
    this.setState({
      budgetType,
      revenueTree: this.calculateTree(this.state.revenueTrend, year, budgetType, currency),
      financeTree: this.calculateTree(this.state.financeTrend, year, budgetType, currency),
      expenditureTree: this.calculateTree(this.state.expenditureTrend, year, budgetType, currency),
    });
  }

  setCurrency(currency: string) {
    const year = this.state.year;
    const budgetType = this.state.budgetType;
    const revenueTrend = this.calculateTrend(this.props.revenueAndGrants, currency);
    const financeTrend = this.calculateTrend(this.props.finance, currency);
    const expenditureTrend = this.calculateTrend(this.props.expenditure, currency);
    this.setState({
      currency,
      budgetType,
      revenueTrend,
      financeTrend,
      expenditureTrend,
      revenueTree: this.calculateTree(revenueTrend, year, budgetType, currency),
      financeTree: this.calculateTree(financeTrend, year, budgetType, currency),
      expenditureTree: this.calculateTree(expenditureTrend, year, budgetType, currency),
    });
  }

  setRevenueLevel(revenueLevel: string) {
    const leveled = this.props.revenueAndGrants.filter(d => {
      return d.levels.indexOf(revenueLevel) > -1;
    });
    this.setState({
      revenueLevel,
      revenueTrend: this.calculateTrend(leveled, this.state.currency),
    });
  }

  setFinanceLevel(financeLevel: string) {
    const leveled = this.props.finance.filter(d => {
      return d.levels.indexOf(financeLevel) > -1;
    });
    this.setState({
      financeLevel,
      financeTrend: this.calculateTrend(leveled, this.state.currency),
    });
  }

  setExpenditureLevel(expenditureLevel: string) {
    const leveled = this.props.expenditure.filter(d => {
      return d.levels.indexOf(expenditureLevel) > -1;
    });
    this.setState({
      expenditureLevel,
      expenditureTrend: this.calculateTrend(leveled, this.state.currency),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  calculateBudgetTypes(data: Object[], year: number) {
    return makeUnique(data.filter(d => d.year === year).map(d => d.budget_type))
      .sort()
      .map(text => {
        return { text: text.slice(0, 1).toUpperCase() + text.slice(1), value: text, key: text };
      });
  }

  // eslint-disable-next-line class-methods-use-this
  calculateTrend(data: Object[], currency: string = 'US$') {
    return data.map(d => ({
      ...d,
      value: currency === 'US$' ? d.value : d.value_ncu,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  calculateTree(data: Object[], year: number, budgetType: string, currency: string = 'US$') {
    return data
      .filter(d => {
        return d.year === year && d.budget_type === budgetType;
      })
      .map(d => {
        const value = currency === 'US$' ? d.value : d.value_ncu;
        return {
          ...d,
          value,
          color: value > 0 ? null : 'rgb(240, 122, 146)',
          nodeParent: d.levels[d.levels.length - 2],
          nodeId: d.levels[d.levels.length - 1],
        };
      });
  }
  render() {
    if (this.props.loading) {
      return <LoadingBar loading={this.props.loading} />;
    }
    return (
      <LightBg>
        <Segment basic>
          <section>
            <Container id="print-chart">
              <PrintContainer>
                <Segment textAlign="center" vertical>
                  <img src="/img/print-logo.jpg" alt="Development Initiatives" height="50" width="132" />
                  <Header>
                    <Header.Content as="h2">Domestic public resources in Uganda</Header.Content>
                    <Header.Subheader as="h3">www.devinit.org</Header.Subheader>
                  </Header>
                  <Header as="h2">Government revenue, financing and expenditure</Header>
                </Segment>
              </PrintContainer>
              <ExportChart
                printDiv="print-chart"
                stateToShare={{
                  startYear: this.state.year,
                  budgetType: this.state.budgetType,
                  chartId: this.props.chartId
                }}
              />
              <Segment basic clearing style={{ paddingRight: 0, paddingLeft: 0 }}>
                <SectionHeader color="#fff" style={{ float: 'left' }}>
                  REVENUE AND GRANT <span>{this.state.year}</span>
                </SectionHeader>

                <Segment basic floated={'right'} style={{ padding: 0, margin: 0 }}>
                  <Label>Budget Type</Label>
                  <Dropdown
                    selection
                    value={this.state.budgetType}
                    options={this.state.budgetTypes}
                    onChange={(e, data) => this.setBudgetType(data.value)}
                  />
                  <Label>Currency</Label>
                  <Dropdown
                    compact
                    selection
                    value={this.state.currency}
                    options={this.state.currencies}
                    onChange={(e, data) => this.setCurrency(data.value)}
                  />
                </Segment>
              </Segment>

              <Grid>
                <Grid.Column width={5} style={{ paddingRight: 0 }}>
                  <CardContainer style={{ paddingLeft: '30px' }}>
                    <Timeline
                      onYearChanged={year => this.setYear(+year)}
                      height="180px"
                      config={{
                        ...this.props.config.line,
                        anchor: { start: this.state.year.toString() },
                      }}
                      data={this.state.revenueTrend}
                    />
                  </CardContainer>
                </Grid.Column>

                <Grid.Column width={11} style={{ paddingLeft: 0 }}>
                  <TreeChart
                    height="222px"
                    config={{
                      ...this.props.config.partition,
                      labeling: { prefix: this.state.currency },
                    }}
                    onClick={(d: { id: string }) => this.setRevenueLevel(d.id)}
                    data={this.state.revenueTree}
                  />
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column width={5} style={{ paddingRight: 0 }}>
                  <CardContainer style={{ paddingLeft: '30px' }}>
                    <Timeline
                      onYearChanged={year => this.setYear(+year)}
                      height="180px"
                      config={{
                        ...this.props.config.line,
                        anchor: { start: this.state.year.toString() },
                      }}
                      data={this.state.financeTrend}
                    />
                  </CardContainer>
                </Grid.Column>

                <Grid.Column width={11} style={{ paddingLeft: 0 }}>
                  <TreeChart
                    height="222px"
                    config={{
                      ...this.props.config.partition,
                      labeling: { prefix: this.state.currency },
                    }}
                    onClick={(d: { id: string }) => this.setFinanceLevel(d.id)}
                    data={this.state.financeTree}
                  />
                </Grid.Column>

              </Grid>
            </Container>
            <TourContainer
              visible
              closeHandler={() => console.log('test')}
            >
              <GovernmentFinanceTour />
            </TourContainer>
          </section>
          <Container>
            <HeadingContainer>
              <SectionHeader color="#fff">
                FINANCING <span>{this.state.year}</span>
              </SectionHeader>
            </HeadingContainer>
          </Container>
          <Container>
            <Segment basic clearing style={{ paddingRight: 0, paddingLeft: 0 }}>
              <SectionHeader color="#fff" style={{ float: 'left' }}>
                EXPENDITURE <span>{this.state.year}</span>
              </SectionHeader>

              <Segment basic floated={'right'} style={{ padding: 0, margin: 0 }}>
                <Label>Budget Type</Label>
                <Dropdown
                  selection
                  value={this.state.budgetType}
                  options={this.state.budgetTypes}
                  onChange={(e, data) => this.setBudgetType(data.value)}
                />
                <Label>Currency</Label>
                <Dropdown
                  compact
                  selection
                  value={this.state.currency}
                  options={this.state.currencies}
                  onChange={(e, data) => this.setCurrency(data.value)}
                />
              </Segment>
            </Segment>

            <Grid>
              <Grid.Column width={5} style={{ paddingRight: 0 }}>
                <CardContainer style={{ paddingLeft: '30px' }}>
                  <Timeline
                    onYearChanged={year => this.setYear(+year)}
                    height="250px"
                    config={{
                      ...this.props.config.line,
                      anchor: { start: this.state.year.toString() },
                    }}
                    data={this.state.expenditureTrend}
                  />
                </CardContainer>
              </Grid.Column>

              <Grid.Column width={11} style={{ paddingLeft: 0 }}>
                <TreeChart
                  height="292px"
                  config={{
                    ...this.props.config.partition,
                    labeling: { prefix: this.state.currency },
                  }}
                  onClick={(d: { id: string }) => this.setExpenditureLevel(d.id)}
                  data={this.state.expenditureTree}
                />
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </LightBg>
    );
  }
}
