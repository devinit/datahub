/**
 * TODO: this visual is not well optimisied we have unncessary renders when scrubbing
 * through the time line
 */
import * as React from 'react';
import glamorous, { H4 } from 'glamorous';
import { groupBy, prop, uniq } from 'ramda';
import { Container, Grid } from 'semantic-ui-react';
import TreeChart from '../../atoms/TreeChart';
import ErrorBoundary from '../ErrorBoundary';
import Timeline from '../../atoms/Timeline';
import LinePartitionHeader from './LinePartitionHeader';

const CardContainer = glamorous.div({
  background: 'rgb(255,255,255)',
  paddingLeft: '2em',
  paddingRight: '3em',
  paddingBottom: '1.5em',
  paddingTop: '1.5em',
  overflow: 'visible'
});

const TreeChartContainer = glamorous.div({
  '& .plot-label-header': {
    fontSize: '1em !important'
  },
  '& .plot-label-value': {
    fontSize: '1.15em !important',
    fontWeight: '500 !important'
  }
});

const groupByYear = groupBy<TreeObj>(d => `${d.year}`);

const groupByBudgetType = groupBy<DH.IDomestic>(prop('budget_type'));

export interface Legendx {
  legend: any;
}
export interface TimeAxis {
  timeAxis: any;
}

export interface LinePartitionData {
  levels: any;
  color: string;
  budget_type: string;
  value: number;
  value_ncu: number;
}

export interface Props {
  title: string;
  inverted?: boolean;
  withoutOptions?: boolean;
  year: number;
  lowestYear: number;
  highestYear: number;
  data: DH.IDomestic[];
  currency: string;
  currencyOptions: object[];
  budgetType: string;
  budgetTypeOptions: object[];
  config: {
    line: TimeAxis;
    partition: Legendx;
  };
  onChangeYear: (year: string) => void;
  onChangeCurrency: (currency: string) => any;
  onChangeBudgetType(budgetType: string): void;
}

type TreeObj = DH.IDomestic & {
      color: string,
      nodeParent?: string,
      nodeId: string
    };

interface TreesByYearAndBudget {
  [year: string]: {
    [budgetType: string]: TreeObj[]
  };
}

export interface State {
  treesByYear: TreesByYearAndBudget;
  trend: DH.IDomestic[];
  level: string;
  heading: string;
}

