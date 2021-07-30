import React from 'react';
import '../Styles/Post.css';
import tagImage from '../../Images/tag.svg';

class Post extends React.Component {
    constructor(props) {
    super(props);
    this.showPost = this.showPost.bind(this);
  }

  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="tag" key={tag}>{tag}<img className="tag-svg" src={tagImage} alt="tag" /></span>
    });
  }

  showPost() {
    window.location.pathname = `/posts/${this.props.post._id}`;
  }

  render(){
    const { post } = this.props;
    return ( 
    
      <div className="post" onClick={this.showPost} >
            
              <img className="post-img" alt="placeHolder" src={post.image} />
            
              <p className="post-tags">{this.renderTags(post.tags)}</p>
            {/* <div className="post-title-wrapper"> */}
              <h3 className="post-title post-item">{post.title}</h3>
            {/* </div> */}
              <p className="post-description post-item">{post.description}</p>
              <p className="post-date">{this.renderDate(post.createdAt)}</p>
        </div>
        
        );
  }
}

export default Post;