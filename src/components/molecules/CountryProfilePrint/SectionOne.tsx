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

export class SectionOne extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr><TableCell colSpan={ 4 }><SectionTitle>Overview</SectionTitle></TableCell></tr>
        <tr>
          <TableCell>
            <GreyBox style={ { marginLeft: 0 } }>
              <MutedHeader>How many of the poorest 20% of people globally live in Uganda</MutedHeader>
              <ValueHeader>19.6m</ValueHeader>
            </GreyBox>
          </TableCell>
          <TableCell>
            <GreyBox>
              <MutedHeader>What resources are available</MutedHeader>
              <BoxSubHeader>
                <BoxUnit>Domestic public</BoxUnit>
                <span>US$3bn</span>
              </BoxSubHeader>
              <BoxSubHeader>
                <BoxUnit>International</BoxUnit>
                <span>US$4.4bn</span>
              </BoxSubHeader>
            </GreyBox>
          </TableCell>
          <TableCell>
            <GreyBox>
              <MutedHeader>How much does the government spend per person</MutedHeader>
              <ValueHeader>19.6m</ValueHeader>
            </GreyBox>
          </TableCell>
          <TableCell>
            <GreyBox>
              <MutedHeader>How deep is poverty</MutedHeader>
              <ValueHeader>19.6m</ValueHeader>
            </GreyBox>
          </TableCell>
        </tr>
      </React.Fragment>
    );
  }
}
