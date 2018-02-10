// @flow
/* eslint-disable react/sort-comp */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { groupBy } from 'ramda';
import { Grid, Segment } from 'semantic-ui-react';
import { SectionHeader } from '../../atoms/Header';
import {approximate} from '@devinit/dh-base/lib/utils';
import ChartShare from '../ChartShare';
import { RECIPIENT } from '@devinit/dh-base/lib/utils/constants';
import { LightBg } from '../../atoms/Backgrounds';
import Chart from '../../atoms/Chart';
import YearSlider from '../YearSlider';

export interface State  {
  data: any;
  config: any;
  currentYear: number;
  currentYearData: any;
  inflowSum: string;
  outflowSum: string;
}

export interface Props  {
  country: string;
  countryType?: string;
  startYear: number;
  // for scrolling to this chart, think of it has the chart container ID
  chartId?: string;
  // from share url, cached state
  year?: number;
  shouldScrollIntoView?: boolean;
  data: any[]; // TODO: should be flowData with API integration
  config: any;
  cached?: State;
}

class SlidingDualSidebar extends React.Component <Props, State> {
  public static normalizeDataset(data: any[]) {
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
  constructor(props: Props) {
    super(props);

    const maximum = Math.max.apply(null, this.props.data.map(d => d.value));
    const exponent = Math.ceil(Math.log10(maximum));
    const scaleMaximum = Math.ceil(maximum / (10 ** (exponent - 1))) * (10 ** (exponent - 1));

    const data = SlidingDualSidebar.normalizeDataset(props.data);

    this.state = {
      data,
      ...this.getYearState(data, props.year || +props.startYear),

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

  // eslint-disable-next-line class-methods-use-this
  public getYearState(data: any, year: number) {
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

  public updateCurrentYear(year: number) {
    this.setState(this.getYearState(this.state.data, year));
  }

  public render() {
    const {countryType, country} = this.props;
    const blacklist = ['UAE', 'Saudi Arabia', 'Kuwait'];
    return (
      <LightBg
        // tslint:disable-next-line:jsx-no-lambda
        innerRef={node => this.props.shouldScrollIntoView && node ? node.scrollIntoView() : null}
      >
        <Grid>
          <Grid.Column width={8}>
            <Segment basic clearing>
              <SectionHeader color="#fff" style={{ float: 'right', marginRight: '47px' }}>
                {
                  countryType !== RECIPIENT || blacklist.includes(country) ?
                    `RESOURCE FLOWS FROM DEVELOPING COUNTRIES ${' '}` : `RESOURCE FLOWS TO ${country} `
                }
                <span>{this.state.inflowSum}</span>
              </SectionHeader>
            </Segment>
          </Grid.Column>

          <Grid.Column width={8}>
            <Segment basic clearing>
              <SectionHeader color="#fff" style={{ float: 'left', marginLeft: '45px' }}>
                { countryType !== RECIPIENT || blacklist.includes(country) ?
                  `RESOURCE FLOWS TO DEVELOPING COUNTRIES ${' '}` : `RESOURCE FLOWS LEAVING ${country} `}
                <span>{this.state.outflowSum}</span>
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
                maximum={this.props.startYear}
                step={1}
                position={this.state.currentYear}
                onChange={this.updateCurrentYear}
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
