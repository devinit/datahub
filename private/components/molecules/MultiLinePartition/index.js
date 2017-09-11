// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import LoadingBar from 'components/molecules/LoadingBar';
import ExportChart from 'components/molecules/ExportChart';
import { LightBg } from 'components/atoms/Backgrounds';
import TourContainer from 'components/molecules/TourContainer';
import { PrintContainer } from 'components/atoms/Container';
import GovernmentFinanceTour from 'components/atoms/GovernmentFinanceTour';
import LinePartition from 'components/molecules/LinePartition';

type LinePartitionItem = {
  title: string,
  data: Object[],
}

type Props = {
  chartId: string,
  loading: boolean,
  startYear: number,
  currencyCode: string,
  config: {
    line: Object,
    partition: Object,
  },
  items: LinePartitionItem[],
};

type State = {
  year: number,
  currency: string,
  currencyOptions: Object[],
  budgetType: string,
  budgetTypeOptions: {
    [year: number]: Object[]
  },
  lowestYear: number,
  highestYear: number,
  revenueTourVisible: boolean,
};

export default class MultiLinePartition extends Component {
  static createTimeLimits(data: Object[]) {
    const years = data.map(datum => datum.year);
    const lowestYear = Math.min.apply(null, years);
    const highestYear = Math.max.apply(null, years);
    return {
      lowestYear,
      highestYear,
    };
  }

  static createCurrencyOptions(currencyCode: string) {
    return [
      { text: 'Constant 2015 US$', value: 'US$' },
      { text: `Current ${currencyCode}`, value: currencyCode },
    ];
  }

  static createBudgetTypeOptions(data: Object[]) {
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

  static createInitialState(props: Props) {
    const year = props.startYear;
    const everything = Array.prototype.concat.apply([], props.items.map(item => item.data));
    const currencyOptions = MultiLinePartition.createCurrencyOptions(props.currencyCode);
    const budgetTypeOptions = MultiLinePartition.createBudgetTypeOptions(everything);
    const {lowestYear, highestYear} = MultiLinePartition.createTimeLimits(everything);
    const currency = currencyOptions[0] && currencyOptions[0].value;
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

  // eslint-disable-next-line react/sort-comp
  state: State;
  // eslint-disable-next-line react/sort-comp
  props: Props;

  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);
    this.state = MultiLinePartition.createInitialState(props);
    this.setCurrency = this.setCurrency.bind(this);
    this.setBudgetType = this.setBudgetType.bind(this);
    this.setYear = this.setYear.bind(this);
  }

  componentWillReceiveProps(props: Props) {
    this.setState(MultiLinePartition.createInitialState(props));
  }

  toggleRevenueTour() {
    if (this.state.revenueTourVisible) {
      this.setState({ revenueTourVisible: false });
    } else {
      this.setState({ revenueTourVisible: true });
    }
  }

  setCurrency(currency: string) {
    this.setState({ currency });
  }

  setBudgetType(budgetType: string) {
    this.setState({ budgetType });
  }

  setYear(year: number) {
    const budgetTypeOptions = this.state.budgetTypeOptions[year];
    const budgetType = budgetTypeOptions && budgetTypeOptions[0].value;
    this.setState({
      year,
      budgetType,
    });
  }

  render() {
    if (this.props.loading) {
      return <LoadingBar loading={this.props.loading} />;
    }
    return (<LightBg>
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
              onViewVisualization={() => this.toggleRevenueTour()}
              printDiv="print-chart"
              stateToShare={{
                startYear: this.state.year,
                budgetType: this.state.budgetType,
                chartId: this.props.chartId,
              }}
            />

            {this.props.items.map((item: LinePartitionItem, i: number) => (
              <LinePartition
                key={item.title}
                title={item.title}
                inverted={i % 2 !== 1}
                year={this.state.year}
                highestYear={this.state.highestYear}
                lowestYear={this.state.lowestYear}
                data={item.data}
                currency={this.state.currency}
                currencyOptions={this.state.currencyOptions}
                budgetType={this.state.budgetType}
                budgetTypeOptions={this.state.budgetTypeOptions[this.state.year]}
                config={this.props.config}
                onChangeYear={this.setYear}
                onChangeCurrency={this.setCurrency}
                onChangeBudgetType={this.setBudgetType}
              />
            ))}
          </div>
        </section>

        <TourContainer
          visible={this.state.revenueTourVisible}
          closeHandler={() => this.toggleRevenueTour()}
        >
          <GovernmentFinanceTour />
        </TourContainer>
      </Segment>
    </LightBg>);
  }
}
