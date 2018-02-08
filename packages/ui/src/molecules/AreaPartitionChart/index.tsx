/* tslint-disable react/sort-comp */
/* tslint-disable no-nested-ternary */
import * as React from 'react';
import { approximate } from '@devinit/dh-base/lib/utils';
import { groupBy } from 'ramda';
import { SectionHeader } from '../../atoms/Header';
import UnbundlingInternationalResources, {
  NoDataAvailableContainer,
} from '@devinit/dh-app/lib/UnbundlingInternationalResources';
import { Dimmer, Container, Dropdown, Grid, Header } from 'semantic-ui-react';
import { DONOR } from '@devinit/dh-base/lib/utils/constants';
import { red } from '../../theme/semantic';
import { LightBg } from '../../atoms/Backgrounds';
import TreeChart from '../../atoms/TreeChart';
import Timeline from '../../atoms/Timeline';

export interface State  {
  directions: object[]; // TOFIX: @ernest add proper types
  flows: object[]; // TOFIX: @ernest add proper types

  year: number;
  direction: string;
  flow?: string;
  flowName?: string;
  detailSelections?: object[]; // TOFIX: @ernest add proper types
  detailGroup?: string;
  shouldUnbundle?: boolean;

  trend: object[]; // TOFIX: @ernest add proper types
  mixes: object[]; // TOFIX: @ernest add proper types
}

export interface Props  {
  id: string;
  countryType: string;
  country: string;
  data: any[]; // TODO: reuse FlowData type currently in the inflows outflows file
  config: any;
  startYear: number;
  inflows: any[];
  outflows: any[];
  cached?: State;
}

class AreaPartitionChart extends React.Component<Props> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.state = this.initState(props);
  }

  public initState(props: Props) {
    const year = this.props.startYear;
    const direction = this.props.countryType !== DONOR ? 'in' : 'out';
    const directions = [
      { value: 'in', text: `Inflows to ${props.country}` },
      { value: 'out',
        text: this.props.countryType !== DONOR ?
          `Outflows leaving ${props.country}` : `Outflows from ${props.country}` },
    ];

    return {
      year,
      direction,
      directions,

      ...this.getDirectionState(direction),
    };
  }

  public setYear(year: number) {
    this.setState({
      year,
    });
  }

  public setDirection(direction: string) {
    this.setState(this.getDirectionState(direction));
  }

  public setFlow(id: string) {
    this.setState(this.getFlowState(this.state.direction, id));
  }

  public setFlowDetailGroup(id: string) {
    const selections = this.state.detailSelections || {};
    const [selection = {}] = selections.filter(d => d.value === id);

    this.setState({
      detailGroup: id,
      shouldUnbundle: selection.unbundle,
    });
  }

  public getDirectionState(direction: string) {
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

  public getFlowState(direction: string, flow?: string) {
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

  public render() {
    return (
      <LightBg>
        <Container>
          <Grid centered>
            <Grid.Column mobile={16} computer={8}>
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
            <Grid.Column mobile={16} computer={7}>
              <div style={{minHeight: '85px'}}>
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
              </div>

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

            <Grid.Column mobile={1} computer={1} />

            <Grid.Column mobile={16} computer={8}>
              <div style={{minHeight: '85px'}}>
                {this.state.flow === 'all'
                  ? <Header as="h3" textAlign="center">
                    <Header.Content>
                      The mix of resources in <span style={{color: red}}>{this.state.year}</span>
                    </Header.Content>
                  </Header>
                  : <Header as="h3" textAlign="center">
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
                          options={
                            this.state.detailSelections &&
                            this.state.detailSelections.map(d => ({
                              text: d.text,
                              value: d.value,
                              key: d.key,
                            }))
                          }
                        />
                      }
                      <span>
                        {' '}in {this.state.year}
                      </span>
                    </Header.Content>
                  </Header>
                }
              </div>
              <SectionHeader color="rgb(238, 238, 238)">
                {this.props.config.treemapConfig.labeling.prefix}{' '}
                {approximate(
                  (this.state.mixes[+this.state.year] || [])
                    .reduce((sum, datum) => sum + datum.value, 0),
                )}
              </SectionHeader>
              {this.state.flow === 'all'
                ? !this.state.mixes[+this.state.year] || !this.state.mixes[+this.state.year].length
                  ? <Dimmer
                    style={{
                      backgroundColor: '#888',
                      zIndex: 1,
                      height: '360px',
                      position: 'relative',
                    }}
                    active
                  >
                    <NoDataAvailableContainer>
                        Detailed data is not available for this year
                    </NoDataAvailableContainer>
                  </Dimmer>
                  : <TreeChart
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
