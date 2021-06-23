import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Styles/Form.css';

const CreatePostForm = () => {
  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [fileData, setFileData] = useState(),
        [image, setFile] = useState(""),
        [message, setMessage] = useState(""),
        [tags, setTags] = useState([]);

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
      console.log(image, title, description, message, tags)

      await axios.post("http://localhost:5000/posts", formdata)
      .then(res => 
        console.log("res", res.data)
        )
        .then(res => 
        console.log(formdata)
        )
      .then(res => {
        history.push('/posts');
        })
      .catch((error) => console.log(error));
}; 
 
  return (
    
     <div className="postForm-container">
        
        <form className="postForm" encType="multipart/form-data"> 
          <div className="internalPostForm-alignment">
            <h3 className="postForm-title">Make it count!</h3>
            
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
              <input type="text" name="tags" placeholder="Separate each tag with a comma and no spaces. Ex: tag1,tag2,tag3" value={tags} onChange={tagHandler} />
            </div>
           
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
            <button className="back-button" onClick={backRouter}>Back to all posts</button>
            </div>
        </form>
        
        </div>
      
  )

}

export default CreatePostForm;