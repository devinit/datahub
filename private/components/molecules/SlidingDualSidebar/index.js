// @flow
/* eslint-disable react/sort-comp */
import React from 'react';
import { groupBy } from 'ramda';
import { Grid, Segment } from 'semantic-ui-react';
import { SectionHeader } from 'components/atoms/Header';
import {approximate} from 'lib/utils';
import ChartShare from 'components/molecules/ChartShare';
import { LightBg } from 'components/atoms/Backgrounds';
import Chart from 'components/atoms/Chart';
import YearSlider from '../YearSlider';


export type State = {
  data: Object,
  config: any,
  currentYear: number,
  currentYearData: any,
  inflowSum: string,
  outflowSum: string,
};

export type Props = {
  country: string,
  startYear: number,
  // for scrolling to this chart, think of it has the chart container ID
  chartId?: string,
  // from share url, cached state
  year?: number,
  shouldScrollIntoView?: boolean,
  data: Object[], // TODO: should be flowData with API integration
  config: any,
  cached?: State
};

class SlidingDualSidebar extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const maximum = Math.max.apply(null, this.props.data.map(d => d.value));
    const exponent = Math.ceil(Math.log10(maximum));
    const scaleMaximum = Math.ceil(maximum / (10 ** (exponent - 1))) * (10 ** (exponent - 1));

    const data = SlidingDualSidebar.normalizeDataset(props.data);

    this.state = {
      data,
      ...this.getYearState(data, parseInt(props.year || props.startYear, 10)),

      config: {
        ...this.props.config,

        linearAxis: {
          ...this.props.config.linearAxis,

          axisMinimum: 0,
          axisMaximum: scaleMaximum,
        },
      },
    };
  }

  /**
   * Makes every year has all flows unique flows in the data set
   * @param data
   */
  static normalizeDataset(data: Object[]) {
    // Group by unique flow-name
    const types = groupBy(
      d => `${d.direction}~${d.flow_type}~${d.flow_category}~${d.flow_name}`,
      data
    );
    const groupedByYear = groupBy(d => d.year, data);


    const expected = Object.keys(types).map(t => {
      const [direction, type, category, name] = t.split('~');
      return { direction, type, category, name };
    });

    return Object.keys(groupedByYear).reduce((all, year) => {
      return {
        ...all,
        [year]: expected.map(({name, category, direction, type}) => {
          const existing = groupedByYear[year].find(
            d =>
              d.year === +year && d.direction === direction &&
              d.flow_name === name &&
              d.flow_category === category &&
              d.flow_type === type,
          );
          return (
            existing || {
              year,
              direction,
              flow_name: name,
              flow_category: category,
              flow_type: type,
              value: 0,
              color: '#fff',
            }
          );
        }),
      };
    }, {});
  }

  // eslint-disable-next-line class-methods-use-this
  getYearState(data: Object, year: number) {
    const currentYearData = data[year];
    const inflowSum = currentYearData
      .filter(d => d.direction === 'in')
      .reduce((sum, datum) => sum + datum.value, 0);
    const outflowSum = currentYearData
      .filter(d => d.direction === 'out')
      .reduce((sum, datum) => sum + datum.value, 0);
    return {
      currentYear: year,
      currentYearData,
      inflowSum: approximate(inflowSum),
      outflowSum: approximate(outflowSum),
    };
  }

  updateCurrentYear(year: number) {
    this.setState(this.getYearState(this.state.data, year));
  }

  render() {
    return (
      <LightBg
        innerRef={node => this.props.shouldScrollIntoView && node ? node.scrollIntoView() : null}
      >
        <Grid>
          <Grid.Column width={8}>
            <Segment basic clearing>
              <SectionHeader color="#fff" style={{ float: 'right', marginRight: '47px' }}>
                RESOURCE FLOWS TO {this.props.country} <span>{this.state.inflowSum}</span>
              </SectionHeader>
            </Segment>
          </Grid.Column>

          <Grid.Column width={8}>
            <Segment basic clearing>
              <SectionHeader color="#fff" style={{ float: 'left', marginLeft: '45px' }}>
                RESOURCE FLOWS LEAVING {this.props.country} <span>{this.state.outflowSum}</span>
              </SectionHeader>
            </Segment>
          </Grid.Column>
        </Grid>

        <Chart height="400px" config={this.state.config} data={this.state.currentYearData} />

        <Grid centered>
          <Grid.Column width={8}>
            <Segment padded={'very'} basic>
              <YearSlider
                minimum={2000}
                maximum={2015}
                step={1}
                position={this.state.currentYear}
                onChange={year => this.updateCurrentYear(year)}
              />
            </Segment>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={6} textAlign="center">
              <ChartShare
                background={false}
                hover
                color="grey"
                size="medium"
                stateToShare={{
                  year: this.state.currentYear,
                  chartId: this.props.chartId
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </LightBg>
    );
  }
}

export default SlidingDualSidebar;
