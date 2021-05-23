import React, { Component } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { Link } from 'react-router-dom';
import './PostShow.css';
import heart from '../Images/LikeCount.svg';
import tagImage from '../Images/tag.svg';

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
  }
   
  state = {
    postShow: {
                likeCount: "",
                title: "",
                image:"",
                message: "",
                tags: [],
                createdAt: "",
                author:""
              }
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
        // Redirect to Posts  
      .then (res => {
        this.props.history.push('/posts');
      })
      .catch((err) => {
        console.log(err);
      })
  }

   renderTags(tags) {
    return tags.map(tag => {
      return <span className="postShow-tag" key={tag}>{tag}<img className="postShow-tagImage" src={tagImage} alt="tag" /></span>
    });
  }

  render(){

    const postShow = this.state.postShow;

    return ( 
          <div className="postShow-container">
            <div className="show-post">

              <div className="show-item">
              <div className="show-likeCount"><span className="show-heartSvg"><img className="heart-svg" alt="heart" src={heart} onClick={this.likePost}/></span><sup>{postShow.likeCount}</sup></div>
              </div>
              <div className="show-item">
              <h3 className="show-title">{postShow.title}</h3>
              </div>
               <div className="show-item">
              <div className="show-date">{postShow.author} - {this.renderDate(postShow.createdAt)}</div>
              </div>
              <div className="show-item">
              <img className="show-image" alt="" src={postShow.image} />
              </div>
               <div className="show-item-tags">
                <div className="show-tags">{this.renderTags(postShow.tags)}</div>
              </div>

            
              <div className="show-item">
                <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(postShow.message)}}></div>
              </div>
             
             
              <div className="show-item" id="button-div">
              <button className="read-more" onClick={this.deletePost}>Delete</button>
              <Link to={`${this.props.match.params.id}/edit`} >
              <button className="edit">Edit</button>
              </Link>
               <Link to={'/posts'} >
              <button className="read-more">Articles</button>
              </Link>
              </div>
              
            </div>
          </div>
          
          )
  }
}


export default PostShow;