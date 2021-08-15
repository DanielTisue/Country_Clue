  
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../Context/AuthContext";
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Styles/Form.css';

const CreatePostForm = () => {

  const { loggedIn } = useContext(AuthContext);

  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [fileData, setFileData] = useState(),
        [image, setFile] = useState(""),
        [message, setMessage] = useState(""),
        [tags, setTags] = useState([]),
        [likes, setLikes] = useState(0),
        [error, setError] = useState(null),
        [success, setSuccess] = useState(false),
        [mounted, isMounting] = useState(true);

useEffect(() => {
  isMounting(false)
}, [])

let history = useHistory();

const handleFileChange = ({target}) => {
  setFileData(target.files[0]);
  setFile(target.value);
};

const tagHandler = (e) => {
    let tag = e.target.value.split(",").map(e => e.trim());
    setTags(tag);
  }

  //REDIRECT
  const backRouter = () => {
    history.push("/posts");
  }

  const clearFormData = () => {
        setTitle("")
        setDescription("")
        setFile("")
        setMessage("")
        setTags([])
  }

const handleSubmit = async (e) => {
      e.preventDefault();
      setLikes(0)
      const formdata = new FormData();

      formdata.append("image", fileData);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("message", message);
      formdata.append("likes", likes);
      console.log(likes);
      for (var i = 0; i < tags.length; i++ ) {
        formdata.append("tags[]", tags[i]);
      }    

      await axios.post("http://localhost:5000/posts", formdata)
      .then(res => {
        clearFormData();
        if(res.status === 200) {
          setSuccess(true)
        }
      })
      .then( res => {
        setTimeout(() => {
          history.push('/posts');
        }, 1000);
      })
      .catch((err) => {
        if(err.response.status === 500) {
          setError(err.response.data.errMessage)
        } 
        const errMessage = "There was a problem creating this article. Make sure all required fields are filled in."
        setError("Status: " + err.response.status + ": " + errMessage)
      })
            
}; 

 
  return (
     <div className="postForm-container">
        
        {loggedIn && !mounted && (
        <form className="postForm" encType="multipart/form-data"> 
          <div className="internalPostForm-alignment">
            <h1 className="postForm-title">Make it count!<span className="antique">&nbsp;</span></h1>
            
            <div className="postForm-item" id="postForm-item-1">
              <label>Title</label>
              <input className="inputs" type="text" name="title" placeholder="Enter the title of your article" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>

            <div className="postForm-item">
              <label>Description</label>
              <input className="inputs" type="text" name="description" placeholder="Enter a short description of your article" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>

            <div className="postForm-item">
              <label className="file-upload">Upload your image below</label>
              <input className="inputs" id="file-upload-input" type="file" name="file" accept="image/*" value={image} onChange={handleFileChange} />
            </div>
            <div className="postForm-item">
              <label>Article</label>
              <div className="CK-placeholder">Let the genius flow...</div>
              <CKEditor className="article-editor" editor={ClassicEditor} value={message} onChange={( event, editor ) => { const data =         editor.getData();
                        setMessage(data)
                        
                    }}  />
          
            </div>

            <div className="postForm-item">
              <label>Tags</label>
              <input className="inputs" type="text" name="tags" placeholder="Separate each tag with a comma and no spaces. Ex: tag1,tag2,tag3" value={tags} onChange={tagHandler} />
            </div>
           {!success &&
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            }
            {success && 
              <div className="postForm-item">
              <button className="postForm-button-success">Article successfully created</button>
              </div>
            }
            <button className="secondary" id="back-button" onClick={backRouter}>Back to all posts</button>
            { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
            </div>
        </form>
      )}
        </div>
    
  )

}

export default CreatePostForm;
