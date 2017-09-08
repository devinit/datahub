// @flow
import React, {Component} from 'react';
import Map from 'components/molecules/Map';
import { connect } from 'react-redux';
import type { State, AppState } from 'lib/reducers';
import LoadingBar from 'components/molecules/LoadingBar';
import { MapBackground } from 'components/atoms/Backgrounds';
import {getData} from 'lib/utils';
import type {StateToShare} from 'components/molecules/ChartShare';
import MAPSQUERY from './Maps.graphql';

type Props = {
  app: AppState,
  id: string,
  state: StateToShare,
  pathName: string
};
class MapOrganism extends Component {
  static getIndicatorId(props: Props): string {
    if (props.id) return props.id;
    if (props.state && props.state.indicator) return props.state.indicator;
    if (props.pathName && props.pathName.includes('spotlight')) {
      return props.app.spotlightIndicator;
    }
    return props.app.globalIndicator;
  }
  static getIndicatorData(props: Props): Promise<MapDataQuery> {
    const id = MapOrganism.getIndicatorId(props);
    const variables = { id };
    return getData(MAPSQUERY, variables);
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      firstLoad: true,
      data: null
    };
  }
  state: {
    loading: boolean,
    firstLoad: boolean,
    data: MapDataQuery | null
  }
  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) {
      this.initState(nextProps);
    }
  }
  async initState(props: Props) {
    const data = await MapOrganism.getIndicatorData(props);
    this.setState({data, firstLoad: false, loading: false});
  }
  render() {
    return (
      <div>
        {this.state.loading ? <LoadingBar loading={this.state.loading} /> : ''}
        {this.state.data && this.state.data.mapData ?
          <Map state={this.props.state} mapData={this.state.data.mapData} /> :
          <MapBackground />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ app }: State) => ({ app });

const MapWithRedux = connect(mapStateToProps)(MapOrganism);

export default MapWithRedux;