export default class LinePartition extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.createInitialState(props);
  }

  public render() {
    const tree = this.getTreeData();
    const trend = this.getTrendData();
    const showLegend = this.props.config.partition.legend && this.props.config.partition.legend.showLegend;

    return (
      <Container>
        { this.renderLinePartitionHeader(!this.props.inverted || !tree.length) }
        <Grid style={ { paddingBottom: '40px' } }>
          <Grid.Column mobile={ 16 } computer={ 5 } width={ 5 } style={ { padding: 0 } }>
            <CardContainer>
              <Timeline
                onYearChanged={ this.props.onChangeYear }
                height={ showLegend ? '250px' : '180px' }
                config={ {
                  ...this.props.config.line,
                  timeAxis: {
                    ...this.props.config.line.timeAxis,
                    axisMinimum: this.props.lowestYear.toString(),
                    axisMaximum: this.props.highestYear.toString()
                  },
                  anchor: { start: this.props.year.toString() }
                } }
                data={ trend }
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column mobile={ 16 } computer={ 11 } width={ 11 } style={ { padding: 0 } }>
            { this.renderTreeChart(tree, showLegend) }
          </Grid.Column>
        </Grid>
        { this.renderLinePartitionHeader(this.props.inverted || !tree.length) }
      </Container>
    );
  }

  private renderLinePartitionHeader(showHeader: boolean) {
    if (showHeader) {
      return (
        <LinePartitionHeader
          title={ this.state.heading }
          hideOptions={ this.props.withoutOptions || false }
          year={ this.props.year }
          budgetType={ this.props.budgetType }
          budgetTypeOptions={ this.props.budgetTypeOptions }
          onChangeBudgetType={ this.props.onChangeBudgetType }
          currency={ this.props.currency }
          currencyOptions={ this.props.currencyOptions }
          onChangeCurrency={ this.props.onChangeCurrency }
        />
      );
    }

    return null;
  }

  private renderTreeChart(tree: TreeObj[], showLegend: boolean) {
    if (tree.length) {
      const cleanTree = this.removeDuplicates(this.connectOrphanedBranchesToRoot(tree));

      return (
        <TreeChartContainer>
          <ErrorBoundary message="government finance treemap ">
            <TreeChart
              height={ showLegend ? '380px' : '222px' }
              config={ {
                ...this.props.config.partition,
                labeling: { prefix: this.props.currency }
              } }
              // tslint:disable-next-line:jsx-no-lambda
              onClick={ (d: { data: {levels: string[]} }) => {
                this.setLevel(d.data.levels);
              } }
              data={ cleanTree }
            />
          </ErrorBoundary>
        </TreeChartContainer>
      );
    }

    return <H4 textAlign="center" paddingTop="3em"> No resources breakdown for { this.props.year }</H4>;
  }

  private createInitialState(props: Props) {
    const [ root = { levels: [] } ] = props.data;
    const level = root.levels[0];
    const heading = level.replace(/Total\s*/gi, '');

    const trend = this.createTrendState(level);
    const treesByYear = this.createTreeStateByYearAndBudgetType();

    return {
      level,
      heading,
      trend,
      treesByYear
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
  private createTreeStateByYearAndBudgetType = (): TreesByYearAndBudget => {
    const groupedByYear: {[year: string]: TreeObj[]} = groupByYear(
      this.props.data.map(datum => {
        return {
          ...datum,
          // Hack: Coloring nodes with negative values to red
          color: datum.value > 0 ? datum.color : 'rgb(240, 122, 146)',
          nodeParent: datum.levels[datum.levels.length - 2],
          nodeId: datum.levels[datum.levels.length - 1]
        };
      })
    );

    return Object.keys(groupedByYear)
      .reduce((acc, year) => {
        const yearBudgetTypeData = groupByBudgetType(groupedByYear[`${year}`]);

        return { ...acc, [`${year}`]: yearBudgetTypeData };
      }, {});
  }

  private getTreeData = (): TreeObj[] => {
    const treeOfYear = this.state.treesByYear[this.props.year] || {};
    const treeOfBudgetType = treeOfYear[this.props.budgetType] || [];

    return treeOfBudgetType
      .map(datum => {
        const value = this.props.currency === 'US$' ? datum.value : datum.value_ncu;

        return {
          ...datum,
          value
        };
      });
  }

  private connectOrphanedBranchesToRoot(tree: TreeObj[]) {
    const validNodeIDs = tree.map(branch => branch.nodeId);
    let rootBranch = tree.find(branch => !branch.nodeParent);

    return tree.map(branch => {
      if (branch.nodeParent) {
        if (validNodeIDs.indexOf(branch.nodeParent) === -1) {
          if (!rootBranch) {
            console.log(`Orphaned branch "${branch.nodeId}" requires parent "${branch.nodeParent}". No root branch found. Branch "${branch.nodeId}" promoted to root`); // tslint:ignore-line
            rootBranch = branch;
            branch.nodeParent = undefined;
          } else {
            console.log(`Orphaned branch "${branch.nodeId}" requires parent "${branch.nodeParent}". Now attached to root branch "${rootBranch.nodeId}"`); // tslint:ignore-line
            branch.nodeParent = rootBranch.nodeId;
          }
        }
      }

      return branch;
    });
  }

  private removeDuplicates(tree: TreeObj[]) {
    return tree.reduce((newTree: TreeObj[], branch) => {
      const duplicate = newTree.find(duplicateBranch => duplicateBranch.nodeId === branch.nodeId);
      if (!duplicate && branch.nodeId !== branch.nodeParent && branch.value) {
        newTree.push(branch);
        branch.levels = branch.levels.reduce((newLevels: string[], level) => {
          const duplicateLevel = newLevels.find(dup => dup === level);
          if (!duplicateLevel) {
            newLevels.push(level);
          }

          return newLevels;
        }, []);
      }

      return newTree;
    }, []);
  }

  private setLevel = (levels: string[]) => {
    const level = levels[levels.length - 1];
    const trend = this.createTrendState(level);
    const heading = levels.map(levelx => levelx.replace(/Total\s*/gi, '')).join(' > ');

    this.setState({
      level,
      trend,
      heading
    });
  }

  private createTrendState = (level: string) => {
    const allBudgetTypes = uniq(this.props.data.map((datum) => datum.budget_type));
    // put there coz budget was overlapping with actual for case of uganda
    const regexString = allBudgetTypes.length > 2 ?
      allBudgetTypes.filter(d => !d.match(/budget/gi)).join('|') :
      allBudgetTypes.join('|');
    const regex = new RegExp(`(${regexString})`, 'gi');
    console.log('regex string', regexString);

    return this.props.data
      .filter(d => {
        const isActualOrProjected = d.budget_type.match(regex);
        const isAtSelectedLevel = level
          ? d.levels.length - 1 === d.levels.indexOf(level)
          : d.levels.length === 1;

        return isActualOrProjected && isAtSelectedLevel;
      });
  }

  private getTrendData = () => {
    const trend = this.state.trend
      .map(datum => {
        const value = this.props.currency === 'US$' ? datum.value : datum.value_ncu;

        return {
          ...datum,
          value
        };
      });

    return trend;
  }
}
