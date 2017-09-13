// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Container, Grid } from 'semantic-ui-react';
import TreeChart from 'components/atoms/TreeChart/index';
import Timeline from 'components/atoms/Timeline/index';
import LinePartitionHeader from 'components/atoms/LinePartitionHeader';

const CardContainer = glamorous.div({
  background: 'rgb(255,255,255)',
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
  lowestYear: number,
  highestYear: number,
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
  treesByYear: {
    [year: number]: {
      [budgetType: string]: Object[]
    }
  },
  trend: Object[],
  level: string
}

export default class LinePartition extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = this.createInitialState(props);
  }

  setLevel(level: string) {
    const trend = this.createTrendState(level);

    this.setState({
      level,
      trend,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createInitialState(props: Props) {
    const [root = {levels: []}] = props.data;
    const level = root.levels[0];

    const trend = this.createTrendState(level);
    const treesByYear = this.createTreeStateByYearAndBudgetType();

    return {
      level,
      trend,
      treesByYear,
    };
  }

  /**
   * Creates a three-dimensional map of data
   * {
   *  [year]: {
   *    [budgetType]: [...]
   *  }
   * }
   * @returns {{}}
   */
  createTreeStateByYearAndBudgetType() {
    const groupedByYear = groupByYear(this.props.data
      .map(datum => {
        return {
          ...datum,
          // Hack: Coloring nodes with negative values to red
          color: datum.value > 0 ? datum.color : 'rgb(240, 122, 146)',
          nodeParent: datum.levels[datum.levels.length - 2],
          nodeId: datum.levels[datum.levels.length - 1],
        };
      }));

    const groupedByYearAndBudgetType = {};

    Object.keys(groupedByYear)
      .forEach(year => {
        groupedByYearAndBudgetType[year] = groupByBudgetType(groupedByYear[year]);
      });
    return groupedByYearAndBudgetType;
  }

  createTrendState(level: string) {
    const allBudgetTypes = Object.keys(
      this.props.data
        .reduce((acc, datum) => ({...acc, [datum.budget_type]: true}), {})
    );
    const regexString = allBudgetTypes.length > 2 ?
      allBudgetTypes.filter(d => !d.match(/budget/gi)).join('|') :
      allBudgetTypes.join('|');
    const regex = new RegExp(`(${regexString})`, 'gi');
    return this.props.data
      .filter(d => {
        const isActualOrProjected = d.budget_type.match(regex);
        const isAtSelectedLevel = level
          ? d.levels.length - 1 === d.levels.indexOf(level)
          : d.levels.length === 1;

        return isActualOrProjected && isAtSelectedLevel;
      });
  }

  render() {
    const treeOfYear = this.state.treesByYear[this.props.year] || {};
    const treeOfBudgetType = treeOfYear[this.props.budgetType] || [];
    const tree = treeOfBudgetType
      .map(datum => {
        const value = this.props.currency === 'US$' ? datum.value : datum.value_ncu;
        return {
          ...datum,
          value,
        };
      });
    const trend = this.state.trend
      .map(datum => {
        const value = this.props.currency === 'US$' ? datum.value : datum.value_ncu;
        return {
          ...datum,
          value,
        };
      });

    const showLegend = this.props.config.partition.legend &&
      this.props.config.partition.legend.showLegend;

    return (<Container>

      {this.props.inverted ? '' :
        // eslint-disable-next-line react/jsx-indent
        <LinePartitionHeader
          title={this.props.title}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypeOptions}
          onChangeBudgetType={budgetType => this.props.onChangeBudgetType(budgetType)}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onChangeCurrency={currency => this.props.onChangeCurrency(currency)}
        />}

      <Grid>
        <Grid.Column width={5} style={{ paddingRight: 0 }}>
          <CardContainer>
            <Timeline
              onYearChanged={year => this.props.onChangeYear(+year)}
              height={showLegend ? '250px' : '180px'}
              config={{
                ...this.props.config.line,
                timeAxis: {
                  ...this.props.config.line.timeAxis,
                  axisMinimum: this.props.lowestYear.toString(),
                  axisMaximum: this.props.highestYear.toString(),
                },
                anchor: { start: this.props.year.toString() },
              }}
              data={trend}
            />
          </CardContainer>
        </Grid.Column>

        <Grid.Column width={11} style={{ paddingLeft: 0 }}>
          <TreeChartContainer>
            <TreeChart
              height={showLegend ? '380px' : '222px'}
              config={{
                ...this.props.config.partition,
                labeling: { prefix: this.props.currency },
              }}
              onClick={(d: { id: string }) => this.setLevel(d.id)}
              data={tree}
            />
          </TreeChartContainer>
        </Grid.Column>
      </Grid>

      {!this.props.inverted ? '' :
        // eslint-disable-next-line react/jsx-indent
        <LinePartitionHeader
          title={this.props.title}
          year={this.props.year}
          budgetType={this.props.budgetType}
          budgetTypeOptions={this.props.budgetTypeOptions}
          onChangeBudgetType={budgetType => this.props.onChangeBudgetType(budgetType)}
          currency={this.props.currency}
          currencyOptions={this.props.currencyOptions}
          onChangeCurrency={currency => this.props.onChangeCurrency(currency)}
        />}

    </Container>);
  }
}
