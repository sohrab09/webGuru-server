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

    // Add Blog In Database 

    app.post('/admin/post-blog', (req, res) => {
        const file = req.files.image;
        const name = req.body.name;
        const postOwner = req.body.postOwner;
        const category = req.body.category;
        const description = req.body.description;
        const newImage = file.data;
        const convertImage = newImage.toString("base64");
        const image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(convertImage, "base64"),
        };
        webBlogCollection.insertOne({ name, category, postOwner, description, image })
            .then((result) => {
                res.send(result.insertedCount > 0);
                console.log("Blog added to database")
            });
    });


    // Get Blog From Database 

    app.get('/blogs', (req, res) => {
        webBlogCollection.find({}).toArray((err, documents) => {
            res.send(documents);
        });
    });



    console.log("Database Connected");
});



app.listen(process.env.PORT || port)