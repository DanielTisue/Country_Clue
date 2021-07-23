import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostList extends React.Component {
  // signal = axios.CancelToken.source();

  state = {
    isLoading: false,
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  // componentWillUnmount() {
  //   // this.signal.cancel();
  // }
  async getPosts() {
    try {
      this.setState( { isLoading: true });
      const res = await axios.get("http://localhost:5000/posts"); 
      // { cancelToken: this.signal.token }
      // console.log(res.data);
      this.setState({posts: res.data})
    } catch (err) {
      console.log(err);
      // if (axios.isCancel(err)) {
      //   console.log('Error: ', err.message); 
      // => prints: Api is being canceled
      // } else {
      //   this.setState({ isLoading: false });
      // }
    }
    
  }


  renderList() {
    return this.state.posts.map( post => {
    return <Post post={post} key={post._id} />
    });
  }

render(){
  return <div className="container">
            <div className="flex-container">
              <div className="articlepage-title-wrapper">
                  <h1 id="articlepage-title">Articles</h1>
              </div>
                {this.renderList()}
            </div>
          </div>
  }
}

export default PostList;