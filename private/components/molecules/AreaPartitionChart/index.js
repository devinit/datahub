// @flow
/* eslint-disable react/sort-comp */
import React from 'react';
// eslint-disable-next-line
import approximate from "approximate-number";
import {makeUnique} from '@devinit/charts/lib/factories/createDataset';
import {SectionHeader} from 'components/atoms/Header';
import {Container, Dropdown, Grid, Header} from 'semantic-ui-react';
import {LightBg} from '../../atoms/Backgrounds';
import Chart from '../../atoms/TreeChart';
import Timeline from '../../atoms/Timeline';

export type Props = {
  country: string,
  data: any, // TODO: reuse FlowData type currently in the inflows outflows file
  config: any,
  startYear: number
}

type State = {
  directions: Object[],
  flows: Object[],

  year: string,
  direction: string,
  flow?: string,

  trend: Object[],
  trendConfig: Object,
  mix: Object[],
  sumOfMix: number,
}

type Determinant = {
  year?: string,
  direction?: string,
  flow?: string,
}

class AreaPartitionChart extends React.Component {

  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.calculateState({
        year: this.props.startYear.toString(),
        direction: 'in',
      }),

      directions: [
        {value: 'in', text: `Inflows to ${props.country}`},
        {value: 'out', text: `Outflows from ${props.country}`},
      ],

      flows: [
        {
          value: null,
          text: 'All',
        },

        ...makeUnique(this.props.data.map(d => d.flow_category)).map(flow => ({
          value: flow,
          text: flow,
        }))
      ]
    };
  }

  update(determinants: Determinant) {
    const state = this.calculateState({
      year: determinants.year || this.state.year,
      direction: determinants.direction || this.state.direction,
      flow: determinants.flow || this.state.flow
    });

    this.setState(state);
  }

  calculateState(determinants: Determinant) {
    const {direction, year, flow} = determinants;

    const trend = this.props.data
      .filter(d => {
        return d.direction === direction && (!flow || d.flow_category === flow);
      })
      .map(({year, ...datum}) => ({
        ...datum,

        year: year.toString(),
      }))
      .sort((a, b) => a.year - b.year);

    const trendConfig = {
      ...this.props.config.areaConfig,

      anchor: {
        start: year
      }
    };

    const mix = trend.filter(d => d.year === year);
    const sumOfMix = approximate(mix.reduce((sum, datum) => sum + datum.value, 0));

    return {
      year,
      direction,
      flow,

      trend,
      trendConfig,

      mix,
      sumOfMix
    };
  }

  render() {
    return (<LightBg>
      <Container>

        <Grid centered>

          <Grid.Column width={6}>
            <Dropdown
              selection
              fluid
              onChange={(e, data) => this.update({direction: data.value})}
              value={'in'}
              options={this.state.directions}
            />
          </Grid.Column>

        </Grid>

        <Grid>

          <Grid.Column width={6}>
            <Header as="h3" textAlign="center">
              <Header.Content>Outflows over time</Header.Content>
            </Header>
            <Dropdown
              selection
              fluid
              text="Choose a flow for more details"
              onChange={(e, data) => this.update({flow: data.value})}
              options={this.state.flows}
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Header as="h3" textAlign="center">
              <Header.Content>
                The mix of resources in <span>{this.state.year}</span>
              </Header.Content>
            </Header>
          </Grid.Column>

        </Grid>

        <Grid>

          <Grid.Column width={6}>
            <Timeline
              height="400px"
              data={this.state.trend}
              config={this.state.trendConfig}
              onYearChanged={year => this.update({year})}
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <SectionHeader color="rgb(238, 238, 238)">
              <span>{this.props.config.treemapConfig.labeling.prefix} </span>
              <span>{this.state.sumOfMix}</span>
            </SectionHeader>
            <Chart
              height="360px"
              data={this.state.mix}
              config={this.props.config.treemapConfig}
              onClick={d => {
              }}
            />
          </Grid.Column>

        </Grid>

      </Container>
    </LightBg>);
  }

}


export default AreaPartitionChart;
