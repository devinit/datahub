import gql from 'graphql-tag';

export default gql `query UnbundlingAidData($args: UnbundlingAidQuery) {
  bundles: unbundlingAidData(args: $args) {
    uid,
    id,
    name,
    value,
    color,
  }
}`;
