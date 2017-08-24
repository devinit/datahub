// @flow
/* eslint-disable react/sort-comp */
import React from 'react';
import { approximate } from 'lib/utils';
import { groupBy } from 'ramda';
import { SectionHeader } from 'components/atoms/Header';
import UnbundlingInternationalResources from 'components/organisms/UnbundlingInternationalResources';
import { Container, Dropdown, Grid, Header } from 'semantic-ui-react';
import { LightBg } from '../../atoms/Backgrounds';
import TreeChart from '../../atoms/TreeChart';
import Timeline from '../../atoms/Timeline';

export type State = {
  directions: Object[], // TOFIX: @ernest add proper types
  flows: Object[], // TOFIX: @ernest add proper types

  year: number,
  direction: string,
  flow?: string,
  flowName?: string,
  detailSelections?: Object[], // TOFIX: @ernest add proper types
  detailGroup?: string,
  shouldUnbundle?: boolean,

  trend: Object[], // TOFIX: @ernest add proper types
  mixes: Object, // TOFIX: @ernest add proper types
};
export type Props = {
  id: string,
  country: string,
  data: any[], // TODO: reuse FlowData type currently in the inflows outflows file
  config: any,
  startYear: number,
  inflows: any[],
  outflows: any[],
  cached?: State,
};

class AreaPartitionChart extends React.Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = this.initState(props);
  }

  initState(props: Props) {
    const year = this.props.startYear;
    const direction = 'in';
    const directions = [
      { value: 'in', text: `Inflows to ${props.country}` },
      { value: 'out', text: `Outflows leaving ${props.country}` },
    ];

    return {
      year,
      direction,
      directions,

      ...this.getDirectionState(direction),
    };
  }

  setYear(year: number) {
    this.setState({
      year,
    });
  }

  setDirection(direction: string) {
    this.setState(this.getDirectionState(direction));
  }

  setFlow(id: string) {
    this.setState(this.getFlowState(this.state.direction, id));
  }

  setFlowDetailGroup(id: string) {
    const selections = this.state.detailSelections || {};
    const [selection = {}] = selections.filter(d => d.value === id);

    this.setState({
      detailGroup: id,
      shouldUnbundle: selection.unbundle,
    });
  }

  getDirectionState(direction: string) {
    const flows = [
      {
        key: 'all',
        text: 'Choose a flow for more details',
        value: 'all',
      },

      ...(direction === 'in' ? this.props.inflows : this.props.outflows).map(flow => ({
        key: flow.id,
        text: flow.name,
        value: flow.id,
      })),
    ];

    const flow = 'all';

    return {
      direction,
      flow,
      flows,
      ...this.getFlowState(direction, flow),
    };
  }

  getFlowState(direction: string, flow?: string) {
    const trend = this.props.data
      .filter(d => d.direction === direction && (flow === 'all' || d.flow_id === flow))
      .sort((a, b) => b.value - a.value);

    const flows = direction === 'in' ? this.props.inflows : this.props.outflows;

    const [flowDetails = {}] = flows.filter(f => f.id === flow);

    const detailSelections = (flowDetails.selections || []).map(({ id, name, unbundle }, i) => ({
      text: name,
      value: id,
      key: i,
      unbundle,
    }));

    const selection = detailSelections[0] || {};

    return {
      flow,
      flowName: flowDetails.name,
      trend,
      detailSelections,
      detailGroup: selection.value,
      shouldUnbundle: selection.unbundle,
      mixes: groupBy(d => d.year, trend),
    };
  }

  render() {
    return (
      <LightBg>
        <Container>
          <Grid centered>
            <Grid.Column width={6}>
              <Dropdown
                selection
                fluid
                onChange={(e, data) => this.setDirection(data.value)}
                value={this.state.direction}
                options={this.state.directions}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={7}>
              <Header as="h3" textAlign="center">
                <Header.Content>
                  {this.state.direction === 'in' ? 'Inflows' : 'Outflows'} over time
                </Header.Content>
              </Header>
              <Dropdown
                selection
                fluid
                onChange={(e, data) => this.setFlow(data.value)}
                value={this.state.flow}
                options={this.state.flows}
              />
            </Grid.Column>

            <Grid.Column width={1} />

            {this.state.flow === 'all'
              ? <Grid.Column width={8}>
                <Header as="h3" textAlign="center">
                  <Header.Content>
                      The mix of resources in <span>{this.state.year}</span>
                  </Header.Content>
                </Header>
              </Grid.Column>
              : <Grid.Column width={8}>
                <Header as="h3" textAlign="center">
                  <Header.Content>
                    <span>
                        What we know about {this.state.flowName} by{' '}
                    </span>
                    {
                      <Dropdown
                        selection
                        compact
                        onChange={(e, data) => this.setFlowDetailGroup(data.value)}
                        value={this.state.detailGroup}
                        options={this.state.detailSelections}
                      />
                    }
                    <span>
                      {' '}in {this.state.year}
                    </span>
                  </Header.Content>
                </Header>
              </Grid.Column>}
          </Grid>

          <Grid>
            <Grid.Column width={7}>
              <Timeline
                height="400px"
                data={this.state.trend}
                config={{
                  ...this.props.config.areaConfig,

                  anchor: {
                    start: this.state.year.toString(),
                  },
                }}
                onYearChanged={year => this.setYear(+year)}
              />
            </Grid.Column>

            <Grid.Column width={1} />

            <Grid.Column width={8}>
              <SectionHeader color="rgb(238, 238, 238)">
                {this.props.config.treemapConfig.labeling.prefix}{' '}
                {approximate(
                  (this.state.mixes[+this.state.year] || [])
                    .reduce((sum, datum) => sum + datum.value, 0),
                )}
              </SectionHeader>
              {this.state.flow === 'all'
                ? <TreeChart
                  height="360px"
                  data={this.state.mixes[+this.state.year] || []}
                  config={this.props.config.treemapConfig}
                  onClick={(d: { flow_id: string }) => this.setFlow(d.flow_id)}
                />
                : <UnbundlingInternationalResources
                  shouldFetch={this.state.shouldUnbundle}
                  country={this.props.id}
                  year={this.state.year}
                  groupBy={this.state.detailGroup}
                  flow={this.state.flow}
                  config={this.props.config.treemapConfig}
                />}
            </Grid.Column>
          </Grid>
        </Container>
      </LightBg>
    );
  }
}

export default AreaPartitionChart;
