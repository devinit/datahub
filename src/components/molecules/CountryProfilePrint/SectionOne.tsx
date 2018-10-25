import * as React from 'react';
import {
  BoxSubHeader,
  BoxUnit,
  ChartBoxSmall,
  ChartHeading,
  ChartSubHeading,
  GreyBox,
  MutedHeader,
  SectionTitle,
  TableCell,
  ValueHeader,
  marginLeft,
  marginRight
} from '../../atoms/CountryProfilePrint';
import { css } from 'glamor';
import Chart from '../../atoms/Chart';
import povertyConfig from '../../visbox/printProfiles';
// import { getCountryProfileData } from '../../pageData';

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
}

export class SectionOne extends React.Component<SectionOneProps> {
  // private pageData = getCountryProfileData(this.props.country.slug);
  render() {
    return (
      <React.Fragment>
        <tr><TableCell colSpan={ 4 }><SectionTitle>Overview</SectionTitle></TableCell></tr>
        <tr>
          <TableCell>
            <GreyBox style={ { marginLeft: 0 } }>
              <MutedHeader>How many of the poorest 20% of people globally live in Uganda</MutedHeader>
              <ValueHeader>{ this.props.poorestPeople || 'No Data' }</ValueHeader>
            </GreyBox>
          </TableCell>
          <TableCell>
            <GreyBox>
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
          </TableCell>
          <TableCell>
            <GreyBox>
              <MutedHeader>How much does the government spend per person</MutedHeader>
              <ValueHeader>{ this.props.governmentSpendPerPerson || 'No Data' }</ValueHeader>
              <BoxSubHeader><BoxUnit>See Notes</BoxUnit></BoxSubHeader>
            </GreyBox>
          </TableCell>
          <TableCell>
            <GreyBox>
              <MutedHeader>How deep is poverty</MutedHeader>
              <ValueHeader>{ this.props.depthOfExtremePoverty || 'No Data' }</ValueHeader>
              <BoxSubHeader><BoxUnit>Depth of poverty</BoxUnit></BoxSubHeader>
            </GreyBox>
          </TableCell>
        </tr>
        <tr>
          <TableCell colSpan={ 2 }>
            <ChartBoxSmall { ...marginRight(20) }>
              <ChartHeading>
                Main Heading
                <ChartSubHeading>Sub Heading</ChartSubHeading>
              </ChartHeading>
              <div { ...css({ paddingTop: '10px' }) }>
                <Chart
                  config={ { ...povertyConfig.area, timeAxis: { ...povertyConfig.area.timeAxis, tickingStep: 2 } } }
                  data={ this.props.poverty190Trend }
                  height="120px"
                />
              </div>
            </ChartBoxSmall>
          </TableCell>
          <TableCell colSpan={ 2 }>
            <ChartBoxSmall { ...marginLeft(20) }>
              <ChartHeading>
                Main Heading
                <ChartSubHeading>Sub Heading</ChartSubHeading>
              </ChartHeading>
              <div { ...css({ paddingTop: '10px' }) }>
                <Chart
                  config={ { ...povertyConfig.histogram } }
                  data={
                    this.processIncomeDistributionTrend()
                  }
                  height="120px"
                />
              </div>
            </ChartBoxSmall>
          </TableCell>
        </tr>
      </React.Fragment>
    );
  }

  private processIncomeDistributionTrend() {
    if (this.props.incomeDistributionTrend) {
      return this.props.incomeDistributionTrend
        .map(d => d && ({ ...d, color: '#e84439' }))
        .map((data) => {
          if (data) {
            if (data.quintileName === 'value bottom 20%') {
              data.quintileName = 'Low 20%';
            } else if (data.quintileName === 'value 2nd quintile') {
              data.quintileName = '2nd 20%';
            } else if (data.quintileName === 'value 3rd quintile') {
              data.quintileName = '3rd 20%';
            } else if (data.quintileName === 'value 4th quintile') {
              data.quintileName = '4th 20%';
            } else if (data.quintileName === 'value 5th quintile') {
              data.quintileName = 'High 20%';
            }
          }

          return data;
        });
    }

    return null;
  }
}
