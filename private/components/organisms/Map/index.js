// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import {lighterGrey} from 'components/theme/semantic';
import {Div} from 'glamorous';
import {connect} from 'react-redux';
import type {State, AppState} from 'lib/reducers';
import MAPSQUERY from '../../../graphql/Maps.graphql';

type WrapperProps = {
  loading: boolean,
  app: AppState,
   ...MapDataQuery
}

type WithApolloProps = {
  pathName: string,
  app: AppState
}
const MapWrapper = (props: WrapperProps) => {
  if (props.loading) {
    return (<Div width={'100%'} height={'600'} backgroundColor={lighterGrey} />);
  }
  if (!props.loading && !props.mapData) {
    return (<Div width={'100%'} height={'600'} backgroundColor={lighterGrey} />);
  }
  return (<Map {...props} />);
};

const MapWithApollo = graphql(MAPSQUERY, {
  options: (props: WithApolloProps) => {
    if (props.id) return {variables: {id: props.id}};
    if (props.pathName && props.pathName === '/spotlight') return {variables: {id: props.app.spotlightIndicator}};
    return {variables: {id: props.app.globalIndicator}};
  },
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }})(MapWrapper);

const mapStateToProps = ({app}: State) => ({app});

const MapWithRedux = connect(mapStateToProps)(MapWithApollo);

export default MapWithRedux;
