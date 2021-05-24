import React from 'react';
import '../Post.css';
import heart from '../../Images/LikeCount.svg';
import tagImage from '../../Images/tag.svg';

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
      return <span className="tag" key={tag}>{tag}<img className="tag-svg" src={tagImage} alt="tag" /></span>
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
        <div className="post-likeCount post-item"><span className="show-heartSvg"><img className="post-like-icon" alt="heart" src={heart} /></span><sup className="like-number">{post.likeCount}</sup></div>
            {/* <div className="post-likeCount post-item">{post.likeCount} <img className="post-like-icon" alt="like-icon" src={heart} /></div> */}
            <h3 className="post-title post-item">{post.title}</h3>
            <img className="post-img post-item" alt="placeHolder" src={post.image} />
            <p className="post-description post-item">{post.description}</p>
            <p className="post-tags post-item">{this.renderTags(post.tags)}</p>
            <button className="read-more post-item" >Read more</button>
            <p className="post-date">{this.renderDate(post.createdAt)}</p>
        </div>
        
        );
  }
}

export default Post;