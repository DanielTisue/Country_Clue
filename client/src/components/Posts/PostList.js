import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostList extends React.Component {
  // signal = axios.CancelToken.source();

  state = {
    error: null,
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    try {
      const res = await axios.get("http://localhost:5000/posts"); 
      this.setState({posts: res.data})
    } catch (err) {
      if(err.response.status === 500) {
          this.setState({ error: err.response.data.errMessage })
        } 
        const errMessage = "There was a problem retrieving the articles. Please contact your site admin."
        this.setState({ error: "Status: " + err.response.status + ": " + errMessage })
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
                  { this.error && <div className="error-message-wrapper"><div className="error-message">{ this.error }</div></div> }
              </div>
                {this.renderList()}
            </div>
          </div>
  }
}

export default PostList;