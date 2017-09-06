// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { groupBy } from 'ramda/src/groupBy';
import { Dropdown, Grid, Label, Segment } from 'semantic-ui-react';
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

type Props = {
  headerTitle: string,
  headerPosition: 'top' | 'bottom',
  showHeaderOptions: boolean,
  config: {
    line: Object,
    partition: Object,
  },
  data: Object[],
  currency: string,
  currencies: Object[],
  year: string,
  budgetType: string,
  budgetTypes: Object[],
  setBudgetType(budgetType: string): void,
  setYear(year: number): void,
  setCurrency(currency: string): void,
}

type State = {
  treesByYear: Object,
  trend: Object[],
  level: string,
}

export default class TripleLinePartition extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);
    this.setState(this.createInitialState(props));
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
    const level = props.data.find(d => d.levels.length === 1).levels[0];

    const trend = this.createTrendState(level, this.props.currency);
    const treesByYear = this.createTreeState(this.props.budgetType, this.props.currency);

    return {
      level,
      trend,
      treesByYear,
    };
  }

  createTreeState(budgetType: string, currency: string) {
    return groupByYear(this.props.data
      .filter(d => d.budget_type === budgetType)
      .map(d => {
        const value = currency === 'US$' ? d.value : d.value_ncu;
        return {
          ...d,
          value,
          color: value > 0 ? null : 'rgb(240, 122, 146)',
          nodeParent: d.levels[d.levels.length - 2],
          nodeId: d.levels[d.levels.length - 1],
        };
      })
    );
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

  render() {
    return (<div>
      {this.props.headerPosition !== 'top' ? '' :
        <LinePartitionHeader
          title={this.props.headerTitle}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypes}
          onChangeBudgetType={this.props.setBudgetType}
          currency={this.props.currency}
          currencyOptions={this.props.currencies}
          onChangeCurrency={this.props.setCurrency}
        />}

      <Grid>
        <Grid.Column width={5} style={{ paddingRight: 0 }}>
          <CardContainer>
            <Timeline
              onYearChanged={year => this.props.setYear(+year)}
              height="180px"
              config={{
                ...this.props.config.line,
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
                labeling: { prefix: this.state.currency },
              }}
              onClick={(d: { id: string }) => this.setLevel(d.id)}
              data={this.state.treesByYear[this.props.year]}
            />
          </TreeChartContainer>
        </Grid.Column>
      </Grid>

      {this.props.headerPosition !== 'bottom' ? '' :
        <LinePartitionHeader
          title={this.props.headerTitle}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypes}
          onChangeBudgetType={this.props.setBudgetType}
          currency={this.props.currency}
          currencyOptions={this.props.currencies}
          onChangeCurrency={this.props.setCurrency}
        />}

    </div>);
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
