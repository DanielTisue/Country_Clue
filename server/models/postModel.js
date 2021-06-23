const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
     type: String,
     required: true,
  },
  image_id: {
    type: String
  },
  message: { 
    type: String, 
    required: true,
  },
  tags: {type: [String]},
  createdAt: {
    type: Date, 
    default: Date.now 
  },
  author: {
    type: String,
    default: 'Elton Claude'
  },
});

// title: { 
//     type: String, 
//     required: [true, "Please provide a title for your article"] 
//   },
//   description: {
//     type: String,
//     required: [true, "Please provide a description for your article. You can think of this as a subheadline 😉"]
//   },
//   image: {
//      type: String,
//      required: [true, "Please provide an image for your article. It is important to provide visual context to your readers."]
//   },
//   image_id: {
//     type: String
//   },
//   message: { 
//     type: String, 
//     required: [true, "What's an article without an actual article to read?"] 
//   },
//   tags: {type: [String]},


const Post = mongoose.model('Post', postSchema);

module.exports = Post;