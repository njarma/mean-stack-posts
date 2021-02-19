const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post'); 
const app = express();

const url = "mongodb+srv://njarma:LALSda4rZJGMeyCc@cluster0.koto2.mongodb.net/mean-app?retryWrites=true&w=majority";
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(url, config)
  .then(() => {
    console.log("conected to database");
  })
  .catch(() => {
    console.error("something was wrong!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content 
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post updated successfully!",
      post: post
    });
  });
});


app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents 
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);      
    } else {
      res.status(404).json({
        message: "Post not found"
      });
    }
  });


});



app.delete("/api/posts/:id", (req, res, next) => {

  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Post deleted successfully"
      });
    });
})

module.exports = app;
