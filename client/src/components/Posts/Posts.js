import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  return (
    <React.Fragment>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </React.Fragment>
  );
}

export default Posts;