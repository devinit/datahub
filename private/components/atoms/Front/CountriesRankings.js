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
              <Table.Cell>1</Table.Cell>
              <Table.Cell><Flag name="in" /></Table.Cell>
              <Table.Cell>India</Table.Cell>
              <Table.Cell textAlign="right"><b>490,048,500</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>2</Table.Cell>
              <Table.Cell><Flag name="ng" /></Table.Cell>
              <Table.Cell>Nigeria</Table.Cell>
              <Table.Cell textAlign="right"><b>112,955,152</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>3</Table.Cell>
              <Table.Cell><Flag name="cn" /></Table.Cell>
              <Table.Cell>China</Table.Cell>
              <Table.Cell textAlign="right"><b>83,750,346</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>4</Table.Cell>
              <Table.Cell><Flag name="id" /></Table.Cell>
              <Table.Cell>Indonesia</Table.Cell>
              <Table.Cell textAlign="right"><b>67,842,900</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>5</Table.Cell>
              <Table.Cell><Flag name="cd" /></Table.Cell>
              <Table.Cell>DRC</Table.Cell>
              <Table.Cell textAlign="right"><b>62,030,250</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>6</Table.Cell>
              <Table.Cell><Flag name="bd" /></Table.Cell>
              <Table.Cell>Bangladesh</Table.Cell>
              <Table.Cell textAlign="right"><b>49,772,572</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>7</Table.Cell>
              <Table.Cell><Flag name="pk" /></Table.Cell>
              <Table.Cell>Pakistan</Table.Cell>
              <Table.Cell textAlign="right"><b>44,192,241</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>8</Table.Cell>
              <Table.Cell><Flag name="et" /></Table.Cell>
              <Table.Cell>Ethiopia</Table.Cell>
              <Table.Cell textAlign="right"><b>40,528,416</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>9</Table.Cell>
              <Table.Cell><Flag name="tz" /></Table.Cell>
              <Table.Cell>Tanzania</Table.Cell>
              <Table.Cell textAlign="right"><b>32,144,442</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>10</Table.Cell>
              <Table.Cell><Flag name="pk" /></Table.Cell>
              <Table.Cell>Philippines</Table.Cell>
              <Table.Cell textAlign="right"><b>24,733,995</b></Table.Cell>
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
              <Table.Cell>121</Table.Cell>
              <Table.Cell><Flag name="pl" /></Table.Cell>
              <Table.Cell>Poland</Table.Cell>
              <Table.Cell textAlign="right"><b>51,216</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>122</Table.Cell>
              <Table.Cell><Flag name="me" /></Table.Cell>
              <Table.Cell>Montenegro</Table.Cell>
              <Table.Cell textAlign="right"><b>11,966</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>123</Table.Cell>
              <Table.Cell><Flag name="ba" /></Table.Cell>
              <Table.Cell>Bosnia & Herzegovina</Table.Cell>
              <Table.Cell textAlign="right"><b>10,314</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>124</Table.Cell>
              <Table.Cell><Flag name="ws" /></Table.Cell>
              <Table.Cell>Samoa</Table.Cell>
              <Table.Cell textAlign="right"><b>8987</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>125</Table.Cell>
              <Table.Cell><Flag name="tt" /></Table.Cell>
              <Table.Cell>Trinidad & Tobago</Table.Cell>
              <Table.Cell textAlign="right"><b>7560</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>126</Table.Cell>
              <Table.Cell><Flag name="to" /></Table.Cell>
              <Table.Cell>Tonga</Table.Cell>
              <Table.Cell textAlign="right"><b>4400</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>127</Table.Cell>
              <Table.Cell><Flag name="sc" /></Table.Cell>
              <Table.Cell>Seychelles</Table.Cell>
              <Table.Cell textAlign="right"><b>1368</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>128</Table.Cell>
              <Table.Cell><Flag name="tv" /></Table.Cell>
              <Table.Cell>Tuvalu</Table.Cell>
              <Table.Cell textAlign="right"><b>640</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>129</Table.Cell>
              <Table.Cell><Flag name="sv" /></Table.Cell>
              <Table.Cell>Slovenia</Table.Cell>
              <Table.Cell textAlign="right"><b>618</b></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>130</Table.Cell>
              <Table.Cell><Flag name="by" /></Table.Cell>
              <Table.Cell>Belarus</Table.Cell>
              <Table.Cell textAlign="right"><b>0</b></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer>
    </Grid.Column>
  </Grid.Row>
);

export default ChartFilter;
