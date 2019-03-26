const express = require('express');
var router = express.Router()

const Blog = require('../app/models/schemas/blog');

// How we are creating a blog
// Blog.create({
//   title: 'Test Blog',
//   src: 'https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_640.jpg',
//   alt: 'Photo of a forest',
//   body: 'Hello This is a blog post.'
// });

// serve home page containing all the blogs
router.get(['/', '/blogs'], function (req, res, next) {
  // get all blogs from db
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('Error!', err);
      // if err render index page with no blogs
      res.render('index');
    } else {
      // render index page with found blogs
      res.render('index', {blogs: blogs});
    }
  });
});

// serve form to create a new blog
router.get('/blogs/new', function (req, res, next) {
  res.render('new');
});

// handle new blog form submission
router.post('/blogs/', function (req, res, next) {
  // sanitize inputs
  req.body.blog.title = req.sanitize(req.body.blog.title);
  req.body.blog.src = req.sanitize(req.body.blog.src);
  req.body.blog.alt = req.sanitize(req.body.blog.alt);
  req.body.blog.body = req.sanitize(req.body.blog.body);

  // Create blog
  Blog.create(req.body.blog, function (err, blog) {
    if (err) {
      // if err redirect to create new blog form page
      res.render('new');
    } else {
      // redirect to /blogs
      res.redirect('/blogs');
    }
  });
});

// serve a single blog page
router.get('/blogs/:id', function (req, res, next) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) {
      // if err redirect to /blogs
      res.redirect('/blogs', 404);
    } else {
      // render blog page with found blog
      res.render('show', {blog: blog});
    }
  });
});

// serve form to edit a blog
router.get('/blogs/:id/edit', function (req, res, next) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) {
      // if err redirect to /blogs
      res.redirect('/blogs', 404);
    } else {
      // render edit page with blog details to edit
      res.render('edit', {blog: blog});
    }
  });
});

// handle edit blog form submission
router.put('/blogs/:id', function (req, res, next) {
  // sanitize inputs
  req.body.blog.title = req.sanitize(req.body.blog.title);
  req.body.blog.src = req.sanitize(req.body.blog.src);
  req.body.blog.alt = req.sanitize(req.body.blog.alt);
  req.body.blog.body = req.sanitize(req.body.blog.body);

  // update blog
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, {new: true}, function (err, blog) {
    if (err) {
      // if err redirect to /blogs
      res.redirect('/blogs', 400);
    } else {
      // redirect to edited blog
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// handle deleting a blog by id
router.delete('/blogs/:id', function (req, res, next) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    // redirect to /blogs even if error
    if (err) {
      res.redirect('/blogs', 400);
    } else {
      res.redirect('/blogs');
    }
  });
});

module.exports = router;