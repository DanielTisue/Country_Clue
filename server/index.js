require('dotenv').config({ path: '../.env' });
const express = require('express' );
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ["167.71.249.200"],
  credentials: true
}));
 
//MONGO SETUP
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database is connected!');
})
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})