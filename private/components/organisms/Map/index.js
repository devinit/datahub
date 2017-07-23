// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import {connect} from 'react-redux';
import type {State} from 'lib/reducers';
import GlOBALMAPSQUERY from '../../../graphql/GlobalMaps.graphql';

type WrapperProps = {
  loading: boolean,
  activeMapIndicator: string,
   ...MapDataQuery
}

const MapWrapper = (props: WrapperProps) => {
  if (props.loading) {
    return (<p>Loading ...</p>);
  }
  return (<Map {...props} />);
};

const mapStateToProps = ({ activeMapIndicator }: State) => ({ activeMapIndicator });

const MapWithRedux = connect(mapStateToProps)(MapWrapper);

const MapwithApollo = graphql(GlOBALMAPSQUERY, {
  options: (props) => ({
    variables: {
      id: props.activeMapIndicator
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }})(MapWithRedux);

export default MapwithApollo;
