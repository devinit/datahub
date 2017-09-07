// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Container, Dropdown, Grid, Label, Segment } from 'semantic-ui-react';
import { SectionHeader } from 'components/atoms/Header';
import TreeChart from 'components/atoms/TreeChart/index';
import Timeline from 'components/atoms/Timeline/index';

const CardContainer = glamorous.div({
  background: 'rgb(255,255,255)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  paddingLeft: '2em',
  paddingRight: '3em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible',
});

const TreeChartContainer = glamorous.div({
  '& .plot-label-header': {
    fontSize: '1em !important',
  },
  '& .plot-label-value': {
    fontSize: '1.15em !important',
    fontWeight: '500 !important'
  },
});

const groupByYear = groupBy(d => d.year);
const groupByBudgetType = groupBy(d => d.budget_type);

type Props = {
  title: string,
  inverted?: boolean,
  year: number,
  data: Object[],
  currency: string,
  currencyOptions: Object[],
  budgetType: string,
  budgetTypeOptions: Object[],
  config: {
    line: Object,
    partition: Object,
  },
  onChangeYear(year: number): void,
  onChangeCurrency(currency: string): void,
  onChangeBudgetType(budgetType: string): void,
}

type State = {
  treesByYear: Object,
  trend: Object[],
  level: string,
  lowestYear: number,
  highestYear: number,
}

export default class LinePartition extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = this.createInitialState(props);
  }

  componentWillReceiveProps(props: Props) {
    this.setState(this.createInitialState(props));
  }

  setLevel(level: string) {
    const trend = this.createTrendState(level, this.props.currency);

    this.setState({
      level,
      trend,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createInitialState(props: Props) {
    const years = props.data.map(d => d.year);
    const lowestYear = Math.min.apply(null, years);
    const highestYear = Math.max.apply(null, years);
    const [root = {levels: []}] = props.data;
    const level = root.levels[0];

    const trend = this.createTrendState(level, this.props.currency);
    const treesByYear = this.createTreeState(this.props.currency);

    return {
      level,
      trend,
      treesByYear,
      lowestYear,
      highestYear,
    };
  }

  createTreeState(currency: string) {
    const groupedByYear = groupByYear(this.props.data.map(d => {
      const value = currency === 'US$' ? d.value : d.value_ncu;
      return {
        ...d,
        value,
        color: d.value > 0 ? null : 'rgb(240, 122, 146)',
        nodeParent: d.levels[d.levels.length - 2],
        nodeId: d.levels[d.levels.length - 1],
      };
    }));

    const groupedByYearAndBudgetType = {};

    Object.keys(groupedByYear)
      .forEach(year => {
        groupedByYearAndBudgetType[year] = groupByBudgetType(groupedByYear[year]);
      });
    return groupedByYearAndBudgetType;
  }

  createTrendState(level: string, currency: string) {
    return this.props.data
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
  }

  onChangeYear(year: number) {
    this.props.onChangeYear(+year);
  }

  onChangeBudgetType(budgetType: string) {
    this.props.onChangeBudgetType(budgetType);
  }

  onChangeCurrency(currency: string) {
    this.props.onChangeCurrency(currency);
  }

  render() {
    console.log(this.state.treesByYear[this.props.year][this.props.budgetType])
    return (<Container>

      {!this.props.inverted ? '' :
        // eslint-disable-next-line react/jsx-indent
        <LinePartitionHeader
          title={this.props.title}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypeOptions}
          onChangeBudgetType={budgetType => this.onChangeBudgetType(budgetType)}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onChangeCurrency={currency => this.onChangeCurrency(currency)}
        />}

      <Grid>
        <Grid.Column width={5} style={{ paddingRight: 0 }}>
          <CardContainer>
            <Timeline
              onYearChanged={year => this.props.onChangeYear(+year)}
              height="180px"
              config={{
                ...this.props.config.line,
                timeAxis: {
                  ...this.props.config.line.timeAxis,
                  axisMinimum: this.state.lowestYear.toString(),
                  axisMaximum: this.state.highestYear.toString(),
                },
                anchor: { start: this.props.year.toString() },
              }}
              data={this.state.trend}
            />
          </CardContainer>
        </Grid.Column>

        <Grid.Column width={11} style={{ paddingLeft: 0 }}>
          <TreeChartContainer>
            <TreeChart
              height="222px"
              config={{
                ...this.props.config.partition,
                labeling: { prefix: this.props.currency },
              }}
              onClick={(d: { id: string }) => this.setLevel(d.id)}
              data={this.state.treesByYear[this.props.year][this.props.budgetType]}
            />
          </TreeChartContainer>
        </Grid.Column>
      </Grid>

      {this.props.inverted ? '' :
        // eslint-disable-next-line react/jsx-indent
        <LinePartitionHeader
          title={this.props.title}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypeOptions}
          onChangeBudgetType={budgetType => this.onChangeBudgetType(budgetType)}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onChangeCurrency={currency => this.onChangeCurrency(currency)}
        />}

    </Container>);
  }
}

type LinePartitionHeaderProps = {
  title: string,
  year: number,
  budgetType: string,
  budgetTypeOptions: Object[],
  currency: string,
  currencyOptions: Object[],
  onChangeCurrency(currency: string): void,
  onChangeBudgetType(budgetType: string): void,
};

const LinePartitionHeader = (props: LinePartitionHeaderProps) => {
  return (<Segment basic clearing style={{ paddingRight: 0, paddingLeft: 0 }}>
    <SectionHeader color="#fff" style={{ float: 'left' }}>
      {props.title} <span>{props.year}</span>
    </SectionHeader>

    <Segment basic floated={'right'} style={{ padding: 0, margin: 0 }}>
      <Label>Budget Type</Label>
      <Dropdown
        selection
        value={props.budgetType}
        options={props.budgetTypeOptions}
        onChange={(e, data) => props.onChangeBudgetType(data.value)}
      />
      <Label>Currency</Label>
      <Dropdown
        compact
        selection
        value={props.currency}
        options={props.currencyOptions}
        onChange={(e, data) => props.onChangeCurrency(data.value)}
      />
    </Segment>
  </Segment>);
};
