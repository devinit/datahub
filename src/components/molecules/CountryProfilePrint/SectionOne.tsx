import * as React from 'react';
import {
  BoxSubHeader,
  BoxUnit,
  GreyBox,
  MutedHeader,
  SectionTitle,
  TableCell,
  ValueHeader
} from '../../atoms/CountryProfilePrint';
// import { getCountryProfileData } from '../../pageData';

export interface SectionOneProps {
  poorestPeople?: string | null;
  population?: string | null;
  domesticResources?: string | null;
  internationalResources?: string | null;
  governmentSpendPerPerson?: string | null;
  depthOfExtremePoverty?: string | null;
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
      </React.Fragment>
    );
  }
}
