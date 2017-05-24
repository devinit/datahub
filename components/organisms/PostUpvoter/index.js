// @flow
import React from 'react';
import { gql, graphql } from 'react-apollo';

type Props = {
  upvote: (id: number, votes: number) => any,
  votes: number,
  id: number
}

function PostUpvoter({ upvote, votes, id }: Props) {
  return (
    <button onClick={() => upvote(id, votes + 1)}>
      {votes}
    </button>
  );
}

const upvotePost = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      votes
    }
  }
`;

export default graphql(upvotePost, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, votes) =>
      mutate({
        variables: { id, votes },
        optimisticResponse: {
          updatePost: {
            id: ownProps.id,
            votes: ownProps.votes + 1,
          },
        },
      }),
  }),
})(PostUpvoter);
