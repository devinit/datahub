// @flow
import React from 'react';
// eslint-disable-next-line
import approximate from 'approximate-number';
import {SectionHeader} from 'components/atoms/Header';
import {Grid, Header, Dropdown, Container} from 'semantic-ui-react';
import {LightBg} from '../../atoms/Backgrounds';
import Chart from '../../atoms/Chart/index';
import Timeline from '../../atoms/Timeline/index';


type ChartConfig = {
  areaConfig: Object,
  treemapConfig: Object
}

type Props = {
  data: any[], // TODO: reuse FlowData type currently in the inflows outflows file
  config: ChartConfig,
  loading: boolean,
  startYear: string
}

type State = {
  currentYear: string,
  currentYearTotal: string,
  currentFlowTypes: any,
  currentYearData: any,
  currentYearData: any,
  timeAreaConfig: any
}

class InternationalResourcesChart extends React.Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {  // eslint-disable-line
    super(props);
  }
  // eslint-disable-next-line react/sort-comp
  updateCurrentYear(year: string) {
    if (year !== this.state.currentYear) {
      this.setState(this.getCurrentYearData(year));
    }
  }

  getCurrentYearData(year: string) {
    const currentYearData = this.props.data.filter(d => d.year === year);
    return {
      currentYear: year,
      // TODO: update when API data comes in
      currentFlowTypes: currentYearData.map(d => ({key: d.flow_category, text: d.flow_category, value: d.flow_category})),
      currentYearTotal: approximate(currentYearData.reduce((sum, x) => sum + x.value, 0)),
      currentYearData: currentYearData.concat({flow_category: year}),
      timeAreaConfig: {
        ...this.props.config.areaConfig,
        anchor: {start: year}
      }
    };
  }

  render() {
    if (this.props.loading) return (<p> Loading ....</p>);
    return (
      <LightBg>
        <Container>

          <Grid>

            <Grid.Column width={6}>
              <Header as="h3" textAlign="center">
                <Header.Content>Outflows over time</Header.Content>
              </Header>
              <Dropdown
                selection
                fluid
                text="Choose a flow for more details"
                options={this.state.currentFlowTypes}
              />
            </Grid.Column>

            <Grid.Column width={10}>
              <Header as="h3" textAlign="center">
                <Header.Content>
                  The mix of resources in <span>{this.state.currentYear}</span>
                </Header.Content>
              </Header>
            </Grid.Column>

          </Grid>

          <Grid>

            <Grid.Column width={6}>
              <Timeline
                height="400px"
                data={this.props.data}
                config={this.state.timeAreaConfig}
                onYearChanged={year => this.updateCurrentYear(year)}
              />
            </Grid.Column>

            <Grid.Column width={10}>
              <SectionHeader color="rgb(238, 238, 238)">US$ {this.state.currentYearTotal}</SectionHeader>
              <Chart
                height="360px"
                data={this.state.currentYearData}
                config={this.props.config.treemapConfig}
              />
            </Grid.Column>

          </Grid>

        </Container>
      </LightBg>);
  }

}


export default InternationalResourcesChart;
