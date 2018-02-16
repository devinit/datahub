import * as React from 'react';
import Map from '@devinit/dh-ui/lib/molecules/Map';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State as Store, AppState, Action } from '../../../redux/reducers';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import {getData} from '@devinit/dh-base/lib/utils';
import { bindActionCreators } from 'redux';
import { changeLoadingStatus, LoadingStatus } from '../../../redux/actions';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {MapDataQuery} from '../../../types';
import {MAP_QUERY} from './query.graphql';

export interface BoundAction  {
  changeLoadingStatus: (loading: boolean) => LoadingStatus;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction => ({
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

type Props = BoundAction & {
  app: AppState;
  id: string;
  state: StateToShare;
  country: string;
};

interface State {
  loading: boolean;
}

class MapOrganism extends React.Component <Props, State> {
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
        this.setState({loading: false});
        props.changeLoadingStatus(false);
      })
      .catch(console.error);
  }
  public render() {
    const mapData = this.data && this.data.mapData  as DH.IMapData;
    return (
      <div>
        {!this.state.loading && this.data && this.data.mapData ?
          <Map state={this.props.state} {...mapData} /> :
          <MapBackground />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ app }: Store) => ({ app });

const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapOrganism);

export default MapWithRedux;
