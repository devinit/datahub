import React from 'react';
import {Grid, Table, Flag} from 'semantic-ui-react';
import {RankingsContainer} from 'components/atoms/Container';

const DistrictRank = () => (
  <Grid.Row>
    <Grid.Column width={8}>
      <RankingsContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="4">Top 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><b>1</b></Table.Cell>
              <Table.Cell>Luuka</Table.Cell>
              <Table.Cell textAlign="right">17.13%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>2</b></Table.Cell>
              <Table.Cell>Wakiso</Table.Cell>
              <Table.Cell textAlign="right">17.2%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>3</b></Table.Cell>
              <Table.Cell>Jinja</Table.Cell>
              <Table.Cell textAlign="right">16.4%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>4</b></Table.Cell>
              <Table.Cell>Buikwe</Table.Cell>
              <Table.Cell textAlign="right">15.1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>5</b></Table.Cell>
              <Table.Cell>Moroto</Table.Cell>
              <Table.Cell textAlign="right">10.7%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>6</b></Table.Cell>
              <Table.Cell>Mbarara</Table.Cell>
              <Table.Cell textAlign="right">9.8%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>7</b></Table.Cell>
              <Table.Cell>Mbale</Table.Cell>
              <Table.Cell textAlign="right">9.6%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>8</b></Table.Cell>
              <Table.Cell>Mukono</Table.Cell>
              <Table.Cell textAlign="right">9.5%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>9</b></Table.Cell>
              <Table.Cell>Gulu</Table.Cell>
              <Table.Cell textAlign="right">9%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>10</b></Table.Cell>
              <Table.Cell>Hoima</Table.Cell>
              <Table.Cell textAlign="right">8.5%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </RankingsContainer>
    </Grid.Column>
    <Grid.Column width={8}>
      <RankingsContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="3">Bottom 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><b>101</b></Table.Cell>
              <Table.Cell>Kumi</Table.Cell>
              <Table.Cell textAlign="right">1.4%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>102</b></Table.Cell>
              <Table.Cell>Apac</Table.Cell>
              <Table.Cell textAlign="right">1.3%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>103</b></Table.Cell>
              <Table.Cell>Maracha</Table.Cell>
              <Table.Cell textAlign="right">1.1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>104</b></Table.Cell>
              <Table.Cell>Butambala</Table.Cell>
              <Table.Cell textAlign="right">1.1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>105</b></Table.Cell>
              <Table.Cell>Bukwo</Table.Cell>
              <Table.Cell textAlign="right">1.1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>106</b></Table.Cell>
              <Table.Cell>Bukomansimbi</Table.Cell>
              <Table.Cell textAlign="right">1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>107</b></Table.Cell>
              <Table.Cell>Otuke</Table.Cell>
              <Table.Cell textAlign="right">1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>108</b></Table.Cell>
              <Table.Cell>Luwero</Table.Cell>
              <Table.Cell textAlign="right">0.9%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>109</b></Table.Cell>
              <Table.Cell>Kubuku</Table.Cell>
              <Table.Cell textAlign="right">0.9%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><b>110</b></Table.Cell>
              <Table.Cell>Bundibugyo</Table.Cell>
              <Table.Cell textAlign="right">0.9%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </RankingsContainer>
    </Grid.Column>
  </Grid.Row>
);

export default DistrictRank;
