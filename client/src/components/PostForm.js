import React, { Component } from 'react'
import axios from 'axios';
import './PostForm.css';



class PostForm extends Component {
  render() {
    return (
      
      <div className="postForm-container">
        
        <form className="postForm">
          <h3 className="postForm-title">Make it count!</h3>
          
          <div className="postForm-item" id="postForm-item-1">
            <label>Title</label>
            <input type="text" name="title" required />
          </div>
          <div className="postForm-item">
            <label>Description</label>
            <input type="text" name="description" required />
          </div>
          <div className="postForm-item">
            <label className="file-upload">Choose and upload your image below</label>
            <input id="file-upload-input" type="file" name="image" accept="image/*" />
          </div>
          <div className="postForm-item">
            <label>Article</label>
            <textarea placeholder="Type your article here" type="text" name="message" required onFocus={(e) => e.target.placeholder = ""}></textarea>
          </div>
           <div className="postForm-item">
             <label>Tags</label>
            <input type="text" name="tags" required />
          </div>
          <div className="postForm-item">
            <label>Author</label>
            <input type="text" name="author" />
          </div>
          <button className="postForm-button" type="submit">Submit</button>
        </form>
        </div>
        
    )
  }
}

export default PostForm;
