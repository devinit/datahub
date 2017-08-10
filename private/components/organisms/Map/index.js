// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import Map from 'components/molecules/Map';
import { connect } from 'react-redux';
import type { LoadingStatus } from 'lib/actions';
import type { State, AppState } from 'lib/reducers';
import { MapBackground } from 'components/atoms/Backgrounds';
import LoadingBar from 'components/molecules/LoadingBar';
import MAPSQUERY from './Maps.graphql';

type ChangeLoadingStatus = (loading: boolean) => Dispatch<LoadingStatus>;

type WrapperProps = {
  loading: boolean,
  app: AppState,
  changeLoadingStatus: ChangeLoadingStatus,
  ...MapDataQuery,
};

type WithApolloProps = {
  pathName: string,
  app: AppState,
};

const MapWrapper = (props: WrapperProps) => {
  if (props.loading || !props.mapData) {
    return (
      <div>
        <LoadingBar loading={props.loading} />
        <MapBackground />
      </div>
    );
  }
  return <Map {...props} />;
};

const MapWithApollo = graphql(MAPSQUERY, {
  options: (props: WithApolloProps) => {
    if (props.id) return { variables: { id: props.id } };
    if (props.pathName && props.pathName.includes('spotlight')) {
      return { variables: { id: props.app.spotlightIndicator } };
    }
    return { variables: { id: props.app.globalIndicator } };
  },
  props: ({ data }) => {
    const { error } = data;
    if (error) console.error('map graphql error: ', error);
    return data;
  },
})(MapWrapper);

const mapStateToProps = ({ app }: State) => ({ app });

const MapWithRedux = connect(mapStateToProps)(MapWithApollo);

export default MapWithRedux;
