import { red } from '../../theme/semantic';
import * as React from 'react';
import { groupBy } from 'ramda';
import { SectionHeader } from '../../atoms/Header';
import { Container, Dimmer, Dropdown, Grid, Header } from 'semantic-ui-react';
import { DONOR } from '../../../utils/constants';
import { approximate } from '@devinit/prelude/lib/numbers';
import ErrorBoundary from '../ErrorBoundary';
import { LightBg, NoDataAvailableContainer } from '../../atoms/Container';
import TreeChart from '../../atoms/TreeChart';
import Timeline from '../../atoms/Timeline';

export interface DetailSelection {
  value: string;
  unbundle: boolean;
  text: string;
  key: number | string;
}
export interface FlowState {
  flow?: string;
  flowName?: string;
  detailSelections?: DetailSelection[];
  detailGroup?: string;
  shouldUnbundle?: boolean;
  trend: DH.IResourceData[];
  mixes: {[index: string]: DH.IResourceData[]};
}
export interface Flow {
  key: string;
  text: string;
  value: string;
}
export type DirectionState = FlowState & {
  flows: Flow[]
  direction: string;
};

export interface UProps {
  shouldFetch?: boolean;
  year: number;
  resourceId: string;
  countryId: string;
  groupById?: string;
  flow?: string;
  config: any;
}
export type State = DirectionState & {
  year: number;
  flows: Flow[];
  directions: Array<{value: string, text: string}>;
};

export interface Props {
  id: string;
  year: number;
  countryType: string;
  country: string;
  data: DH.IResourceData[];
  config: any;
  startYear: number;
  inflows: DH.IFlow[];
  outflows: DH.IFlow[];
  unbundlingInternationalResources: React.ComponentClass<UProps>;
  cached?: State;
}

class AreaPartitionChart extends React.Component<Props, State> {
  // this contains list of oda & oof flows that we should use with
  // unbundlingInternationalResources

  public odaAndOOFFlows: string[] = [ 'oda-out', 'oda-in', 'oofs-out', 'oofs-in' ];

  constructor(props: Props) {
    super(props);
    this.state = this.initState(props);
  }

  public render() {
    return (
      <LightBg>
        <Container>
          <Grid centered>
            <Grid.Column mobile={ 16 } computer={ 8 }>
              <Dropdown
                selection
                fluid
                onChange={ this.setDirection }
                value={ this.state.direction }
                options={ this.state.directions }
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column mobile={ 16 } computer={ 7 }>
              <div style={ { minHeight: '85px' } }>
                <Header as="h3" textAlign="center">
                  <Header.Content>
                    { this.state.direction === 'in' ? 'Inflows' : 'Outflows' } over time
                  </Header.Content>
                </Header>
                <Dropdown
                  selection
                  fluid
                  onChange={ this.setFlow }
                  value={ this.state.flow }
                  options={ this.state.flows }
                />
              </div>
              <ErrorBoundary>
                <Timeline
                  height="400px"
                  data={ this.state.trend }
                  config={ {
                    ...this.props.config.areaConfig,

                    anchor: {
                      start: this.state.year.toString()
                    }
                  } }
                  onYearChanged={ this.setYear }
                />
              </ErrorBoundary>
            </Grid.Column>

            <Grid.Column mobile={ 1 } computer={ 1 } />

            <Grid.Column mobile={ 16 } computer={ 8 }>
              <div style={ { minHeight: '85px' } }>
                { this.state.flow === 'all'
                  ? <Header as="h3" textAlign="center">
                    <Header.Content>
                      The mix of resources in <span style={ { color: red } }>{ this.state.year }</span>
                    </Header.Content>
                  </Header>
                  : <Header as="h3" textAlign="center">
                    <Header.Content>
                      <span>
                          What we know about { this.state.flowName } by{ ' ' }
                      </span>
                      {
                        <Dropdown
                          selection
                          compact
                          onChange={ this.setFlowDetailGroup }
                          value={ this.state.detailGroup }
                          options={
                            this.state.detailSelections &&
                            this.state.detailSelections.map(d => ({
                              text: d.text,
                              value: d.value,
                              key: d.key
                            }))
                          }
                        />
                      }
                      <span>
                        { ' ' }in { this.state.year }
                      </span>
                    </Header.Content>
                  </Header>
                }
              </div>
              <SectionHeader color="rgb(238, 238, 238)">
                { this.props.config.treemapConfig.labeling.prefix }{ ' ' }
                {
                  approximate((this.state.mixes[+this.state.year] || [])
                    .reduce((sum, datum) => sum + datum.value, 0))
                }
              </SectionHeader>
              { this.renderChart() }
            </Grid.Column>
          </Grid>
        </Container>
      </LightBg>
    );
  }

