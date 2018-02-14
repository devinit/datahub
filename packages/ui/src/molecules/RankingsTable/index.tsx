import * as React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import { Span, Img } from 'glamorous';
import 'intersection-observer';
import Router from 'next/router';
import LoadingBar from '../LoadingBar';
import { Route } from '@devinit/dh-base/lib/utils';
import Observer from 'react-intersection-observer';
import { RankingsTableContainer } from '../../atoms/Container';

export interface Data  {
  value: string | number;
  uom: string;
  name: string;
  route: Route;
  position: number;
  flagUrl: string;
  uid: string;
}

export interface Props  {
  hasflags: boolean;
  data: {
    top: Data[];
    bottom: Data[];
  };
}

export interface State {
  profileLoading: boolean;
}

export default class RankingsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { profileLoading: false };
  }
  public onClick = (item: Data) => () => {
    this.setState({ profileLoading: true });
    return Router.push(item.route.routePath, item.route.routeAsPath);
  }
  public render() {
    return (
      <Grid.Row centered className={'computer tablet only grid'}>
        <LoadingBar loading={this.state.profileLoading} />
        {Object.keys(this.props.data).map(key =>
          (<Grid.Column computer={6} tablet={6} key={key}>
            <Observer>
              <RankingsTableContainer>
                <Table basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        textAlign="center"
                        colSpan={this.props.hasflags ? '4' : '3'}
                      >
                        {this.props.data[key].length
                          ? <Span textTransform={'capitalize'}>
                            {key} {this.props.data[key].length}
                          </Span>
                          : ''}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.data[key].map(item =>
                      (<Table.Row key={item.uid}>
                        <Table.Cell>
                          <b>
                            {item.position}
                          </b>
                        </Table.Cell>
                        {this.props.hasflags
                          ? <Table.Cell>
                            <Img
                              width={'20px'}
                              maxHeight={'15px'}
                              alt={item.name}
                              src={item.flagUrl}
                            />
                          </Table.Cell>
                          : <Table.Cell />}
                        <Table.Cell>
                          <a onClick={this.onClick(item)} role="link">
                            {item.name}
                          </a>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          {`${Number(item.value) && item.uom !== '%' ?
                            Number(item.value).toLocaleString() : item.value} ${item.uom}`}
                        </Table.Cell>
                      </Table.Row>),
                    )}
                  </Table.Body>
                </Table>
              </RankingsTableContainer>
            </Observer>
          </Grid.Column>),
        )}
      </Grid.Row>
    );
  }
}
