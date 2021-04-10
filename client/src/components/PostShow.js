import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.css';
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
          // <div className="container">
            <div className="show-post">
            <div className="show-likeCount">{postShow.likeCount}</div>
            <h3 className="show-title">{postShow.title}</h3>
            <img className="show-image" alt="" src={postShow.image} />
            <p className="show-article">{postShow.message}</p>
            <p>{postShow.tags}</p>
            <p>{this.renderDate(postShow.createdAt)} - {postShow.author}</p>
            <button onClick={this.deletePost}>Delete</button>
            </div>
          // </div>
          
          )
  }
}

export default PostShow;