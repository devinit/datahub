import { getData } from '../../../utils';
import Router from 'next/router';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { LoadingStatus, changeLoadingStatus } from '../../../redux/actions';
import { AppState, State as Store } from '../../../redux/reducers';
import * as React from 'react';
import { MapBackground } from '../../atoms/Container';
import { MapDataQuery } from '../../gql-types';
import { StateToShare } from '../../molecules/ChartShare';
import { Map } from '../../molecules/Maps';
import { MAP_QUERY } from './query.graphql';

export interface BoundAction {
  changeLoadingStatus: (loading: boolean) => LoadingStatus;
}

export interface OwnProps {
  id?: string;
  state?: StateToShare;
  country?: string;
}

export type MapOrganismProps = BoundAction & OwnProps & { app: AppState; };

class MapOrganism extends React.Component <MapOrganismProps> {
  data?: MapDataQuery;
  loading = true;

  constructor(props: MapOrganismProps) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const mapData = (this.data && this.data.mapData) as DH.IMapData | undefined;
    if (!this.loading && mapData) {
      return (
        <div>
          <Map state={ this.props.state || {} } { ...mapData } router={ Router } />
        </div>
      );
    }

    return <div><MapBackground /></div>;
  }

  componentDidMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps: MapOrganismProps) {
    const indicatorUpdated = nextProps.app.globalIndicator !== this.props.app.globalIndicator ||
      nextProps.app.indicatorUganda !== this.props.app.indicatorUganda ||
      nextProps.app.indicatorKenya !== this.props.app.indicatorKenya;

    if (indicatorUpdated) {
      this.initData(nextProps);
    }
  }

  private initData(props: MapOrganismProps) {
    MapOrganism.getIndicatorData(props)
      .then(data => {
        this.data = data;
        this.loading = false;
        props.changeLoadingStatus(false);
      })
      .catch(error => {
        console.error(error);
        this.data = undefined;
        this.loading = false;
        props.changeLoadingStatus(false);
      });
  }

  public static getIndicatorData(props: MapOrganismProps): Promise<MapDataQuery> {
    const id = MapOrganism.getIndicatorId(props);
    const variables = { id };

    return getData<MapDataQuery>({ query: MAP_QUERY, variables });
  }

  public static getIndicatorId(props: MapOrganismProps): string {
    if (props.id) { return props.id; }
    // FIXME: commented out below so as to leave nav indicator to redux state only. Confirm
    // if (props.state && props.state.indicator) { return props.state.indicator; }
    if (props.country === 'uganda') { return props.app.indicatorUganda; }
    if (props.country === 'kenya') { return props.app.indicatorKenya; }

    return props.app.globalIndicator;
  }
}

const mapStateToProps = ({ app }: Store) => ({ app });

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction => ({
  changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
});

const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapOrganism);

export default MapWithRedux;
