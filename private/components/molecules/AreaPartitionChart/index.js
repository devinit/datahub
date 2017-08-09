// @flow
/* eslint-disable react/sort-comp */
import React from 'react';
import approximate from 'approximate-number';
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
  mixes: Object,
}

type Determinant = {
  direction?: string,
  flow?: string,
}

class AreaPartitionChart extends React.Component {

  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      year: this.props.startYear.toString(),

      ...this.calculateState({
        direction: 'in',
      }),

      directions: [
        {value: 'in', text: `Inflows to ${props.country}`},
        {value: 'out', text: `Outflows from ${props.country}`},
      ],

      flows: [
        {
          value: 'all',
          text: 'All',
        },

        ...makeUnique(this.props.data.map(d => d.flow_category))
          .map(category => {
            const types = makeUnique(
              this.props.data
                .filter(d => d.flow_category === category)
                .map(d => d.flow_type));

            if (types.length > 1) {
              return types.map(type => ({
                text: `${category} (${type})`,
                value: `${category}-${type}`
              }));
            }

            return types.map(type => ({
              text: category,
              value: `${category}-${type}`
            }));
          })
          .reduce((all, group) => [...all, ...group], [])
      ]
    };
  }

  setYear(year: string) {
    this.setState({year});
  }

  update(determinants: Determinant) {
    const state = this.calculateState({
      direction: determinants.direction || this.state.direction,
      flow: determinants.flow || this.state.flow
    });

    this.setState(state);
  }

  calculateState(determinants: Determinant) {
    const {direction, flow} = determinants;

    const trend = this.props.data
      .filter(d => {
        return d.direction === direction &&
          (!flow || flow === 'all' || d.flow_group === flow);
      })
      .map(({year, ...datum}) => ({
        ...datum,

        year: year.toString(),
      }))
      .sort((a, b) => a.year - b.year);

    const mixes = trend.reduce((map, datum) => {
      return {
        ...map,

        [datum.year]: [
          ...(map[datum.year] || []),

          datum,
        ]
      };
    }, {});

    return {
      direction,
      flow,

      trend,

      mixes
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
              config={{
                ...this.props.config.areaConfig,

                anchor: {
                  start: this.state.year
                }
              }}
              onYearChanged={year => this.setYear(year)}
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <SectionHeader color="rgb(238, 238, 238)">
              {this.props.config.treemapConfig.labeling.prefix}{' '}
              {approximate((this.state.mixes[+this.state.year] || [])
                .reduce((sum, datum) => sum + datum.value, 0))}
            </SectionHeader>
            <Chart
              height="360px"
              data={this.state.mixes[+this.state.year] || []}
              config={this.props.config.treemapConfig}
            />
          </Grid.Column>

        </Grid>

      </Container>
    </LightBg>);
  }

}


export default AreaPartitionChart;
