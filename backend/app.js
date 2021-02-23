const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require('./routes/posts');

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

app.use("/api/posts", postsRoutes);

module.exports = app;
