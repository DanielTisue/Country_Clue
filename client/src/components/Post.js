import React from 'react';
import './Post.css';
import heart from '../Images/LikeCount.svg'

class Post extends React.Component {
    constructor(props) {
    super(props);
    this.showPost = this.showPost.bind(this);
  }

  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span key={String}>{tag}</span>
    });
  }

  showPost() {
    console.log(this);
    window.location.pathname = `/posts/${this.props.post._id}`;
  }

  render(){
    const { post } = this.props;
    return ( 
    <div className="post" onClick={this.showPost} >
            <div className="post-likeCount">{post.likeCount} <img className="post-like-icon" alt="like-icon" src={heart} /></div>
            <h3>{post.title}</h3>
            <img className="post-img" alt="placeHolder" src={post.image} />
            <p className="post-description">{post.description}</p>
            <p className="post-tags">{post.tags}</p>
            <p className="post-date">{this.renderDate(post.createdAt)} - {post.author}</p>
            <button className="read-more" >Read more</button>
        </div>
        );
  }
}

export default Post;