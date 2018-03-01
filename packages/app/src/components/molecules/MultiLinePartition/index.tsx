import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import LoadingBar from '../LoadingBar';
import ExportChart from '../ExportChart';
import TourContainer from '../TourContainer';
import {createCurrencyOptions} from '../../../utils';
import {CurrencyOption} from '../../../utils';
import { PrintContainer } from '../../atoms/Container';
import GovernmentFinanceTour from '../../atoms/GovernmentFinanceTour';
import LinePartition from '../LinePartition';

export interface LinePartitionItem  {
  title: string;
  data: DH.IDomestic[];
  inverted?: boolean;
  withoutOptions?: boolean;
}

export interface Props  {
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

export interface State  {
  year: number;
  currency: string;
  currencyOptions: CurrencyOption[];
  budgetType: string;
  budgetTypeOptions: {
    [year: number]: any[];
  };
  lowestYear: number;
  highestYear: number;
  revenueTourVisible: boolean;
}

export default class MultiLinePartition extends React.Component<Props> {
  public static createTimeLimits(data: Array<{year: number; }>) {
    const years = data.map(datum => datum.year);
    const lowestYear = Math.min.apply(null, years);
    const highestYear = Math.max.apply(null, years);
    return {
      lowestYear,
      highestYear,
    };
  }

  public static createBudgetTypeOptions(data: Array<{year: number; budget_type: any}>) {
    return data
      .reduce((acc, d) => {
        if (!acc[d.year]) {
          acc[d.year] = [];
        }

        if (!acc[d.year].find(option => d.budget_type === option.value)) {
          acc[d.year] = [...acc[d.year], { value: d.budget_type, text: d.budget_type }]
            .sort((a, b) => a.text < b.text ? -1 : 1);
        }

        return acc;
      }, {});
  }

  public static createInitialState(props: Props) {
    const everything = Array.prototype.concat.apply([], props.items.map(item => item.data));
    const currencyOptions = createCurrencyOptions(props.currencyCode, props.currencyUSD);
    const budgetTypeOptions = MultiLinePartition.createBudgetTypeOptions(everything);
    const {lowestYear, highestYear} = MultiLinePartition.createTimeLimits(everything);
    const possibleStartYear = props.year || props.startYear;
    const year = possibleStartYear < lowestYear ? lowestYear : possibleStartYear;
    const currency = props.currency ?
      props.currency : currencyOptions[0] && currencyOptions[0].value;
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
      revenueTourVisible,
    };
  }
  public state: State;

  public setCurrencyBound: (currency: string) => void;
  public setBudgetTypeBound: (budgetType: string) => void;
  public setYearBound: (year: number| string) => void;

  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);
    this.state = MultiLinePartition.createInitialState(props);
    this.setCurrencyBound = this.setCurrency.bind(this);
    this.setBudgetTypeBound = this.setBudgetType.bind(this);
    this.setYearBound = this.setYear.bind(this);
  }

  public componentWillReceiveProps(props: Props) {
    const initState = MultiLinePartition.createInitialState(props);
    this.setState(initState);
  }

  public setCurrency(currency: string) {
    this.setState({ currency });
  }

  public setBudgetType(budgetType: string) {
    this.setState({ budgetType });
  }

  public setYear(year: number) {
    const budgetTypeOptions = this.state.budgetTypeOptions[year];
    const budgetType = budgetTypeOptions && budgetTypeOptions[0].value;
    this.setState({
      year,
      budgetType,
    });
  }
  public toggleRevenueTour() {
    if (this.state.revenueTourVisible) {
      this.setState({ revenueTourVisible: false });
    } else {
      this.setState({ revenueTourVisible: true });
    }
  }
  public render() {
    if (this.props.loading) {
      return <LoadingBar loading={this.props.loading} />;
    }
    return (<Segment basic>
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
            onViewVisualization={this.toggleRevenueTour}
            printDiv="print-chart"
            stateToShare={{
              year: this.state.year,
              budgetType: this.state.budgetType,
              chartId: this.props.chartId,
            }}
          />

          {this.props.items.map((item: LinePartitionItem) => (
            <LinePartition
              key={item.title}
              title={item.title}
              inverted={item.inverted}
              withoutOptions={item.withoutOptions}
              year={this.state.year}
              highestYear={this.state.highestYear}
              lowestYear={this.state.lowestYear}
              data={item.data}
              currency={this.state.currency}
              currencyOptions={this.state.currencyOptions}
              budgetType={this.state.budgetType}
              budgetTypeOptions={this.state.budgetTypeOptions[this.state.year]}
              config={this.props.config}
              onChangeYear={this.setYearBound}
              onChangeCurrency={this.setCurrencyBound}
              onChangeBudgetType={this.setBudgetTypeBound}
            />
          ))}
        </div>
      </section>

      <TourContainer
        visible={this.state.revenueTourVisible}
        closeHandler={this.toggleRevenueTour}
      >
        <GovernmentFinanceTour />
      </TourContainer>
    </Segment>);
  }
}
