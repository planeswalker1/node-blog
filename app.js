const express = require('express');
const config = require('./config');

let app = express();

app.get('/', function (req, res, next) {
  res.send('home');
});

app.listen(config.port, function() {
  console.log('listening at localhost:%s in %s mode', config.port, app.get('env'));
});