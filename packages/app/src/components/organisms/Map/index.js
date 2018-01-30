// @flow
import React, {Component} from 'react';
import Map from 'components/molecules/Map';
import { connect } from 'react-redux';
import type { State, AppState, Action } from 'lib/reducers';
import { MapBackground } from 'components/atoms/Backgrounds';
import {getData} from 'lib/utils';
import { bindActionCreators } from 'redux';
import { changeLoadingStatus } from 'lib/actions';
import type { LoadingStatus } from 'lib/actions';
import type {StateToShare} from 'components/molecules/ChartShare';
import MAPSQUERY from './Maps.graphql';

type BoundAction = {
  changeLoadingStatus: (loading: boolean) => Dispatch<LoadingStatus>,
};

type Props = BoundAction & {
  app: AppState,
  id: string,
  state: StateToShare,
  country: string
};
class MapOrganism extends Component {
  static getIndicatorId(props: Props): string {
    if (props.id) return props.id;
    if (props.state && props.state.indicator) return props.state.indicator;
    if (props.country === 'uganda') return props.app.indicatorUganda;
    if (props.country === 'kenya') return props.app.indicatorKenya;
    return props.app.globalIndicator;
  }
  static getIndicatorData(props: Props): Promise<MapDataQuery> {
    const id = MapOrganism.getIndicatorId(props);
    const variables = { id };
    return getData(MAPSQUERY, variables);
  }
  constructor(props: Props) {
    super(props);
    this.state = {loading: true };
  }
  state: {
    loading: boolean
  }
  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    this.initData(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.app.globalIndicator !== this.props.app.globalIndicator ||
      nextProps.app.indicatorUganda !== this.props.app.indicatorUganda ||
      nextProps.app.indicatorKenya !== this.props.app.indicatorKenya
    ) {
      this.initData(nextProps);
    }
  }

  data: MapDataQuery

  initData(props: Props) {
    MapOrganism.getIndicatorData(props)
      .then(data => {
        this.data = data;
        this.setState({loading: false});
        props.changeLoadingStatus(false);
      })
      .catch(console.error);
  }
  render() {
    return (
      <div>
        {!this.state.loading && this.data && this.data.mapData ?
          <Map state={this.props.state} mapData={this.data.mapData} /> :
          <MapBackground />
        }
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction => {
  return {
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  };
};
const mapStateToProps = ({ app }: State) => ({ app });

const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapOrganism);

export default MapWithRedux;
