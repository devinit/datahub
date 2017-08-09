// @flow
/* eslint-disable react/sort-comp */
import React from 'react';
import {Segment, Grid} from 'semantic-ui-react';
import {SectionHeader} from 'components/atoms/Header';
// eslint-disable-next-line
import approximate from 'approximate-number';
import {LightBg} from '../../atoms/Backgrounds';
import Chart from '../../atoms/Chart/index';
import YearSlider from '../YearSlider/index';

type FlowData = {
  direction: string, // in or out
  year: number,
  value: number,
  flowName: string,
  flowCategory: string, // this is currently flow-group
  flowType: string,
  color: string
}

type Props = {
  startYear: string,
  data: [], // TODO: should be flowData with API integration
  config: any,
}

type State = {
  config: any,
  currentYear: number,
  currentYearData: any,
  inflowSum: number,
  outflowSum: number,
}

class InflowsOutFlows extends React.Component {

  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const maximum = Math.max.apply(null, this.props.data.map(d => d.value));
    const exponent = Math.ceil(Math.log10(maximum));
    const scaleMaximum = Math.ceil(maximum / (10 ** (exponent - 1))) * (10 ** (exponent - 1));

    this.state = {
      ...this.getYearState(parseInt(props.startYear, 10)),

      config: {
        ...this.props.config,

        linearAxis: {
          ...this.props.config.linearAxis,

          axisMinimum: 0,
          axisMaximum: scaleMaximum
        }
      }
    };
  }

  getYearState(year: number) {
    const currentYearData = this.props.data.filter(d => d.year === year);
    const inflowSum = currentYearData.filter(d => d.direction === 'in').reduce((sum, datum) => sum + datum.value, 0);
    const outflowSum = currentYearData.filter(d => d.direction === 'out').reduce((sum, datum) => sum + datum.value, 0);
    return {
      currentYear: year,
      currentYearData,
      inflowSum: approximate(inflowSum),
      outflowSum: approximate(outflowSum),
    };
  }

  updateCurrentYear(year: number) {
    this.setState(this.getYearState(year));
  }


  render() {
    return (
      <LightBg>

        <Grid>

          <Grid.Column width={8}>

            <Segment basic clearing>
              <SectionHeader color="#fff" style={{float: 'right', marginRight: '22px'}}>
                RESOURCE FLOWS TO UNITED KINGDOM <span>{this.state.inflowSum}</span>
              </SectionHeader>
            </Segment>

          </Grid.Column>

          <Grid.Column width={8}>

            <Segment basic clearing>
              <SectionHeader color="#fff" style={{float: 'left', marginLeft: '20px'}}>
                RESOURCE FLOWS FROM UNITED KINGDOM <span>{this.state.outflowSum}</span>
              </SectionHeader>
            </Segment>

          </Grid.Column>

        </Grid>

        <Chart
          height="400px"
          config={this.state.config}
          data={this.state.currentYearData}
        />

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

        </Grid>

      </LightBg>
    );
  }
}

export default InflowsOutFlows;
