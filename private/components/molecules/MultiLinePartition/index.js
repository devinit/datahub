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
  revenueTourVisible: boolean,
};

export default class MultiLinePartition extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State;
  // eslint-disable-next-line react/sort-comp
  props: Props;

  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);
    this.state = this.createInitialState(props);
  }

  componentWillReceiveProps(props: Props) {
    this.setState(this.createInitialState(props));
  }

  toggleRevenueTour() {
    if (this.state.revenueTourVisible) {
      this.setState({ revenueTourVisible: false });
    } else {
      this.setState({ revenueTourVisible: true });
    }
  }

  createInitialState(props: Props) {
    const year = props.startYear;
    const currencyOptions = this.createCurrencyOptions(props.currencyCode);
    const currency = currencyOptions[0] && currencyOptions[0].value;
    const budgetTypeOptions = this.createBudgetTypeOptions(props.items);
    const budgetType = budgetTypeOptions[year] && budgetTypeOptions[year][0].value;
    return {
      year,
      currency,
      currencyOptions,
      budgetType,
      budgetTypeOptions,
      revenueTourVisible: false,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  createCurrencyOptions(currencyCode: string) {
    return [
      { text: 'Constant 2015 US$', value: 'US$' },
      { text: `Current ${currencyCode}`, value: currencyCode },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  createBudgetTypeOptions(items: LinePartitionItem[]) {
    return Array.prototype.concat
      .apply([], items.map(item => item.data))
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
                data={item.data}
                currency={this.state.currency}
                currencyOptions={this.state.currencyOptions}
                budgetType={this.state.budgetTypeOptions[this.state.year][0].value}
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
