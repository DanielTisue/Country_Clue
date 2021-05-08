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
      this.onSubmitHandler = this.onSubmitHandler.bind(this); 

    this.state = {
      title: "",
      description: "",
      image: "",
      fileData: null,
      message: "",
      tags: ""
    }
  }

    componentDidMount() {
    axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          old_image: res.data.image,
          message: res.data.message,
          tags: res.data.tags
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
      onChangeImage = ({ target }) => {
        this.setState({image: target.files[0]});
        console.log(target.files[0]);
        // this.setState({image: target.value});
        // console.log(target.value);
      }
      onChangeMessage(e) {
        this.setState({message: e.target.value})
      } 

      onChangeTags(e) {
        let tags = e.target.value.split(",").map(e => e.trim());
        this.setState({tags});
      }

      // onChangeTags(e) {
      //   this.setState({tags: e.target.value})
      // }
      // onChangeAuthor(e) {
      //   this.setState({author: e.target.value})
      // }

  onSubmitHandler = async (e) => {
    e.preventDefault()

    const formdata = new FormData();

    formdata.append( "image", this.state.fileData)
    formdata.append("title", this.state.title);
    formdata.append("description", this.state.description);
    formdata.append("message", this.state.message);

    // const postObject = {
    //   title: this.state.title, 
    //   description: this.state.description, 
    //   image: this.state.fileData, 
    //   message: this.state.message, 
    //   tags: this.state.tags, 
    // };
    // console.log(this.state);
    await axios.put(`http://localhost:5000/posts/${this.props.match.params.id}`, formdata)
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
       
        <form className="postForm" encType="multipart/form-data">
          <div className="internalPostForm-alignment">
          <h3 className="postForm-title">Edit Form</h3>
          
          <div className="postForm-item" id="postForm-item-1">
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter the title of your article" value={this.state.title || ''} required onChange={this.onChangeTitle} />
          </div>
          <div className="postForm-item">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter a short description of your article" value={this.state.description || ''} required onChange={this.onChangeDescription} />
          </div>
          <div className="postForm-item">
            {/* <label className="file-upload">Current Image</label>
            <div style={{ width: 200 }}><img src={this.state.image} alt="current" /></div> */}
            <label className="file-upload">Upload your new image below</label>
            <input id="file-upload-input" type="file" name="image" accept="image/*" value={this.state.fileData || ''} onChange={this.onChangeImage} />
          </div>
          <div className="postForm-item">
            <label>Article</label>
            <textarea type="text" name="message" value={this.state.message || ''} required onChange={this.onChangeMessage} ></textarea>
          </div>
           <div className="postForm-item">
             <label>Tags</label>
            <input type="text" name="tags" placeholder="Tags will help organize your articles written tag,tag,tag" value={this.state.tags || ''} onChange={this.onChangeTags} />
          </div>
          <div className="postForm-item">
          <button className="postForm-button" type="submit" onClick={this.onSubmitHandler}>Submit</button>
          </div>
           <button className="back-button">Back to post</button>
          </div>
        </form>
        
        </div>
        
    )
  }
}

export default EditForm;
