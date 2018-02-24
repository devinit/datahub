import * as React from 'react';
import { Grid, Container, Table, Icon } from 'semantic-ui-react';
import glamorous, {P} from 'glamorous';
import { LightBg } from '../../atoms/Container';
import {ToolTip} from '../ToolTipContainer';
import { white } from '../../theme/semantic';
import { SectionHeader } from '../../atoms/Header';

const TableWrapper = glamorous.div({
  '& table': {
    tableLayout: 'fixed'
  },
  '& td': {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap'
  }
});

export interface Props  {
  data: any[];
  title?: string;
  noDownloads?: boolean;
}

const ProfileDataSourceTable = ({ title, data, noDownloads }: Props) =>
  (<LightBg>
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
          <TableWrapper>
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
                {data.map(item =>
                  (<Table.Row key={item.name}>
                    <Table.Cell>
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>
                      {item.description}
                    </Table.Cell>
                    <Table.Cell>
                      {item.methodology}
                    </Table.Cell>
                    <Table.Cell>
                      {item.uom}
                    </Table.Cell>
                    <Table.Cell>
                      <a href={item.source.link}>
                        {item.source.name}
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      {
                        noDownloads ?
                          <ToolTip
                            trigger={<span><Icon name="file" />CSV</span>}
                          >
                            <P textAlign="center">We are in the process of updating our data sources,{' '}
                                these will be available to download in the near future.{' '}
                                Please contact <a href="mailto:info@devinit.org">info@devinit.org</a>{' '}
                                if you wish to access these sources in the meantime.
                            </P>
                          </ToolTip>
                          :
                          <span>
                            <a
                              href={item.zip}
                              target="__blank"
                              rel="noopener"
                            >
                              <Icon name="file" />ZIP
                            </a>
                            <a
                              href={item.csv}
                              target="__blank"
                              rel="noopener"
                            >
                              <Icon name="file" />CSV
                            </a>
                          </span>
                      }
                    </Table.Cell>
                  </Table.Row>),
                )}
              </Table.Body>
            </Table>
          </TableWrapper>
        </Grid.Row>
      </Grid>
    </Container>
  </LightBg>);

export default ProfileDataSourceTable;
