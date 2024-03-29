import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Styles/Form.css';

const PostEditForm = (props) => {
    const { loggedIn } = useContext(AuthContext);

    const [title, setTitle] = useState(""),
            [description, setDescription] = useState(""),
            [fileData, setFileData] = useState(),
            [image, setFile] = useState(""),
            [message, setMessage] = useState(""),
            [oldImage, setImage] = useState(""),
            [tags, setTags] = useState([]),
            [error, setError] = useState(null),
            [success, setSuccess] = useState(false),
            [mounted, isMounting] = useState(true);

    let history = useHistory();

//Load data from post with id
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/` + props.match.params.id)
    .then((result) => {
     setTitle(result.data.title)
     setDescription(result.data.description)
     setImage(result.data.image)
     setMessage(result.data.message)
     setTags(result.data.tags)
     isMounting(false)
    })
    .catch((err) => {
      if(err.response.status === 500) {
        setError(err.response.data.errMessage)
      } 
      const errMessage = "There was a problem retrieving this article. Please contact your site admin."
      setError("Status: " + err.response.status + ": " + errMessage)
    });
  }, [props]);

  //GET Image file
  const handleFileChange = ({target}) => {
    // console.log(`this is the target value ${target.files[0]}`);
    setFileData(target.files[0]);
    // console.log(`this is the target value ${target.value}`);
    setFile(target.value);

  };

  const tagHandler = (e) => {
  let tag = e.target.value.split(",").map(e => e.trim());
  setTags(tag)
  }

  //REDIRECT
  const backRouter = () => {
    history.push("/posts/" + props.match.params.id);
  }

  const clearFormData = () => {
        setTitle("")
        setDescription("")
        setFile("")
        setImage("")
        setMessage("")
        setTags([])
  }

  //SUBMIT function

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
      

    await axios.put(`${process.env.REACT_APP_BASE_URL}/posts/` + props.match.params.id, formdata)
    .then(res => {
        clearFormData();
        if(res.status === 200) {
          setSuccess(true)
        }
      })
      .then( res => {
        setTimeout(() => {
          history.push('/posts/' + props.match.params.id);
        }, 1000);
      })
    .catch((err) => {
      if(err.response.status === 500) {
        setError(err.response.data.errMessage)
      } 
      const errMessage = "There was a problem updating this article. Please contact your site admin."
      setError("Status: " + err.response.status + ": " + errMessage)
    })
  };
 
 
  return (
    
     <div className="postForm-container">
       
        {loggedIn && !mounted && (
        <form className="postForm" encType="multipart/form-data"> 
          <div className="internalPostForm-alignment">
            <h1 className="postForm-title">Don't worry! Nobody noticed.<span className="antique">&nbsp;</span></h1>
            
            
            <div className="postForm-item" id="postForm-item-1">
              <label>Title</label>
              <input type="text" name="title" placeholder="Enter the title of your article" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>

            <div className="postForm-item">
              <label>Description</label>
              <input type="text" name="description" placeholder="Enter a short description of your article" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>

            <div className="postForm-item">
               <label className="file-upload">Your Previous image</label>
              <div><img className="oldImage" src={oldImage} alt="previous"/></div>
              <label className="file-upload">Upload a new image below</label>
              <input id="file-upload-input" type="file" name="file" accept="image/*" value={image || ""} onChange={handleFileChange} />
            </div>

            <div className="postForm-item">
              <label>Article</label>
               <CKEditor className="article-editor" editor={ClassicEditor} value={message} data={message} onChange={( event, editor ) => { 
                 const data = editor.getData();
                setMessage(data)
                }}  />
            </div>

            <div className="postForm-item">
              <label>Tags</label>
              <input type="text" name="tags" placeholder="Make you hit space after each tag" value={tags} required onChange={tagHandler} />
            </div>
            {!success &&
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            }
            {success && 
            <div className="postForm-item">
            <button className="postForm-button-success">Article successfully updated</button>
            </div>
            } 
            
            <button className="secondary" id="back-button" onClick={backRouter}>Back to this Article</button>
             { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
            </div>
        </form>
        )}
        </div>
      
  )

}

export default PostEditForm;