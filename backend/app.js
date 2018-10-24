const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const assetsRoutes = require('./routes/assets');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contact');
// const commentsRoutes = require('./routes/comments');
const app = express();

mongoose.connect(
  "mongodb+srv://amitya:" +
  process.env.MONGO_ATLAS_PSW +
  "@realestate-3u84a.mongodb.net/angular-node?retryWrites=true"
  )
  .then(() => {
    console.log('Connected to database!');
})
  .catch(() => {
    console.log('Connection failed...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

// Headers setup //
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});


app.use("/api/assets", assetsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
// app.use("/api/comments", commentsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
