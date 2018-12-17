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
    const year = getNarrativeValueByKey(this.props.narratives, 'p1_r3_year');

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
              { getNarrativeValueByKey(this.props.narratives, 'p1_r3') }
              <ChartSubHeading>
                { year }, international resource inflows and outflows (US$ billions, constant { year } prices)
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
            { getNarrativeValueByKey(this.props.narratives, 'p2_intro') }
            </Narrative>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <ChartHeading>
              { getNarrativeValueByKey(this.props.narratives, 'p2_r4') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'p2_r4_year') },
                latest year of actual revenue (US$ billions, constant 2015 prices)
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
              { getNarrativeValueByKey(this.props.narratives, 'p2_r5') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'p2_r5_year') },
                latest year of actual financing (US$ billions, constant 2015 prices)
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
              { getNarrativeValueByKey(this.props.narratives, 'p2_r6') }
              <ChartSubHeading>
                { getNarrativeValueByKey(this.props.narratives, 'p2_r6_year') },
                latest year of actual expenditure (US$ billions, constant 2015 prices)
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
            <FooterNotes>{ getNarrativeValueByKey(this.props.narratives, 'p2_notes') }</FooterNotes>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
