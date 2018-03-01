import * as React from 'react';
// import {Map} from '../../molecules/Maps';
import {Map} from '../../molecules/Maps';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { State as Store, AppState} from '../../../redux/reducers';
import { MapBackground } from '../../atoms/Container';
import {getData} from '../../../utils';
import { bindActionCreators } from 'redux';
import { changeLoadingStatus, LoadingStatus } from '../../../redux/actions';
import {StateToShare} from '../../molecules/ChartShare';
// import {MapDataQuery} from '../../gql-types';
import {MapDataQuery} from '../../gql-types';
import Router from 'next/router';
import {MAP_QUERY} from './query.graphql';

export interface BoundAction  {
  changeLoadingStatus: (loading: boolean) => LoadingStatus;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction => ({
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

export interface OwnProps {
  id?: string;
  state?: StateToShare;
  country?: string;
}
export type Props = BoundAction & OwnProps & {
  app: AppState;
};

class MapOrganism extends React.Component <Props> {
  public static getIndicatorId(props: Props): string {
    if (props.id) return props.id;
    if (props.state && props.state.indicator) return props.state.indicator;
    if (props.country === 'uganda') return props.app.indicatorUganda;
    if (props.country === 'kenya') return props.app.indicatorKenya;
    return props.app.globalIndicator;
  }
  public static getIndicatorData(props: Props): Promise<MapDataQuery> {
    const id = MapOrganism.getIndicatorId(props);
    const variables = { id };
    return getData<MapDataQuery>({query: MAP_QUERY, variables});
  }
  public data: MapDataQuery;
  public loading: boolean = true;
  constructor(props: Props) {
    super(props);
    this.state = {loading: true };
  }
  public componentDidMount() {
    this.initData(this.props);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.app.globalIndicator !== this.props.app.globalIndicator ||
      nextProps.app.indicatorUganda !== this.props.app.indicatorUganda ||
      nextProps.app.indicatorKenya !== this.props.app.indicatorKenya
    ) {
      this.initData(nextProps);
    }
  }

  public initData(props: Props) {
    MapOrganism.getIndicatorData(props)
      .then(data => {
        this.data = data;
        this.loading = false;
        props.changeLoadingStatus(false);
      })
      .catch(console.error);
  }
  public render() {
    const mapData = this.data && this.data.mapData  as DH.IMapData;
    return (
      <div>
        {!this.loading && this.data && this.data.mapData ?
          <Map state={this.props.state || {}} {...mapData} router={Router} /> :
          <MapBackground />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ app }: Store) => ({ app });

const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapOrganism);

export default MapWithRedux;
