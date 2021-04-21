import axios from 'axios';
import React, {useState} from 'react';
// import axios from 'axios';
import './PostForm.css';

//   title
//   description
//   image
//   message
//   tags
//   author

const CreatePostForm = () => {
  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [fileData, setFileData] = useState(),
        [image, setFile] = useState(""),
        [message, setMessage] = useState("");
        // [tags, setTags] = useState("");
  // const author = useState("Elton Claude");

const handleFileChange = ({target}) => {
  setFileData(target.files[0]);
  setFile(target.value);
  // console.log(target.files[0]);

};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formdata = new FormData();

  formdata.append("image", fileData);

  await axios.post("http://localhost:5000/posts/", formdata)
  .then((res) => console.log("res", res.data))
  .catch((error) => console.log(error));
};
 
// onChange={(e) => {
//   let tags = e.target.value.split(",").map(e => e.trim());
//   setTags(e.target.value)
//   }
// }

  // tagHandler = e => {
  //   let tags = e.target.value.split(",").map(e => e.trim());
  //    setTags({tags});
  // }
 
  return (
    
     <div className="postForm-container">
        
        <form className="postForm"> 
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
              <textarea placeholder="Type your article here" type="text" name="message" value={message} onFocus={(e) => e.target.placeholder = ""} onChange={(e)=>setMessage(e.target.value)} ></textarea>
            </div>

            {/* <div className="postForm-item">
              <label>Tags</label>
              <input type="text" name="tags" placeholder="Make you hit space after each tag" value={tags} required onChange={(e) => {
                        let tags = e.target.value.split(",").map(e => e.trim());
                        setTags({tags})
                        }} />
            </div> */}
            {/* <div className="postForm-item">
              <label>Author</label>
              <input type="text" name="author" defaultValue={author} />
            </div> */}
            <div className="postForm-item">
            <button className="postForm-button" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
            <button className="back-button">Back to all posts</button>
            </div>
        </form>
        
        </div>
      
  )

}

export default CreatePostForm;