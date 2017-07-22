// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/molecules/Map';
import GlOBALMAPSQUERY from 'Graphql/GlobalMaps.graphql';

type WrapperProps = {
  loading: boolean;
   ...MapDataQuery
}

const MapWrapper = (props: WrapperProps) => {
  if (props.loading) {
    return (<p>Loading ...</p>);
  }
  return (<Map {...props} />);
};

const withData = graphql(GlOBALMAPSQUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }})(MapWrapper);

export default withData;
