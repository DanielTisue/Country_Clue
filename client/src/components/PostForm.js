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
      createdAt:"",
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
    const { title, description, image, message, tags, createdAt, author } = this.state;
    return (
      
      <div className="postForm-container">
        
        <form className="postForm" onSubmit={this.submitHandler}>
          <h3 className="postForm-title">Make it count!</h3>
          
          <div className="postForm-item" id="postForm-item-1">
            <label>Title</label>
            <input type="text" name="title" value={title} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Description</label>
            <input type="text" name="description" value={description} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label className="file-upload">Choose and upload your image below</label>
            <input id="file-upload-input" type="file" name="image" accept="image/*" value={image} onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Article</label>
            <textarea placeholder="Type your article here" type="text" name="message" value={message} required onFocus={(e) => e.target.placeholder = ""} onChange={this.changeHandler} ></textarea>
          </div>
           <div className="postForm-item">
             <label>Tags</label>
            <input type="text" name="tags" value={tags} required onChange={this.changeHandler} />
          </div>
          <div className="postForm-item">
            <label>Author</label>
            <input type="text" name="author" value={author} onChange={this.changeHandler} />
          </div>
           <div className="postForm-item">
            <label>Date</label>
            <input type="text" name="createdAt" value={createdAt} onChange={this.changeHandler} />
          </div>
          <button className="postForm-button" type="submit">Submit</button>
        </form>
        </div>
        
    )
  }
}

export default PostForm;
