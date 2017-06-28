// @flow
import React from 'react';
// eslint-disable-next-line
import approximate from 'approximate-number';
import {SectionHeader} from 'components/molecules/CountryProfiles/Common';
import {Grid, Header, Dropdown, Container} from 'semantic-ui-react';
import {LightBg} from '../../atoms/Backgrounds';
import Chart from '../../atoms/Chart/index';
import Timeline from '../../atoms/Timeline/index';


type Props = {
  data: any, // TODO: reuse FlowData type currently in the inflows outflows file
  config: any,
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

class InternationalResources extends React.Component {
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = this.getCurrentYear(props.startYear);
  }

  // eslint-disable-next-line react/sort-comp
  updateCurrentYear(year: string) {
    if (year !== this.state.currentYear) {
      this.setState(this.getCurrentYear(year));
    }
  }

  getCurrentYear(year: string) {
    const currentYearData = this.props.data.filter(d => d.year === year);
    return {
      currentYear: year,
      // TODO: update when API data comes in
      currentFlowTypes: currentYearData.map(d => ({key: d['flow-group'], text: d['flow-group'], value: d['flow-group']})),
      currentYearTotal: approximate(currentYearData.reduce((sum, x) => sum + x.value, 0)),
      currentYearData: currentYearData.concat({'flow-group': year}),
      timeAreaConfig: {
        ...this.props.config.areaConfig,
        anchor: {start: year}
      }
    };
  }

  render() {
    return (<LightBg>
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


export default InternationalResources;
