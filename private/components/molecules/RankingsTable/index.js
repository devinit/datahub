// @flow
import React from 'react';
import {Grid, Table} from 'semantic-ui-react';
import {Span, Img} from 'glamorous';
import {RankingsTableContainer} from 'components/atoms/Container';

export type Data = {
  value: number,
  name: string,
  flagUrl: string,
  uid: string,
}

export type Props = {
  hasflags: boolean,
  data: {
    top: Data[],
    bottom: Data[]
  }
}

const RankingsTable = (props: Props) => (
  <Grid.Row centered className={'computer tablet only grid'}>
    {
      Object.keys(props.data).map(key => (
        <Grid.Column computer={6} tablet={6} mobile={16} key={key}>
          <RankingsTableContainer>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan={props.hasflags ? '4' : '3'}>
                    {props.data[key].length ?
                    (<Span textTransform={'capitalize'}>{key} {props.data[key].length}</Span>) : ''}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {props.data[key].map((item, index) => (
                  <Table.Row key={item.uid}>
                    <Table.Cell><b>{index}</b></Table.Cell>
                    {props.hasflags ?
                    (<Table.Cell>
                      <Img width={'20px'} maxHeight={'15px'} alt={item.name} src={item.flagUrl} />
                    </Table.Cell>) : ''}
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell textAlign="right">{item.value.toLocaleString()}</Table.Cell>
                  </Table.Row>))}
              </Table.Body>
            </Table>
          </RankingsTableContainer>
        </Grid.Column>)
      )
    }
  </Grid.Row>
);

export default RankingsTable;
