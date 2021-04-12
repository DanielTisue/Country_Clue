import React, { Component } from 'react';
import axios from 'axios';
import './PostForm.css';



class EditForm extends Component {
  constructor(props) {
    super(props)

      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeMessage = this.onChangeMessage.bind(this);
      this.onChangeTags = this.onChangeTags.bind(this);
      // this.onChangeAuthor = this.onChangeAuthor.bind(this);    
      this.onSubmitHandler = this.onSubmitHandler.bind(this); 

    this.state = {
      title: "",
      description: "",
      image: "",
      message: "",
      tags: "",
      // author: ""
    }
  }

   componentDidMount() {
    axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
          message: res.data.message,
          tags: res.data.tags
          // author: res.data.author
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // I feel like there is a way easier to do this and that I already found and applied this but we'll see

      onChangeTitle(e) {
        this.setState({title: e.target.value})
      } 
      onChangeDescription(e) {
        this.setState({description: e.target.value})
      } 
      onChangeImage(e) {
        this.setState({image: e.target.value})
      }
      onChangeMessage(e) {
        this.setState({message: e.target.value})
      } 
      onChangeTags(e) {
        this.setState({tags: e.target.value})
      }
      // onChangeAuthor(e) {
      //   this.setState({author: e.target.value})
      // }

  onSubmitHandler = e => {
    e.preventDefault()
    const postObject = {
      title: this.state.title, 
      description: this.state.description, 
      image: this.state.image, 
      message: this.state.message, 
      tags: this.state.tags, 
    };
    // console.log(this.state);
    axios.put(`http://localhost:5000/posts/${this.props.match.params.id}`, postObject)
    .then(res => {
      console.log(res.data);
      console.log("Post successfully updated")
    }) 
    // Redirect to Post  
    .then (res => {
      this.props.history.push(`/posts/${this.props.match.params.id}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    
    return (
      
      <div className="postForm-container">
       
        <form className="postForm" onSubmit={this.onSubmitHandler}>
          <div className="internalPostForm-alignment">
          <h3 className="postForm-title">Edit Form</h3>
          
          <div className="postForm-item" id="postForm-item-1">
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter the title of your article" value={this.state.title} required onChange={this.onChangeTitle} />
          </div>
          <div className="postForm-item">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter a short description of your article" value={this.state.description} required onChange={this.onChangeDescription} />
          </div>
          <div className="postForm-item">
            <label className="file-upload">Upload your image below</label>
            <input id="file-upload-input" type="file" name="image" accept="image/*" value={this.state.image} onChange={this.onChangeImage} />
          </div>
          <div className="postForm-item">
            <label>Article</label>
            <textarea type="text" name="message" value={this.state.message} required onChange={this.onChangeMessage} ></textarea>
          </div>
           <div className="postForm-item">
             <label>Tags</label>
            <input type="text" name="tags" placeholder="Tags will help organize your articles written #tag" value={this.state.tags} required onChange={this.onChangeTags} />
          </div>
          {/* <div className="postForm-item">
            <label>Author</label>
            <input type="text" name="author" placeholder="You could use a pseudonym" value={this.state.author} onChange={this.onChangeAuthor} />
          </div> */}
          <div className="postForm-item">
          <button className="postForm-button" type="submit">Submit</button>
          </div>
           <button className="back-button">Back to post</button>
          </div>
        </form>
        
        </div>
        
    )
  }
}

export default EditForm;
