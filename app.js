const express = require('express');
const app = express();
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./app/models/config');
const blogsRouter = require('./routes/blogs');

// setup mongoose
mongoose.connect(config.dbUrl, { useNewUrlParser: true }).then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});

// ==========
// MIDDLEWARE
// ==========

if (app.get('env') === 'development') {
  var dev = true;
}

// setup ejs as main file extension
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
// serve public folder
app.use(express.static(path.join(__dirname, 'public')));
// setup body-parser
app.use(bodyParser.urlencoded({extended: true}));
// setup express-sanitizer
app.use(expressSanitizer());
// setup method-override (?_method)
app.use(methodOverride('_method'));

// ======
// ROUTES
// ======

// seperate routes to external router
app.use('/', blogsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (dev) {
  app.use(function (err, req, res, next) {
    if (err.status !== 404) {
      console.log(err);
    }
    return res.sendStatus(err.status || 500);
  });
}

// production error handler
app.use(function (err, req, res, next) {
  return res.sendStatus(err.status || 500);
});

app.listen(config.port, function () {
  console.log('listening at http://localhost:%s in %s mode',config.PORT, app.get('env'));
});