import React from 'react';

class Post extends React.Component {


  renderDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span key={tag}>{tag}</span>
    })
  }

  render(){
    const { post } = this.props;
    return ( 
    <div className= "post" key={post._id}>
            <div>{post.likeCount}</div>
            <h3>{post.title}</h3>
            <div>{post.image}</div>
            <p>{post.message}</p>
            <p>{post.tags}</p>
            <p>{this.renderDate(post.createdAt)} - {post.author}</p>
            <button className="button">Read more</button>
        </div>
        );
  }
}

export default Post;