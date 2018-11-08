import { css } from 'glamor';
import * as React from 'react';
import { getNarrativeValueByKey } from '../../../utils/print-narratives';
import {
  ChartBoxLarge,
  ChartHeading,
  ChartSubHeading,
  SectionTitle,
  TableCell,
  marginRight
} from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';
import { PrintNarrative } from './graphql';
import InflowsVsOutflows from '../../organisms/InflowsVsOutflows';
import { INFLOWS_VS_OUTFLOWS } from '../../../utils/constants';

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
        <tr>
          <TableCell colSpan={ 4 }>
            <SectionTitle>Resource flows to and from { this.props.country.name }</SectionTitle>
          </TableCell>
        </tr>
        <tr>
          <TableCell colSpan={ 2 }>
            <ChartBoxLarge { ...marginRight(20) }>
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
                />
              </div>
            </ChartBoxLarge>
          </TableCell>
        </tr>
      </React.Fragment>
    );
  }
}
