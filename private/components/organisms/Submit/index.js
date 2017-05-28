// @flow
import React from 'react';
import { gql, graphql } from 'react-apollo';

type Props = {
  createPost: (title: string, url: string) => any
}

function Submit({ createPost }: Props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    let url = e.target.elements.url.value;

    if (title === '' || url === '') {
      console.error('Both fields are required.');
      return false;
    }

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`;
    }

    createPost(title, url);

    // reset form
    e.target.elements.title.value = '';
    e.target.elements.url.value = '';
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" />
      <input placeholder="url" name="url" />
      <button type="submit">Submit</button>
    </form>
  );
}

const createPost = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      title
      votes
      url
      createdAt
    }
  }
`;

export default graphql(createPost, {
  props: ({ mutate }) => ({
    createPost: (title, url) =>
      mutate({
        variables: { title, url },
        updateQueries: {
          allPosts: (previousResult, { mutationResult }) => {
            const newPost = mutationResult.data.createPost;
            return Object.assign({}, previousResult, {
              // Append the new post
              allPosts: [newPost, ...previousResult.allPosts],
            });
          },
        },
      }),
  }),
})(Submit);
