import { Img, Span } from 'glamorous';
import { SingletonRouter } from 'next/router';
import * as React from 'react';
import Observer from 'react-intersection-observer';
import { Grid, Table } from 'semantic-ui-react';
import { Route, Router, router } from '../../../utils';
import { RankingsTableContainer } from '../../atoms/Container';
import { Intro } from '../../atoms/Intro';
import LoadingBar from '../LoadingBar';

if ((process as any).browser) { require('intersection-observer'); }

export interface Data {
  value: string | number;
  uom: string;
  name: string;
  route: Route;
  position: number;
  flagUrl: string;
  uid: string;
}

export interface Props {
  hasflags: boolean;
  router?: SingletonRouter;
  data: {
    top: Data[];
    bottom: Data[];
  };
}

export interface State {
  profileLoading: boolean;
}

export default class RankingsTable extends React.Component<Props, State> {
  public router: Router;

  constructor(props: Props) {
    super(props);
    this.state = { profileLoading: false };
    this.router = props.router ? props.router : router;
  }

  render() {
    return (
      <Intro className="centered row computer tablet only grid" step={ 6 } intro="View the rankings">
        <LoadingBar loading={ this.state.profileLoading } />
        { Object.keys(this.props.data).map(key =>
          (<Grid.Column computer={ 6 } tablet={ 6 } key={ key }>
            <Observer>
              <RankingsTableContainer>
                <Table basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center" colSpan={ this.props.hasflags ? '4' : '3' }>
                        {
                          this.props.data[key].length
                            ?
                            <Span textTransform={ 'capitalize' }>
                              { key } { this.props.data[key].length }
                            </Span>
                            : ''
                          }
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { this.props.data[key].map(item =>
                      (<Table.Row key={ item.uid }>
                        <Table.Cell>
                          <b>
                            { item.position }
                          </b>
                        </Table.Cell>
                        { this.props.hasflags
                          ? <Table.Cell>
                            <Img
                              width={ '20px' }
                              maxHeight={ '15px' }
                              alt={ item.name }
                              src={ item.flagUrl }
                            />
                          </Table.Cell>
                          : <Table.Cell /> }
                        <Table.Cell>
                          <a onClick={ this.onClick(item) } role="link">
                            { item.name }
                          </a>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          { `${Number(item.value) && item.uom !== '%' ?
                            Number(item.value).toLocaleString() : item.value} ${item.uom}` }
                        </Table.Cell>
                      </Table.Row>)
                    ) }
                  </Table.Body>
                </Table>
              </RankingsTableContainer>
            </Observer>
          </Grid.Column>)
        ) }
      </Intro>
    );
  }

  private onClick = (item: Data) => () => {
    this.setState({ profileLoading: true });

    return this.router.push(item.route.routePath, item.route.routeAsPath);
  }
}
