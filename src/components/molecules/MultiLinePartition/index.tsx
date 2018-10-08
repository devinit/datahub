import * as React from 'react';
import { H4 } from 'glamorous';
import { Header, Segment } from 'semantic-ui-react';
import { CurrencyOption, createCurrencyOptions } from '../../../utils';
import { PrintContainer } from '../../atoms/Container';
import GovernmentFinanceTour from '../../atoms/GovernmentFinanceTour';
import ExportChart from '../ExportChart';
import LinePartition from '../LinePartition';
import LoadingBar from '../LoadingBar';
import TourContainer from '../TourContainer';
import * as introJS from 'intro.js';

export interface LinePartitionItem {
  title: string;
  data: DH.IDomestic[];
  inverted?: boolean;
  withoutOptions?: boolean;
}

export interface Props {
  chartId: string;
  year?: number; // from cached url state
  loading: boolean;
  startYear: number;
  // for regional profiles. They have a feature that allows to
  // set currency type from another component
  currency?: string;
  currencyCode: string;
  currencyUSD: string;
  config: {
    line: any;
    partition: any;
  };
  items: LinePartitionItem[];
}

export interface State {
  year: number;
  currency: string;
  currencyOptions: CurrencyOption[];
  budgetType: string;
  budgetTypeOptions: {
    [year: string]: any[];
  };
  lowestYear: number;
  highestYear: number;
  revenueTourVisible: boolean;
}

export default class MultiLinePartition extends React.Component<Props> {
  readonly state: State = MultiLinePartition.createInitialState(this.props);

  // public setCurrencyBound: (currency: string) => void;
  // public setBudgetTypeBound: (budgetType: string) => void;
  // public setYearBound: (year: number| string) => void;

  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);
    // this.setCurrencyBound = this.setCurrency.bind(this);
    // this.setBudgetTypeBound = this.setBudgetType.bind(this);
    this.setYear = this.setYear.bind(this);
  }

  render() {
    if (this.props.loading) {
      return <LoadingBar loading={ this.props.loading } />;
    }

    return (
      <Segment basic>
        <section>
          <div id="print-chart">
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
              onViewVisualization={ this.toggleRevenueTour }
              printDiv="print-chart"
              stateToShare={ {
                year: this.state.year,
                budgetType: this.state.budgetType,
                chartId: this.props.chartId
              } }
            />
            { this.renderItems() }
          </div>
        </section>

        <TourContainer
          visible={ this.state.revenueTourVisible }
          closeHandler={ this.toggleRevenueTour }
        >
          <GovernmentFinanceTour />
        </TourContainer>
      </Segment>
    );
  }

  componentWillReceiveProps(props: Props) {
    const initState = MultiLinePartition.createInitialState(props);
    this.setState(initState);
  }

  private renderItems() {
    return this.props.items.map((item: LinePartitionItem) => {
      if (item.data && item.data.length) {
        return (
          <LinePartition
            key={ item.title }
            title={ item.title }
            inverted={ item.inverted }
            withoutOptions={ item.withoutOptions }
            year={ this.state.year }
            highestYear={ this.state.highestYear }
            lowestYear={ this.state.lowestYear }
            data={ item.data }
            currency={ this.state.currency }
            currencyOptions={ this.state.currencyOptions }
            budgetType={ this.state.budgetType }
            budgetTypeOptions={ this.state.budgetTypeOptions[this.state.year] }
            config={ this.props.config }
            onChangeYear={ this.setYear }
            // tslint:disable-next-line:jsx-no-lambda
            onChangeCurrency={ (currency) => this.setCurrency(currency) }
            // tslint:disable-next-line:jsx-no-lambda
            onChangeBudgetType={ (budgetType) => this.setBudgetType(budgetType) }
          />
        );
      } else {
        return <H4 textAlign="center" paddingTop="3em">{ `No ${ item.title } data` }</H4>;
      }
    });
  }

  private setCurrency = (currency: string) =>
    this.setState({ currency })

  private setBudgetType = (budgetType: string) =>
    this.setState({ budgetType })

  private setYear = (year: string) => {
    const budgetTypeOptions = this.state.budgetTypeOptions[year];
    const budgetType = budgetTypeOptions && budgetTypeOptions[0].value;
    this.setState({
      year: +year,
      budgetType
    });
  }

  private toggleRevenueTour = () => {
    introJS().setOptions({ showStepNumbers: false }).start();
  }

  public static createTimeLimits(data: Array<{year: number; }>) {
    const years = data.map(datum => datum.year);
    const lowestYear = Math.min.apply(null, years);
    const highestYear = Math.max.apply(null, years);

    return {
      lowestYear,
      highestYear
    };
  }

  public static createBudgetTypeOptions(data: Array<{year: number; budget_type: any}>) {
    return data
      .reduce((acc, d) => {
        if (!acc[d.year]) {
          acc[d.year] = [];
        }

        if (!acc[d.year].find(option => d.budget_type === option.value)) {
          acc[d.year] = [ ...acc[d.year], { value: d.budget_type, text: d.budget_type } ]
            .sort((a, b) => a.text < b.text ? -1 : 1);
        }

        return acc;
      }, {});
  }

  public static createInitialState(props: Props) {
    const everything = Array.prototype.concat.apply([], props.items.map(item => item.data));
    const currencyOptions = createCurrencyOptions(props.currencyCode, props.currencyUSD);
    const budgetTypeOptions = MultiLinePartition.createBudgetTypeOptions(everything);
    const { lowestYear, highestYear } = MultiLinePartition.createTimeLimits(everything);
    const possibleStartYear = props.year || props.startYear;
    const year = possibleStartYear < lowestYear ? lowestYear : possibleStartYear;
    const currency = props.currency || (currencyOptions[0] && currencyOptions[0].value);
    const budgetType = budgetTypeOptions[year] && budgetTypeOptions[year][0].value;
    const revenueTourVisible = false;

    return {
      year,
      currency,
      currencyOptions,
      budgetType,
      budgetTypeOptions,
      lowestYear,
      highestYear,
      revenueTourVisible
    };
  }
}
