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
        [error, setError] = useState(null),
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
    console.log(tag);
  }

  //REDIRECT
  const backRouter = () => {
    history.push("/posts");
  }


const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formdata = new FormData();

      formdata.append("image", fileData);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("message", message);
      for (var i = 0; i < tags.length; i++ ) {
        formdata.append("tags[]", tags[i]);
      }    

      await axios.post("http://localhost:5000/posts", formdata)
      .then(res => {
      history.push('/posts');
      })
      .catch((err) => {
        if(err.response.status === 500) {
          setError(err.response.data.errMessage)
        } 
        const errMessage = "There was a problem creating this article. Please contact your site admin."
        setError("Status: " + err.response.status + ": " + errMessage)
      })
            
}; 

 
  return (
     <div className="postForm-container">
        { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
        {loggedIn && !mounted &&
        <form className="postForm" encType="multipart/form-data"> 
          <div className="internalPostForm-alignment">
            <h1 className="postForm-title">Make it count!</h1>
            
            <div className="postForm-item" id="postForm-item-1">
              <label>Title</label>
              <input type="text" name="title" placeholder="Enter the title of your article" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>

            <div className="postForm-item">
              <label>Description</label>
              <input type="text" name="description" placeholder="Enter a short description of your article" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>

            <div className="postForm-item">
              <label className="file-upload">Upload your image below</label>
              <input id="file-upload-input" type="file" name="file" accept="image/*" value={image} onChange={handleFileChange} />
            </div>
            <div className="postForm-item">
              <label>Article</label>
              <div className="CK-placeholder">Let the genius flow...</div>
              <CKEditor className="article-editor" editor={ClassicEditor} value={message} onChange={( event, editor ) => { const data =         editor.getData();
                        setMessage(data)
                        console.log(data);
                    }}  />
          
            </div>

            <div className="postForm-item">
              <label>Tags</label>
              {/* <select name="pets" multiple size="6">
                <optgroup label="tags">
                  <option value="artistReview">artistReview</option>
                  <option value="concertReview">concertReview</option>
                  <option value="albumReview" disabled>albumReview</option>
                  <option value="goneButNotForgotten">goneButNotForgotten</option>
                  <option value="roadtripPlaylist">roadtripPlaylist</option>
                  <option value="newArtist">newArtist</option>
                  </optgroup>
              </select> */}
              <input type="text" name="tags" placeholder="Separate each tag with a comma and no spaces. Ex: tag1,tag2,tag3" value={tags} onChange={tagHandler} />
            </div>
           
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
            <button className="back-button" onClick={backRouter}>Back to all posts</button>
            </div>
        </form>
}
        </div>
    
  )

}

export default CreatePostForm;