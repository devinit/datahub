// @flow
import * as React from 'react';
import Map from '@devinit/dh-ui/lib/molecules/Map';
import { connect } from 'react-redux';
import { State, AppState, Action } from '@devinit/dh-base/lib/reducers';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import {getData} from '@devinit/dh-base/lib/utils';
import { bindActionCreators } from 'redux';
import { changeLoadingStatus } from '@devinit/dh-base/lib/actions';
import { LoadingStatus } from '@devinit/dh-base/lib/actions';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import MAPSQUERY from './Maps.graphql';

interface BoundAction  {
  changeLoadingStatus: (loading: boolean) => Dispatch<LoadingStatus>;
}

interface Props   {
  BoundAction;
  app: AppState;
  id: string;
  state: StateToShare;
  country: string;
}
class MapOrganism extends React.Component {
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
    return getData(MAPSQUERY, variables);
  }
  public state: {
    loading: boolean
  };
  public data: MapDataQuery
  constructor(props: Props) {
    super(props);
    this.state = {loading: true };
  }
  /* eslint react/no-did-mount-set-state: 0 */
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
