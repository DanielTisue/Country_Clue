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
    // console.log(res);
    this.setState({postShow: res.data});
    // console.log(this.state.postShow.title);
  }

  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  render(){
    const postShow = this.state.postShow;
    // const { post } = this.props;

    return ( 
          <div className="postShow-container">
            <div className="likeCount">{postShow.likeCount}</div>
            <h3>{postShow.title}</h3>
            <img alt="show-image" src={postShow.image} />
            <p className="show-article">{postShow.message}</p>
            <p>{postShow.tags}</p>
            <p>{this.renderDate(postShow.createdAt)} - {postShow.author}</p>
            
          </div>
          
          )
  }
}

export default PostShow;