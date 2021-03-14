require('dotenv').config({ path: '../.env' });
const express = require('express' );
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts.js');

const app = express();

app.use('/posts', postRoutes);

app.use(express.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
//app.use(express.urlencoded()); -documentation says to use this but error comes stating body-parser is deprecated...hmmm...possibly more research on this needed
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect( process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then (() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);