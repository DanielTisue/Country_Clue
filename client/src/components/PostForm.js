import React, { Component } from 'react'
import axios from 'axios';
import './PostForm.css';
// import TagsInput from './TagsInput';



class PostForm extends Component {
  constructor(props) {
    super(props)
  //  const  selectedTags = tags => console.log(tags)}
    this.state = {
      title: "",
      description: "",
      image: "",
      message: "",
      tags: "",
      author: "Elton Claude",
    }
    // console.log(this.state);
  
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


  tagHandler = e => {
    let tags = e.target.value.split(",").map(e => e.trim());
     this.setState({tags});
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state);
    axios.post("http://localhost:5000/posts/", this.state)
    .then(res => {
      console.log(res);
    })
      // Redirect to Post  
    .then (res => {
      this.props.history.push('/posts');
    })
    .catch(err => {
      console.log(err);
    })    
  }

  

  render() {
   
    const { title, description, image, tags, message, author } = this.state;
    // console.log(tags);

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
             {/* <TagsInput selectedTags={selectedTags}   /> */}
            <input type="text" name="tags" placeholder="Make you hit space after each tag" value={tags} required onChange={this.tagHandler} />
          </div>
          <div className="postForm-item">
            <label>Author</label>
            <input type="text" name="author" defaultValue={author} />
          </div>
          <div className="postForm-item">
          <button className="postForm-button" type="submit">Submit</button>
          </div>
           <button className="back-button">Back to all posts</button>
          </div>
        </form>
        
        </div>
        
    )
  }
}

export default PostForm;
