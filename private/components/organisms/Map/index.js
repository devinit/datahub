// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import {connect} from 'react-redux';
import {changeLoadingStatus} from 'lib/actions';
import type {LoadingStatus} from 'lib/actions';
import { bindActionCreators } from 'redux';
import type {State, AppState, Action} from 'lib/reducers';
import {MapBackground} from 'components/atoms/Backgrounds';
import MAPSQUERY from '../../../graphql/Maps.graphql';

type ChangeLoadingStatus = (loading: boolean) => Dispatch<LoadingStatus>

type WrapperProps = {
  loading: boolean,
  app: AppState,
  changeLoadingStatus: ChangeLoadingStatus,
   ...MapDataQuery
}

type WithApolloProps = {
  pathName: string,
  app: AppState
}
type BoundAction = {
  changeLoadingStatus: ChangeLoadingStatus
}
const MapWrapper = (props: WrapperProps) => {
  // props.changeLoadingStatus(props.loading);
  if (props.loading || !props.mapData) return (<MapBackground />);
  return (<Map {...props} />);
};

const MapWithApollo = graphql(MAPSQUERY, {
  options: (props: WithApolloProps) => {
    if (props.id) return {variables: {id: props.id}};
    if (props.pathName && props.pathName.includes('spotlight')) {
      return {variables: {id: props.app.spotlightIndicator}};
    }
    return {variables: {id: props.app.globalIndicator}};
  },
  props: ({data}) => {
    const {error} = data;
    if (error) throw Error(error);
    return data;
  }})(MapWrapper);

const mapStateToProps = ({app}: State) => ({app});

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction => {
  return {
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
  };
};

const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapWithApollo);

export default MapWithRedux;
