import React, { Component } from 'react'
import axios from 'axios';
import './PostForm.css';



class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      description: "",
      image: "",
      message: "",
      tags: "",
      author: "",
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state);
    axios.post("http://localhost:5000/posts/", this.state)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // async getPosts() {
  //   const res = await axios.get("http://localhost:5000/posts/");
  //   this.setState({posts: res.data});
  
  // }

  render() {
    const { title, description, image, message, tags, author } = this.state;
    return (
      
      <div className="postForm-container">
        
        <form className="postForm" onSubmit={this.submitHandler}>
          <div className="internalPostForm-alignment">
          <h3 className="postForm-title">Make it count!</h3>
          
          <div className="postForm-item" id="postForm-item-1">
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter the title of your article" value={title} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter a short description of your article" value={description} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label className="file-upload">Upload your image below</label>
            <input id="file-upload-input" type="file" name="image" accept="image/*" value={image} onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Article</label>
            <textarea placeholder="Type your article here" type="text" name="message" value={message} required onFocus={(e) => e.target.placeholder = ""} onChange={this.changeHandler} ></textarea>
          </div>
           <div className="postForm-item">
             <label>Tags</label>
            <input type="text" name="tags" placeholder="Tags will help organize your articles written #tag" value={tags} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Author</label>
            <input type="text" name="author" placeholder="You could use a pseudonym" value={author} onChange={this.changeHandler} />
          </div>
           {/* <div className="postForm-item">
            <label>Date</label>
            <input type="date" name="createdAt" value={createdAt} onChange={this.changeHandler} />
          </div> */}
          <div className="postForm-item">
          <button className="postForm-button" type="submit">Submit</button>
          </div>
          </div>
        </form>
        
        </div>
        
    )
  }
}

export default PostForm;
