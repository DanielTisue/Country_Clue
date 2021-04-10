import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './PostShow.css';
// import heart from '../Images/LikeCount.svg';

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
  }
   
  state = {
    postShow: {}
  }

  componentDidMount() {
    this.getPostById();
  }

  
  async getPostById() {
    const res = await axios.get(
      `http://localhost:5000/posts/${this.props.match.params.id}`
      );
    this.setState({postShow: res.data});
  }

  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  deletePost() {
    axios.delete(`http://localhost:5000/posts/${this.props.match.params.id}`)
      .then((res) => {
        console.log('Post deleted');
      })
        // Redirect to Post  
      .then (res => {
        this.props.history.push('/posts');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render(){

    const postShow = this.state.postShow;

    return ( 
          <div className="postShow-container">
            <div className="show-post">

              <div className="show-item">
              <div className="show-likeCount">{postShow.likeCount}</div>
              </div>
              <div className="show-item">
              <h3 className="show-title">{postShow.title}</h3>
              </div>
              <div className="show-item">
              <img className="show-image" alt="" src={postShow.image} />
              </div>
              <div className="show-item">
              <p className="show-article">{postShow.message}</p>
              </div>
              <div className="show-item">
              <div className="show-tags">{postShow.tags}</div>
              </div>
              <div className="show-item">
              <div className="show-date">{this.renderDate(postShow.createdAt)} - {postShow.author}</div>
              </div>
              <div className="show-item">
              <button onClick={this.deletePost}>Delete</button>
              </div>
            </div>
          </div>
          
          )
  }
}

export default PostShow;