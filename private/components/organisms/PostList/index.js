// @flow
import { gql, graphql } from 'react-apollo';
import React from 'react';
import PostUpvoter from '../PostUpvoter';

type apolloData = {
  allPosts: Array<any>,
  loading: boolean,
  _allPostsMeta: any
}

type Props = {
  data: apolloData,
  loadMorePosts: () => void
}

const POSTS_PER_PAGE = 10;

function PostList({
  data: { allPosts, loading, _allPostsMeta },
  loadMorePosts,
}: Props) {
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <section>
        <ul>
          {allPosts.map((post, index) => (
            <li key={post.id}>
              <div>
                <span>{index + 1}. </span>
                <a href={post.url}>{post.title}</a>
                <PostUpvoter id={post.id} votes={post.votes} />
              </div>
            </li>
          ))}
        </ul>
        {areMorePosts
          ? <button onClick={() => loadMorePosts()}>
            {' '}{loading ? 'Loading...' : 'Show More'}{' '}
          </button>
          : ''}
      </section>
    );
  }
  return <div>Loading</div>;
}

const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    },
    _allPostsMeta {
      count
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  options: {
    fetchPolicy: 'cache-first',
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE,
    },
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
          });
        },
      });
    },
  }),
})(PostList);
