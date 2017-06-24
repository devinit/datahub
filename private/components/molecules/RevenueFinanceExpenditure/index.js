// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Button, Container, Grid, Header, Icon, Segment, Dropdown, Label} from 'semantic-ui-react';
import {makeUnique} from '@devinit/charts/lib/factories/createDataset';
import Chart from '../../atoms/Chart/index';
import Timeline from '../../atoms/Timeline/index';
import {LightBg, SectionHeader} from '../../atoms/CountryProfiles/Common';

type Props = {
  startYear: string,
  revenueLevel: string,
  financeLevel: string,
  expenditureLevel: string,
  data: [],
  config: {
    line: {},
    partition: {}
  }
}

type State = {
  budgetType: string,
  currency: string,
  year: number,
  revenueLevel: string,
  financeLevel: string,
  expenditureLevel: string
}

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

export default class GovtRFE extends React.Component {

  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line flowtype-errors/show-errors
    this.state = {
      ...this.getCurrentYearState(props.startYear),
      ...this.getTrendDatasets(),
    };
  }

  // eslint-disable-next-line
  updateCurrentYear(year: string) {
    this.setState(this.getCurrentYearState(year));
  }

  updateBudgetType(budgetType: any) {

  }

  updateTrendDatasets() {
    this.setState(this.getTrendDatasets());
  }

  getCurrentYearState(year: string) {
    const currentYearData = this.props.data.filter(d => d.year === year);

    const budgetTypes = makeUnique(currentYearData.map(d => d.budgetType))
      .sort()
      .map(type => ({
        key: type,
        text: type[0].toUpperCase() + type.slice(1),
        value: type
      }));

    const [currentBudgetType] = budgetTypes;

    const currentBudgetTypeData = currentYearData.filter(d => d.budgetType === currentBudgetType.value);

    const expenditureCurrent = currentBudgetTypeData.filter(d => d.type === 'total-expenditure');
    const revenueCurrent = currentBudgetTypeData.filter(d => d.type === 'total-revenue-and-grants');
    const financeCurrent = currentBudgetTypeData.filter(d => d.type === 'financing');

    const lineConfig = {...this.props.config.line, anchor: {start: year}};

    return {
      currentYear: year,
      currentBudgetType,
      lineConfig,
      budgetTypes,
      revenueCurrent,
      financeCurrent,
      expenditureCurrent,
    };
  }

  getBudgetTypeData(budgetType: string, data) {

  }

  getTrendDatasets() {
    const revenueTrend = this.props.data.filter(d => d.type === 'total-revenue-and-grants' && d.category === 'total-revenue-and-grants');
    const financeTrend = this.props.data.filter(d => d.type === 'financing' && d.category === 'financing');
    const expenditureTrend = this.props.data.filter(d => d.type === 'total-expenditure' && d.category === 'total-expenditure');

    return {
      revenueTrend,
      financeTrend,
      expenditureTrend,
    };
  }

  componentWillReceiveProps(props: Props) {
    this.updateCurrentYear(props.startYear, props.config, props.data);
    this.updateTrendDatasets(props.data);
  }

  render() {
    return (<LightBg>
      <Segment basic>

        <Segment basic clearing style={{paddingRight: 0, paddingLeft: 0}}>

          <SectionHeader color="#fff" style={{float: 'left'}}>
              REVENUE AND GRANT <span>{this.state.currentYear}</span>
          </SectionHeader>

          <Segment basic floated={'right'} style={{padding: 0, margin: 0}}>
            <Label>Budget Type</Label>
            <Dropdown selection options={this.state.budgetTypes} value={this.state.currentBudgetType.value} />
            <Label>Currency</Label>
            <Dropdown
              compact
              selection
              defaultValue={'Constant US$'}
              onChange={(e, data) => console.log(data)}
              options={[
                  { key: 'Constant US$', text: 'Constant US$', value: 'Constant US$' },
                  { key: 'Current UGX', text: 'Current UGX', value: 'Current UGX' },
              ]}
            />
          </Segment>
        </Segment>

        <Grid>

          <Grid.Column width={4} style={{paddingRight: 0}}>
            <CardContainer>
              <Timeline
                onYearChanged={year => this.updateCurrentYear(year, this.props.config, this.props.data)}
                height="180px"
                config={this.state.lineConfig}
                data={this.state.revenueTrend}
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={12} style={{paddingLeft: 0}}>
            <Chart
              height="222px"
              config={this.props.config.partition}
              data={this.state.revenueCurrent}
            />
          </Grid.Column>

        </Grid>

        <Grid>

          <Grid.Column width={4} style={{paddingRight: 0}}>
            <CardContainer>
              <Timeline
                onYearChanged={year => this.updateCurrentYear(year, this.props.config, this.props.data)}
                height="180px"
                config={this.state.lineConfig}
                data={this.state.financeTrend}
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={12} style={{paddingLeft: 0}}>
            <Chart
              height="222px"
              config={this.props.config.partition}
              data={this.state.financeCurrent}
            />
          </Grid.Column>

        </Grid>

        <HeadingContainer>
          <SectionHeader color="#fff">
              FINANCING <span>{this.state.currentYear}</span>
          </SectionHeader>
        </HeadingContainer>

        <HeadingContainer>
          <SectionHeader color="#fff">
              EXPENDITURE <span>{this.state.currentYear}</span>
          </SectionHeader>
        </HeadingContainer>

        <Grid>

          <Grid.Column width={4} style={{paddingRight: 0}}>
            <CardContainer style={{paddingLeft: '15px'}}>
              <Timeline
                onYearChanged={year => this.updateCurrentYear(year, this.props.config, this.props.data)}
                height="250px"
                config={this.state.lineConfig}
                data={this.state.expenditureTrend}
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={12} style={{paddingLeft: 0}}>
            <Chart
              height="292px"
              config={this.props.config.partition}
              data={this.state.expenditureCurrent}
            />
          </Grid.Column>

        </Grid>

      </Segment>

    </LightBg>);
  }
}

