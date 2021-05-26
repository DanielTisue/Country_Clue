import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Form.css';


//   title
//   description
//   image
//   message  
//   tags
//   author

const PostEditForm = (props) => {

 
 
    const [title, setTitle] = useState(""),
            [description, setDescription] = useState(""),
            [fileData, setFileData] = useState(),
            [image, setFile] = useState(""),
            [message, setMessage] = useState(""),
            [oldImage, setImage] = useState(""),
            [tags, setTags] = useState([]);

    let history = useHistory();

//Load data from post with id
  useEffect(() => {
    axios.get("http://localhost:5000/posts/" + props.match.params.id)
    .then((result) => {
     setTitle(result.data.title)
     setDescription(result.data.description)
     setImage(result.data.image)
     setMessage(result.data.message)
     setTags(result.data.tags)
    })
      .catch((error) => console.log(error))
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
  setTags(tag);
      
  console.log('this is the:' + [...tag]);
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

    await axios.put("http://localhost:5000/posts/" + props.match.params.id, formdata)
    
    .then((res) => console.log("res", res.data, res.data.tags))
    .then(res => {
      history.push('/posts/' + props.match.params.id);
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
               <label className="file-upload">Your Previous image</label>
              <div><img className="oldImage" src={oldImage} alt=""/></div>
              <label className="file-upload">Upload a new image below</label>
              <input id="file-upload-input" type="file" name="file" accept="image/*" value={image || ""} onChange={handleFileChange} />
            </div>

            <div className="postForm-item">
              <label>Article</label>
               <CKEditor className="article-editor" editor={ClassicEditor} value={message} data={message} onChange={( event, editor ) => { const data =         editor.getData();
                        setMessage(data)
                        // console.log(data);
                    }}  />
            </div>

            <div className="postForm-item">
              <label>Tags</label>
              <input type="text" name="tags" placeholder="Make you hit space after each tag" value={tags} required onChange={tagHandler} />
            </div>
          
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
            <button className="back-button">Back to this post</button>
            </div>
        </form>
        
        </div>
      
  )

}

export default PostEditForm;