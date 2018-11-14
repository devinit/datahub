import dynamic, { DynamicOptions } from 'next/dynamic';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import { Narrative, SectionTitle } from '../../atoms/CountryProfilePrint';
import { BarChartProps } from '../../organisms/Charts/molecules/BarChart';
import { ChartConfig, DataPoint } from '../../organisms/Charts/molecules/BarLineChartTypes';
import { LineChartProps } from '../../organisms/Charts/molecules/LineChart';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';

export interface SectionThreeProps {
  country?: Country;
  narratives: PrintNarrative[];
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
        </Grid.Row>
      </React.Fragment>
    );
  }

  private renderLineChart() {
    const data: DataPoint[] = [
      { x: 'Jan', y: 1, series: 'm' },
      { x: 'Feb', y: 3, series: 'm' },
      { x: 'Mar', y: 2, series: 'm' },
      { x: 'Jan', y: 4, attributes: { stroke: '#333' } },
      { x: 'Feb', y: 3, attributes: { stroke: '#333' } },
      { x: 'Mar', y: 5, attributes: { stroke: '#333' } }
    ];

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
      height: '100px',
      attributes: { stroke: '#e84439' }
    });
  }

  private getConfigs(): Partial<ChartConfig> {
    return {
      xAxis: {
        show: true,
        position: 'bottom'
      },
      yAxis: { show: true }
    };
  }
}