  private renderChart() {
      if (this.state.flow === 'all') {
        return (
          <ErrorBoundary message="Error on TreeChart">
            <TreeChart
              height="360px"
              data={ this.state.mixes[+this.state.year] || [] }
              config={ this.props.config.treemapConfig }
              // tslint:disable-next-line:jsx-no-lambda
              onClick={ (d: { flow_id: string }) =>
                this.setState(this.getFlowState(this.state.direction, d.flow_id)) }
            />
          </ErrorBoundary>
        );
      }

      return this.renderUnbundlingInternationResources();
  }

  private renderUnbundlingInternationResources() {
    const UnbundlingInternationalResources = this.props.unbundlingInternationalResources;
    if (this.odaAndOOFFlows.includes(this.state.flow || '')) {
      return (
        <ErrorBoundary message="Error on UnbundlingInternationalResources chart">
            <UnbundlingInternationalResources
              shouldFetch={ this.state.shouldUnbundle }
              countryId={ this.props.id }
              year={ this.state.year }
              groupById={ this.state.detailGroup }
              resourceId={ this.state.flow || '' } // TODO: shouldnt be nullable
              config={ this.props.config.treemapConfig }
            />
        </ErrorBoundary>
      );
    }

    return (
      <Dimmer
        style={ {
          backgroundColor: '#888',
          zIndex: 1,
          height: '360px',
          position: 'relative'
        } }
        active
      >
        <NoDataAvailableContainer>
            Detailed data is not available for this year
        </NoDataAvailableContainer>
      </Dimmer>
    );
  }

  public initState(props: Props): State {
    const year = this.props.startYear;
    const direction = this.props.countryType !== DONOR ? 'in' : 'out';
    const directions = [
      { value: 'in', text: `Inflows to ${props.country}` },
      { value: 'out',
        text: this.props.countryType !== DONOR ?
          `Outflows leaving ${props.country}` : `Outflows from ${props.country}` }
    ];

    return {
      year,
      direction,
      directions,
      ...this.getDirectionState(direction)
    };
  }

  public setYear = (year: number | string) => {
    this.setState({
      year: +year
    });
  }

  public setDirection = (_event, data) => {
    this.setState(this.getDirectionState(data.value));
  }

  public setFlow = (_event, data) => {
    this.setState(this.getFlowState(this.state.direction, data.value));
  }

  public setFlowDetailGroup = (_event, data) => {
    const selections = this.state.detailSelections;
    const filtered = selections && selections.find(d => d.value === data.value);

    this.setState({
      detailGroup: data.id,
      shouldUnbundle: filtered && filtered.unbundle
    });
  }

  public getDirectionState(direction: string): DirectionState {
    const flows = [
      {
        key: 'all',
        text: 'Choose a flow for more details',
        value: 'all'
      },

      ...(direction === 'in' ? this.props.inflows : this.props.outflows).map(flowx => ({
        key: flowx.id,
        text: flowx.name,
        value: flowx.id
      }))
    ];

    const flow = 'all';

    return {
      direction,
      flow,
      flows,
      ...this.getFlowState(direction, flow)
    };
  }

  public getFlowState(direction: string, flow?: string): FlowState {
    const trend = this.props.data
      .filter(d => d.direction === direction && (flow === 'all' || d.flow_id === flow))
      .sort((a, b) => b.value - a.value);

    const flows = direction === 'in' ? this.props.inflows : this.props.outflows;

    const flowDetails = flows.find(f => f.id === flow);

    const detailSelections: DetailSelection[] = (flowDetails && flowDetails.selections || [])
      .map(({ id, name, unbundle }, i) => ({
        text: name,
        value: id,
        key: i,
        unbundle
      }));

    const selection = detailSelections[0] || {};

    return {
      flow,
      flowName: flowDetails && flowDetails.name,
      trend,
      detailSelections,
      detailGroup: selection.value,
      shouldUnbundle: selection.unbundle,
      mixes: groupBy(d => `${d.year}`, trend)
    };
  }
}

export default AreaPartitionChart;
