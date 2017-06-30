// @flow
import React from 'react';
import {Grid, Table, Flag} from 'semantic-ui-react';
import {RankingsTableContainer} from 'components/atoms/Container';

const RankingsTable = (props: Object) => (
  <Grid.Row>
    <Grid.Column computer={8} tablet={16} mobile={16}>
      <RankingsTableContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan={props.data.flags ? '4' : '3'}>Top 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { props.data.top.map(item => (<Table.Row>
              <Table.Cell><b>{item.number}</b></Table.Cell>
              {props.data.flags ? <Table.Cell><Flag name={item.flag} /></Table.Cell> : ''}
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell textAlign="right">{item.value}</Table.Cell>
            </Table.Row>))}
          </Table.Body>
        </Table>
      </RankingsTableContainer>
    </Grid.Column>
    <Grid.Column computer={8} tablet={16} mobile={16}>
      <RankingsTableContainer>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan={props.data.flags ? '4' : '3'}>Bottom 10</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { props.data.bottom.map(item => (<Table.Row>
              <Table.Cell><b>{item.number}</b></Table.Cell>
              {props.data.flags ? <Table.Cell><Flag name={item.flag} /></Table.Cell> : ''}
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell textAlign="right">{item.value}</Table.Cell>
            </Table.Row>))}
          </Table.Body>
        </Table>
      </RankingsTableContainer>
    </Grid.Column>
  </Grid.Row>
);

export default RankingsTable;
