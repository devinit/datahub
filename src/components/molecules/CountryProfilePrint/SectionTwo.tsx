import { PrintNarrative } from './graphql';
import { css } from 'glamor';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import {
  ChartHeading,
  ChartSubHeading,
  FooterNotes,
  Narrative,
  SectionTitle
} from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import * as React from 'react';
import InflowsVsOutflows from '../../organisms/InflowsVsOutflows';
import { GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS } from '../../../utils/constants';
import { Grid } from 'semantic-ui-react';
import GovernmentFinance from '../../organisms/GovernmentFinance';
import Chart from '../../molecules/MultiLinePartition';

export interface SectionTwoProps {
  country: Country;
  narratives: PrintNarrative[];
}

export class SectionTwo extends React.Component<SectionTwoProps> {
  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            <SectionTitle>Resource flows to and from { this.props.country.name }</SectionTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page1_section2_chart1_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page1_section2_chart1_heading') }
              </ChartSubHeading>
            </ChartHeading>
            <div { ...css({ paddingTop: '10px' }) }>
              <InflowsVsOutflows
                id={ this.props.country.slug }
                chartId={ INFLOWS_VS_OUTFLOWS }
                year={ 2016 }
                showYearSlider={ false }
                allowShare={ false }
                printVersion
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SectionTitle>Government finance</SectionTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Narrative>
            { getNarrativeValueByKey(this.props.narratives, 'page2_section1_narrative') }
            </Narrative>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart1_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart1_heading') }
              </ChartSubHeading>
            </ChartHeading>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 } className="print-tree-chart">
            <GovernmentFinance
              shouldScrollIntoView={ false }
              id={ this.props.country.slug }
              year={ 2016 }
              chartId={ GOVERNMENT_FINANCE_LOWER }
            >
              <Chart year={ 2016 } renderPrintTreeChart index={ 0 } { ...{} as any }/>
            </GovernmentFinance>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart2_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart2_heading') }
              </ChartSubHeading>
            </ChartHeading>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 } className="print-tree-chart">
            <GovernmentFinance
              shouldScrollIntoView={ false }
              id={ this.props.country.slug }
              year={ 2016 }
              chartId={ GOVERNMENT_FINANCE_LOWER }
            >
              <Chart year={ 2016 } renderPrintTreeChart index={ 1 } { ...{} as any }/>
            </GovernmentFinance>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart3_narrative') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'page2_section1_chart3_heading') }
              </ChartSubHeading>
            </ChartHeading>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 } className="print-tree-chart">
            <GovernmentFinance
              shouldScrollIntoView={ false }
              id={ this.props.country.slug }
              year={ 2016 }
              chartId={ GOVERNMENT_FINANCE_LOWER }
            >
              <Chart year={ 2016 } renderPrintTreeChart index={ 2 } { ...{} as any }/>
            </GovernmentFinance>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <FooterNotes>{ getNarrativeValueByKey(this.props.narratives, 'page2_footer_narrative') }</FooterNotes>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
