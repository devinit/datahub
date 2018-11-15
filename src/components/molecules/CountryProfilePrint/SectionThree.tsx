import dynamic, { DynamicOptions } from 'next/dynamic';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import { Narrative, SectionTitle } from '../../atoms/CountryProfilePrint';
import { BarChartProps } from '../../organisms/Charts/molecules/BarChart';
import { ChartConfig, DataPoint } from '../../organisms/Charts/molecules/BarLineChartTypes';
import { LineChartProps } from '../../organisms/Charts/molecules/LineChart';
import { Country } from '../../types';
import { PrintNarrative, RecipientODAProfiles } from './graphql';

export interface SectionThreeProps {
  country?: Country;
  narratives: PrintNarrative[];
  ODAProfiles?: RecipientODAProfiles;
}

export class SectionThree extends React.Component<SectionThreeProps> {
  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            <SectionTitle>ODA</SectionTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={ { paddingTop: 0 } }>
          <Grid.Column>
            <Narrative>{ getNarrativeValueByKey(this.props.narratives, 'page3_section1_narrative') }</Narrative>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            { this.renderLineChart() }
          </Grid.Column>
          <Grid.Column width={ 8 }>
            { this.renderLineChart() }
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }

  private renderLineChart() {
    const formatedODAPerPercentGDP: DataPoint[] = this.props.ODAProfiles
      ? this.props.ODAProfiles.ODAPerPercentGDP.map(d =>
        ({ x: d.year, y: d.value * 100, series: 'ODAPerPercentGDP', attributes: { stroke: '#e84439' } }))
      : [];
    const formatedODAPerPercentGDPExclNonTransfer: DataPoint[] = this.props.ODAProfiles
      ? this.props.ODAProfiles.ODAPerPercentGDPExclNonTransfer.map(d =>
          ({ x: d.year, y: d.value * 100, attributes: { stroke: '#E1656D' } })) // tslint:disable-line
      : [];

    const data = [ ...formatedODAPerPercentGDP, ...formatedODAPerPercentGDPExclNonTransfer ];

    const dynamicOptions: DynamicOptions<LineChartProps, {}> = {
      loading: () => <span>...</span>,
      ssr: false,
      modules: () => ({
        LineChart: import('../../organisms/Charts/molecules/LineChart') as Promise<any>
      }),
      render: (props, { LineChart }) => <LineChart { ...props } />
    };

    return React.createElement(dynamic<BarChartProps, {}>(dynamicOptions as any), {
      data,
      config: this.getConfigs(),
      width: '300px',
      height: '130px'
    });
  }

  private getConfigs(): Partial<ChartConfig> {
    return {
      xAxis: {
        show: true,
        position: 'bottom'
      },
      yAxis: {
        show: true,
        tickingStep: 10,
        suffix: '%'
      },
      legend: { show: true, position: 'top' }
    };
  }
}
