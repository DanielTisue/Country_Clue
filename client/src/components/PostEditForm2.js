import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import './PostForm.css';

//   title
//   description
//   image
//   message
//   tags
//   author

const EditPostForm = (props) => {
  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [fileData, setFileData] = useState(),
        [image, setFile] = useState(""),
        [message, setMessage] = useState("");
        //[tags, setTags] = useState("");

// let history = useHistory();

const handleFileChange = ({target}) => {
  console.log(`this is the target value ${target.files[0]}`);
  setFileData(target.files[0]);
  console.log(`this is the target value ${target.value}`);
  setFile(target.value);

};

// const getData = async ( ) => {
//   try {
//     let res = await axios.get(`http://localhost:5000/posts/${match.params.id}`)
//           setTitle(res.title)
//           setDescription(res.description)
//           setFile(res.image)
//           setMessage(res.message)
//   } catch(err) {
//     console.log(err);
//   }
// }

// useEffect( () => {
// getData();
// }, []);


const handleSubmit = async (e) => {
  e.preventDefault();

  const formdata = new FormData();

  formdata.append("image", fileData);
  formdata.append("title", title);
  formdata.append("description", description);
  formdata.append("message", message);
  // formdata.append("tags", tags);
 

 console.log(fileData);

  await axios.post("http://localhost:5000/posts/", formdata)
  
  .then((res) => console.log("res", res.data))
  // .then(res => {
  //   history.push('/posts');
  //   })
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
              <textarea placeholder="Type your article here" type="text" name="message" value={message} onFocus={(e) => e.target.placeholder = ""} onChange={(e)=>setMessage(e.target.value)} ></textarea>
            </div>

            {/* <div className="postForm-item">
              <label>Tags</label>
              <input type="text" name="tags" placeholder="Make you hit space after each tag" value={tags} required onChange={(e) => {
                        let tags = e.target.value.split(",").map(e => e.trim());
                        setTags({tags})
                        }} />
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

export default EditPostForm;