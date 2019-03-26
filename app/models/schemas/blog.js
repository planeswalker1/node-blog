const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: String,
  src: String,
  alt: String,
  body: String,
  date: {type: Date, default: Date.now}
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;