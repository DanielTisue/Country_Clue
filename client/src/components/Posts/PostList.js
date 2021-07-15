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

  componentDidUpdate() {
    this.getPosts();
  }

  async getPosts() {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      // console.log(res.data);
      this.setState({posts: res.data})
    } catch (err) {
      console.log(err);
    }
    
  }


  renderList() {
    return this.state.posts.map( post => {
    return <Post post={post} key={post._id} />
    });
  }

render(){
  return <div className="flex-container">
            <div className="articlepage-title-wrapper">
                <h1 id="articlepage-title">Articles</h1>
            </div>
              {this.renderList()}
          </div>
  }
}

export default PostList;