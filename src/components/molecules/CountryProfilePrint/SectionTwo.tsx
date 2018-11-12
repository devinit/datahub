import { css } from 'glamor';
import * as React from 'react';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import {
  ChartHeading,
  ChartSubHeading,
  Narrative,
  SectionTitle
} from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';
import InflowsVsOutflows from '../../organisms/InflowsVsOutflows';
import { INFLOWS_VS_OUTFLOWS } from '../../../utils/constants';
import { Grid } from 'semantic-ui-react';

export interface SectionTwoProps {
  country: Country;
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
              Grants account for 9% of total government revenue in Uganda, while indirect tax provides the main revenue source. Domestic and international financing provide 26% of the total resourcing bundle. The government spends 55% of its resources on recurrent expenses and 35% on development projects.
            </Narrative>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
