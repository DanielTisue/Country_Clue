import axios from 'axios';
import React from 'react';
// import './Post.css';
// import heart from '../Images/LikeCount.svg';

class PostShow extends React.Component {
   
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

  render(){

    const postShow = this.state.postShow;

    return ( 
          <div className="postShow-container">
            <div className="show-post">
            <div className="show-likeCount">{postShow.likeCount}</div>
            <h3 className="show-title">{postShow.title}</h3>
            <img className="show-image" alt="" src={postShow.image} />
            <p className="show-article">{postShow.message}</p>
            <p>{postShow.tags}</p>
            <p>{this.renderDate(postShow.createdAt)} - {postShow.author}</p>
            </div>
          </div>
          
          )
  }
}

export default PostShow;