import React from 'react';
import './Post.css';
import heart from '../Images/LikeCount.svg'

class Post extends React.Component {


  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span key={String}>{tag}</span>
    })
  }

  render(){
    const { post } = this.props;
    return ( 
    <div className= "post">
            <div className="likeCount">{post.likeCount} <img className="like-icon" alt="like-icon" src={heart} /></div>
            <h3>{post.title}</h3>
            <img alt="placeHolder" src={post.image} />
            <p className="message">{post.message}</p>
            <p>{post.tags}</p>
            <p>{this.renderDate(post.createdAt)} - {post.author}</p>
            <button className="read-more">Read more</button>
        </div>
        );
  }
}

export default Post;