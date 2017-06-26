// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Button, Container, Dropdown, Grid, Header, Icon, Label, Segment} from 'semantic-ui-react';
import {SectionHeader} from 'components/molecules/CountryProfiles/Common';
import {makeUnique} from '@devinit/charts/lib/factories/createDataset';
import TreeChart from '../../atoms/TreeChart/index';
import Timeline from '../../atoms/Timeline/index';
import {LightBg} from '../../atoms/Backgrounds';

type Props = {
  startYear: number,
  revenueLevel: string,
  financeLevel: string,
  expenditureLevel: string,
  currencies: [string],
  data: [],
  config: {
    line: {},
    partition: {}
  }
}

type State = {
  budgetTypes: [string],
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
    const budgetTypes = makeUnique(
      props.data
        .filter(d => d.year === props.startYear)
        .map(d => d.budgetType))
      .sort();

    this.state = {
      year: props.startYear,
      currency: props.currencies[0],
      budgetType: budgetTypes[0],
      budgetTypes,
      revenueLevel: this.props.revenueLevel,
      financeLevel: this.props.financeLevel,
      expenditureLevel: this.props.expenditureLevel
    };
  }

  updateYear(year: number) {
    const budgetTypes = makeUnique(
      this.props.data
        .filter(d => d.year === year)
        .map(d => d.budgetType))
      .sort();

    this.setState({
      year,
      budgetType: budgetTypes[0],
      budgetTypes,
    });
  }

  updateRevenueLevel(level: string) {
    this.setState({
      revenueLevel: level
    });
  }

  updateFinanceLevel(level: string) {
    this.setState({
      financeLevel: level
    });
  }

  updateExpenditureLevel(level: string) {
    this.setState({
      expenditureLevel: level
    });
  }

  updateBudgetType(budgetType: string) {
    this.setState({
      budgetType
    });
  }

  updateCurrency(currency: string) {
    this.setState({
      currency
    });
  }

  render() {
    const currentYearData = this.props.data
      .filter(d => d.year === this.state.year)
      .map(({levels, ...datum}) => ({
        ...datum,
        levels,
        id: levels[levels.length - 1],
        parent: levels[levels.length - 2],
      }));


    return (<LightBg>
      <Segment basic>

        <Segment basic clearing style={{paddingRight: 0, paddingLeft: 0}}>

          <SectionHeader color="#fff" style={{float: 'left'}}>
            REVENUE AND GRANT <span>{this.state.year}</span>
          </SectionHeader>

          <Segment basic floated={'right'} style={{padding: 0, margin: 0}}>
            <Label>Budget Type</Label>
            <Dropdown
              selection
              value={this.state.budgetType}
              options={this.state.budgetTypes.map(t => ({text: t, value: t}))}
              onChange={(e, data) => this.updateBudgetType(data.value)}
            />
            <Label>Currency</Label>
            <Dropdown
              compact
              selection
              value={this.state.currency}
              options={this.props.currencies.map(t => ({text: t, value: t}))}
              onChange={(e, data) => this.updateCurrency(data.value)}
            />
          </Segment>
        </Segment>

        <Grid>

          <Grid.Column width={5} style={{paddingRight: 0}}>
            <CardContainer style={{paddingLeft: '30px'}}>
              <Timeline
                onYearChanged={year => this.updateYear(parseInt(year, 10))}
                height="180px"
                config={{...this.props.config.line, anchor: {start: this.state.year.toString()}}}
                data={this.props.data
                  .filter(d => d.levels.indexOf(this.state.revenueLevel) === d.levels.length - 1)
                  .map(({year, ...datum}) => ({year: year.toString(), ...datum}))
                }
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={11} style={{paddingLeft: 0}}>
            <TreeChart
              height="222px"
              config={this.props.config.partition}
              onClick={(d: {id: string}) => this.updateRevenueLevel(d.id)}
              data={currentYearData.filter(d =>
                d.budgetType === this.state.budgetType &&
                d.levels.indexOf(this.props.revenueLevel) > -1
              )}
            />
          </Grid.Column>

        </Grid>

        <Grid>

          <Grid.Column width={5} style={{paddingRight: 0}}>
            <CardContainer style={{paddingLeft: '30px'}}>
              <Timeline
                onYearChanged={year => this.updateYear(parseInt(year, 10))}
                height="180px"
                config={{...this.props.config.line, anchor: {start: this.state.year.toString()}}}
                data={this.props.data
                  .filter(d => d.levels.indexOf(this.state.financeLevel) === d.levels.length - 1)
                  .map(({year, ...datum}) => ({year: year.toString(), ...datum}))
                }
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={11} style={{paddingLeft: 0}}>
            <TreeChart
              height="222px"
              config={this.props.config.partition}
              onClick={(d: {id: string}) => this.updateFinanceLevel(d.id)}
              data={currentYearData.filter(d =>
                d.budgetType === this.state.budgetType &&
                d.levels.indexOf(this.props.financeLevel) > -1
              )}
            />
          </Grid.Column>

        </Grid>

        <HeadingContainer>
          <SectionHeader color="#fff">
            FINANCING <span>{this.state.year}</span>
          </SectionHeader>
        </HeadingContainer>

        <HeadingContainer>
          <SectionHeader color="#fff">
            EXPENDITURE <span>{this.state.year}</span>
          </SectionHeader>
        </HeadingContainer>

        <Grid>

          <Grid.Column width={5} style={{paddingRight: 0}}>
            <CardContainer style={{paddingLeft: '30px'}}>
              <Timeline
                onYearChanged={year => this.updateYear(parseInt(year, 10))}
                height="250px"
                config={{...this.props.config.line, anchor: {start: this.state.year.toString()}}}
                data={this.props.data
                  .filter(d =>
                    d.levels.indexOf(this.state.expenditureLevel) === d.levels.length - 1
                  )
                  .map(({year, ...datum}) => ({year: year.toString(), ...datum}))
                }
              />
            </CardContainer>
          </Grid.Column>

          <Grid.Column width={11} style={{paddingLeft: 0}}>
            <TreeChart
              height="292px"
              config={this.props.config.partition}
              onClick={(d: {id: string}) => this.updateExpenditureLevel(d.id)}
              data={currentYearData.filter(d =>
                d.budgetType === this.state.budgetType &&
                d.levels.indexOf(this.props.expenditureLevel) > -1
              )}
            />
          </Grid.Column>

        </Grid>

      </Segment>

    </LightBg>);
  }

}

