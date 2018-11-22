import * as React from 'react';
import {
  BoxSubHeader,
  BoxUnit,
  ChartAxisLabel,
  ChartHeading,
  ChartSubHeading,
  FooterNotes,
  GreyBox,
  MutedHeader,
  SectionTitle,
  ValueHeader
} from '../../atoms/CountryProfilePrint';
import { css } from 'glamor';
import Chart from '../../atoms/Chart';
import povertyConfig from '../../visbox/printProfiles';
import { ChartConfig, DataPoint } from '../../organisms/Charts/shared';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { BarChartProps } from '../../organisms/Charts/components/BarChart';
import { PrintNarrative } from './graphql';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import { Grid } from 'semantic-ui-react';

export interface SectionOneProps {
  poorestPeople?: string | null;
  population?: string | null;
  domesticResources?: string | null;
  internationalResources?: string | null;
  governmentSpendPerPerson?: string | null;
  depthOfExtremePoverty?: string | null;
  poverty190Trend?: Array<{
    year: number;
    uid: string;
    value: number | null;
    name: string;
  } | null>;
  incomeDistributionTrend?: Array<{
    value: number;
    quintileName: string;
  } | null>;
  narratives: PrintNarrative[];
}

export class SectionOne extends React.Component<SectionOneProps> {
  // private pageData = getCountryProfileData(this.props.country.slug);
  render() {
    return (
      <React.Fragment>
        <div><SectionTitle>Overview</SectionTitle></div>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            <GreyBox { ...css({ height: '100px !important', marginLeft: '0 !important' }) }>
              <MutedHeader>How many of the poorest 20% of people globally live in Uganda</MutedHeader>
              <ValueHeader>{ this.props.poorestPeople || 'No Data' }</ValueHeader>
            </GreyBox>
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <GreyBox { ...css({ height: '100px !important' }) }>
              <MutedHeader>How deep is poverty</MutedHeader>
              <ValueHeader>{ this.props.depthOfExtremePoverty || 'No Data' }</ValueHeader>
            </GreyBox>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            <GreyBox { ...css({ marginLeft: '0 !important' }) }>
              <MutedHeader>What resources are available</MutedHeader>
              <BoxSubHeader>
                <BoxUnit>Domestic public</BoxUnit>
                <span>{ this.props.domesticResources || 'No Data' }</span>
              </BoxSubHeader>
              <BoxSubHeader>
                <BoxUnit>International</BoxUnit>
                <span>{ this.props.internationalResources || 'No Data' }</span>
              </BoxSubHeader>
            </GreyBox>
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <GreyBox>
              <MutedHeader>How much does the government spend per person</MutedHeader>
              <ValueHeader>{ this.props.governmentSpendPerPerson || 'No Data' }</ValueHeader>
              <BoxSubHeader><BoxUnit>See Notes</BoxUnit></BoxSubHeader>
            </GreyBox>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page1_section1_chart1_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page1_section1_chart1_heading') }
              </ChartSubHeading>
            </ChartHeading>
            <Chart
              config={ { ...povertyConfig.area, timeAxis: { ...povertyConfig.area.timeAxis, tickingStep: 2 } } }
              data={ this.props.poverty190Trend }
              width="300px"
              height="100px"
            />
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page1_section1_chart2_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page1_section1_chart2_heading') }
              </ChartSubHeading>
            </ChartHeading>
            <div { ...css({ paddingTop: '10px' }) }>
              { this.renderBarChart() }
              <ChartAxisLabel>
                { getNarrativeValueByKey(this.props.narratives, 'page1_section1_chart2_footer') }
              </ChartAxisLabel>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <FooterNotes>{ getNarrativeValueByKey(this.props.narratives, 'page1_footer_narrative') }</FooterNotes>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }

  private renderBarChart() {
    const dynamicOptions: DynamicOptions<BarChartProps, {}> = {
      loading: () => <span>...</span>,
      ssr: false,
      modules: () => ({
        BarChart: (async () => {
          const { BarChart } = await import('../../organisms/Charts/components/BarChart');

          return BarChart;
        })()
      }),
      render: (props, { BarChart }) => <BarChart { ...props } />
    };

    return React.createElement(dynamic<BarChartProps, {}>(dynamicOptions as any), {
      data: this.processIncomeDistributionTrend() as DataPoint[],
      config: this.getBarConfigs(),
      width: '300px',
      height: '100px'
    });
  }

  private processIncomeDistributionTrend() {
    if (this.props.incomeDistributionTrend) {
      return this.props.incomeDistributionTrend
        .filter(data => !!data)
        .map(d => d && ({ ...d, color: '#e84439' }))
        .map(data => {
          if (data) {
            if (data.quintileName === 'value bottom 20%') {
              data.quintileName = 'Lowest 20%';
            } else if (data.quintileName === 'value 2nd quintile') {
              data.quintileName = '2nd 20%';
            } else if (data.quintileName === 'value 3rd quintile') {
              data.quintileName = '3rd 20%';
            } else if (data.quintileName === 'value 4th quintile') {
              data.quintileName = '4th 20%';
            } else if (data.quintileName === 'value 5th quintile') {
              data.quintileName = 'Highest 20%';
            }
          }

          return data;
        })
        .map(data => {
          if (data) {
            return {
              x: data.quintileName,
              y: data.value,
              attributes: { fill: data.color, stroke: data.color }
            };
          }

          return data;
        });
    }

    return [];
  }

  private getBarConfigs(): Partial<ChartConfig> {
    return {
      labels: {
        show: 'always',
        suffix: '%'
      },
      xAxis: {
        show: true,
        position: 'bottom'
      },
      yAxis: { show: false },
      legend: { show: false }
    };
  }
}
