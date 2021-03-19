require('dotenv').config({ path: '../.env' });
const express = require('express' );
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts.js');

const app = express();
const port = process.env.PORT || 5000;

 app.use(express.json({ extended: true }));
//app.use(express.urlencoded()); -documentation says to use this but error comes stating body-parser is deprecated...hmmm...possibly more research on this needed
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Database is connected!");
})

mongoose.set('useFindAndModify', false);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})