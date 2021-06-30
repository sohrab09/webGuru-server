const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require("express-fileupload");
const fs = require("fs-extra");
const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const port = 5000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());


app.get('/', (req, res) => {
  res.send('Hello Coders, Welcome to Web Guru')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cyf7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const webBlogCollection = client.db("webGuru").collection("webBlog");




  console.log("Database Connected");
});



app.listen(process.env.PORT || port)