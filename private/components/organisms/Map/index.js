// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import Map from 'components/atoms/Map';
import GlOBALMAPSQUERY from '../../../graphql/GlobalMaps.graphql';

type WrapperProps = GetMapDataQuery & {
  loading: boolean;
}
type MapData = {
  id?: string,
  name?: string,
  color?: string,
  value?: number,
}
const MapWrapper = (props: WrapperProps) => {
  if (props.mapData && props.mapData.map) {
    const paint = { data: props.mapData.map.filter(obj => obj.year && obj.year === 2015)};
    // const paint = { data: props.mapData.map };
    return (<Map paint={paint} />);
  }
  return (<p>Loading ...</p>);
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
    console.log('data fetched', data);
    return data;
  }})(MapWrapper);

export default withData;
