// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import {seaBackground} from 'components/theme/semantic';
import {Div} from 'glamorous';
import {connect} from 'react-redux';
import type {State} from 'lib/reducers';
import MAPSQUERY from '../../../graphql/Maps.graphql';

type WrapperProps = {
  loading: boolean,
   ...MapDataQuery
}

type WithApolloProps = {
  pathName: string,
  app: {
    spotlightIndicator: string,
    globalIndicator: string
  }
}
const MapWrapper = (props: WrapperProps) => {
  if (props.loading) return (<Div width={'100%'} height={'600'} backgroundColor={seaBackground} />);
  return (<Map {...props} />);
};

const MapWithApollo = graphql(MAPSQUERY, {
  options: (props: WithApolloProps) => {
    console.log('map props', props);
    if (props.id) return {variables: {id: props.id}};
    if (props.pathName && props.pathName === '/spotlight') return {variables: {id: props.app.spotlightIndicator}};
    return {variables: {id: props.app.globalIndicator}};
  },
  props: ({data}) => {
    const {error, loading} = data;
    console.log('data', data);
    if (error) throw Error(error);
    return data;
  }})(MapWrapper);

const mapStateToProps = ({app}: State) => ({app});

const MapWithRedux = connect(mapStateToProps)(MapWithApollo);

export default MapWithRedux;
