import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostList extends React.Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get("http://localhost:5000/posts/");
    this.setState({posts: res.data});
  }


  // renderList() {
  //   return this.state.posts.map( post => {
  //   return <Post post={post} key={post._id} />
  // });
  // }

render(){
 return this.state.posts.map( post => {
    return <Post post={post} key={post._id} />
  });
  // return <div>{this.renderList()}</div>;
  }
}

export default PostList;