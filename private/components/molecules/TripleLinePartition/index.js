// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Container, Dropdown, Grid, Header, Label, Segment } from 'semantic-ui-react';
import { SectionHeader } from 'components/atoms/Header';
import { makeUnique } from '@devinit/charts/lib/factories/createDataset';
import LoadingBar from 'components/molecules/LoadingBar';
import ExportChart from 'components/molecules/ExportChart';
import TreeChart from 'components/atoms/TreeChart/index';
import Timeline from 'components/atoms/Timeline/index';
import { LightBg } from 'components/atoms/Backgrounds';
import TourContainer from 'components/molecules/TourContainer';
import { PrintContainer } from 'components/atoms/Container';
import GovernmentFinanceTour from 'components/atoms/GovernmentFinanceTour';

type State = {
  year: number,
  revenueTourVisible: boolean,
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
  shouldScrollIntoView?: boolean,
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
  cached?: State,
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

export default class TripleLinePartition extends Component {
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

    const revenueTree = this.calculateTree(props.revenueAndGrants, year, budgetType, currency);
    const financeTree = this.calculateTree(props.finance, year, budgetType, currency);
    const expenditureTree = this.calculateTree(props.expenditure, year, budgetType, currency);

    return {
      revenueTourVisible: false,
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

  toogleRevenueTour() {
    if (this.state.revenueTourVisible) {
      this.setState({ revenueTourVisible: false });
    } else {
      this.setState({ revenueTourVisible: true });
    }
  }

  setYear(year: number) {
    const budgetTypes = this.calculateBudgetTypes(
      [...this.props.finance, ...this.props.revenueAndGrants, ...this.props.expenditure],
      year,
    );
    const budgetType = budgetTypes[0] && budgetTypes[0].value;
    const currency = this.state.currency;

    this.setState({
      year,
      budgetType,
      budgetTypes,
      revenueTree: this.calculateTree(this.props.revenueAndGrants, year, budgetType, currency),
      financeTree: this.calculateTree(this.props.finance, year, budgetType, currency),
      expenditureTree: this.calculateTree(this.props.expenditure, year, budgetType, currency),
    });
  }

  setBudgetType(budgetType: string) {
    const currency = this.state.currency;
    const year = this.state.year;
    const revenueTree = this.calculateTree(this.props.revenueAndGrants, year, budgetType, currency);
    const financeTree = this.calculateTree(this.props.finance, year, budgetType, currency);
    const expenditureTree = this.calculateTree(this.props.expenditure, year, budgetType, currency);

    this.setState({
      budgetType,
      revenueTree,
      financeTree,
      expenditureTree,
    });
  }

  setCurrency(currency: string) {
    const year = this.state.year;
    const budgetType = this.state.budgetType;
    const revenueTrend = this.calculateTrend(this.props.revenueAndGrants, currency);
    const financeTrend = this.calculateTrend(this.props.finance, currency);
    const expenditureTrend = this.calculateTrend(this.props.expenditure, currency);
    const revenueTree = this.calculateTree(this.props.revenueAndGrants, year, budgetType, currency);
    const financeTree = this.calculateTree(this.props.finance, year, budgetType, currency);
    const expenditureTree = this.calculateTree(this.props.expenditure, year, budgetType, currency);

    this.setState({
      currency,
      budgetType,
      revenueTrend,
      financeTrend,
      expenditureTrend,
      revenueTree,
      financeTree,
      expenditureTree,
    });
  }

  setRevenueLevel(revenueLevel: string) {
    const revenueTrend = this.calculateTrend(
      this.props.revenueAndGrants,
      this.state.currency,
      revenueLevel,
    );

    this.setState({
      revenueLevel,
      revenueTrend,
    });
  }

  setFinanceLevel(financeLevel: string) {
    const financeTrend = this.calculateTrend(this.props.finance, this.state.currency, financeLevel);

    this.setState({
      financeLevel,
      financeTrend,
    });
  }

  setExpenditureLevel(expenditureLevel: string) {
    const expenditureTrend = this.calculateTrend(
      this.props.expenditure,
      this.state.currency,
      expenditureLevel,
    );

    this.setState({
      expenditureLevel,
      expenditureTrend,
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
  calculateTrend(data: Object[], currency: string = 'US$', level?: string) {
    const trend = data
      .filter(d => {
        const isActualOrProjected = d.budget_type.match(/(actual|proj)/gi);
        const isAtSelectedLevel = level
          ? d.levels.length - 1 === d.levels.indexOf(level)
          : d.levels.length === 1;

        return isActualOrProjected && isAtSelectedLevel;
      })
      .map(d => ({
        ...d,
        value: currency === 'US$' ? d.value : d.value_ncu,
      }));
    return trend;
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
      <LightBg
        innerRef={node => (this.props.shouldScrollIntoView && node ? node.scrollIntoView() : null)}
      >
        <Segment basic>
          <section>
            <Container id="print-chart">
              <PrintContainer>
                <Segment textAlign="center" vertical>
                  <img
                    src="/img/print-logo.jpg"
                    alt="Development Initiatives"
                    height="50"
                    width="132"
                  />
                  <Header>
                    <Header.Content as="h2">Domestic public resources in Uganda</Header.Content>
                    <Header.Subheader as="h3">www.devinit.org</Header.Subheader>
                  </Header>
                  <Header as="h2">Government revenue, financing and expenditure</Header>
                </Segment>
              </PrintContainer>
              <ExportChart
                onViewVisualization={() => this.toogleRevenueTour()}
                printDiv="print-chart"
                stateToShare={{
                  startYear: this.state.year,
                  budgetType: this.state.budgetType,
                  chartId: this.props.chartId,
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
              visible={this.state.revenueTourVisible}
              closeHandler={() => this.toogleRevenueTour()}
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
