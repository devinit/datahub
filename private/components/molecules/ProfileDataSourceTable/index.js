// @flow
import React from 'react';
import {Grid, Container, Table, Icon} from 'semantic-ui-react';
import {LightBg} from 'components/atoms/Backgrounds';
import { white } from 'components/theme/semantic';
import {SectionHeader} from 'components/atoms/Header';

type Props = {
  data: Array<Object>,
  title?: string,
}
const ProfileDataSourceTable = ({title, data}: Props) => (
  <LightBg>
    <Container>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <SectionHeader color={white}>
              {title || 'COUNTRY PROFILE DATA SOURCES'}
            </SectionHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Methodology</Table.HeaderCell>
                <Table.HeaderCell>Unit</Table.HeaderCell>
                <Table.HeaderCell>Source</Table.HeaderCell>
                <Table.HeaderCell>Download</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item) => (<Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.methodology}</Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell><a href={item.source.link}>{item.source.link}</a></Table.Cell>
                <Table.Cell><Icon name="file" />ZIP <Icon name="file" />CSV</Table.Cell>
              </Table.Row>))}
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    </Container>
  </LightBg>
);

export default ProfileDataSourceTable;
