import React from 'react';
import {Grid, Table, Flag} from 'semantic-ui-react';
import {TableContainer} from '.';

const ChartFilter = () => (
  <Grid.Row>
    <Grid.Column width={8}>
      <TableContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="4">Top 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><b>1</b></Table.Cell>
              <Table.Cell><Flag name="in" /></Table.Cell>
              <Table.Cell>India</Table.Cell>
              <Table.Cell textAlign="right">490,048,500</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>2</b></Table.Cell>
              <Table.Cell><Flag name="ng" /></Table.Cell>
              <Table.Cell>Nigeria</Table.Cell>
              <Table.Cell textAlign="right">112,955,152</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>3</b></Table.Cell>
              <Table.Cell><Flag name="cn" /></Table.Cell>
              <Table.Cell>China</Table.Cell>
              <Table.Cell textAlign="right">83,750,346</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>4</b></Table.Cell>
              <Table.Cell><Flag name="id" /></Table.Cell>
              <Table.Cell>Indonesia</Table.Cell>
              <Table.Cell textAlign="right">67,842,900</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>5</b></Table.Cell>
              <Table.Cell><Flag name="cd" /></Table.Cell>
              <Table.Cell>DRC</Table.Cell>
              <Table.Cell textAlign="right">62,030,250</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>6</b></Table.Cell>
              <Table.Cell><Flag name="bd" /></Table.Cell>
              <Table.Cell>Bangladesh</Table.Cell>
              <Table.Cell textAlign="right">49,772,572</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>7</b></Table.Cell>
              <Table.Cell><Flag name="pk" /></Table.Cell>
              <Table.Cell>Pakistan</Table.Cell>
              <Table.Cell textAlign="right">44,192,241</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>8</b></Table.Cell>
              <Table.Cell><Flag name="et" /></Table.Cell>
              <Table.Cell>Ethiopia</Table.Cell>
              <Table.Cell textAlign="right">40,528,416</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>9</b></Table.Cell>
              <Table.Cell><Flag name="tz" /></Table.Cell>
              <Table.Cell>Tanzania</Table.Cell>
              <Table.Cell textAlign="right">32,144,442</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>10</b></Table.Cell>
              <Table.Cell><Flag name="pk" /></Table.Cell>
              <Table.Cell>Philippines</Table.Cell>
              <Table.Cell textAlign="right">24,733,995</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer>
    </Grid.Column>
    <Grid.Column width={8}>
      <TableContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="3">Bottom 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><b>121</b></Table.Cell>
              <Table.Cell><Flag name="pl" /></Table.Cell>
              <Table.Cell>Poland</Table.Cell>
              <Table.Cell textAlign="right">51,216</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>122</b></Table.Cell>
              <Table.Cell><Flag name="me" /></Table.Cell>
              <Table.Cell>Montenegro</Table.Cell>
              <Table.Cell textAlign="right">11,966</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>123</b></Table.Cell>
              <Table.Cell><Flag name="ba" /></Table.Cell>
              <Table.Cell>Bosnia & Herzegovina</Table.Cell>
              <Table.Cell textAlign="right">10,314</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>124</b></Table.Cell>
              <Table.Cell><Flag name="ws" /></Table.Cell>
              <Table.Cell>Samoa</Table.Cell>
              <Table.Cell textAlign="right">8987</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>125</b></Table.Cell>
              <Table.Cell><Flag name="tt" /></Table.Cell>
              <Table.Cell>Trinidad & Tobago</Table.Cell>
              <Table.Cell textAlign="right">7560</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>126</b></Table.Cell>
              <Table.Cell><Flag name="to" /></Table.Cell>
              <Table.Cell>Tonga</Table.Cell>
              <Table.Cell textAlign="right">4400</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>127</b></Table.Cell>
              <Table.Cell><Flag name="sc" /></Table.Cell>
              <Table.Cell>Seychelles</Table.Cell>
              <Table.Cell textAlign="right">1368</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>128</b></Table.Cell>
              <Table.Cell><Flag name="tv" /></Table.Cell>
              <Table.Cell>Tuvalu</Table.Cell>
              <Table.Cell textAlign="right">640</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>129</b></Table.Cell>
              <Table.Cell><Flag name="sv" /></Table.Cell>
              <Table.Cell>Slovenia</Table.Cell>
              <Table.Cell textAlign="right">618</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>130</b></Table.Cell>
              <Table.Cell><Flag name="by" /></Table.Cell>
              <Table.Cell>Belarus</Table.Cell>
              <Table.Cell textAlign="right">0</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer>
    </Grid.Column>
  </Grid.Row>
);

export default ChartFilter;
