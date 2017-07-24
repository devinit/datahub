// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import {connect} from 'react-redux';
import type {State} from 'lib/reducers';
import MAPSQUERY from '../../../graphql/Maps.graphql';

type WrapperProps = {
  loading: boolean,
   ...MapDataQuery
}

type WithApolloProps = {
  pathName: string,
  spotlightIndicator: string,
  globalIndicator: string
}

const mapWrapper = (props: WrapperProps) => {
  if (props.loading) {
    return (<p>Loading ...</p>);
  }
  return (<Map {...props} />);
};

export const MapWithApollo = graphql(MAPSQUERY, {
  options: (props: WithApolloProps) => {
    if (props.id) return {variables: {id: props.id}};
    if (props.pathName && props.pathName === 'spotlight') return {variables: {id: props.spotlightIndicator}};
    return {variables: {id: props.globalIndicator}};
  },
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }})(mapWrapper);

const mapStateToProps = ({spotlightIndicator, globalIndicator}: State) =>
  ({ spotlightIndicator, globalIndicator });

export default connect(mapStateToProps)(MapWithApollo);

