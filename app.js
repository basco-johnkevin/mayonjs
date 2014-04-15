'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// models
var AccountModel = require('./app/models/account');
var models = {
  'accountModel': new AccountModel(mongoose)
};

// controllers
var AccountController = require('./app/controllers/account');
var PageController = require('./app/controllers/page');
var controllers = {
  'accountController': new AccountController(models.accountModel),
  'pageController': new PageController(models.accountModel)
};

require('./app/routes/index')(app, controllers);

app.set('dbUrl', 'mongodb://localhost/pdm');

// connect to mongodb
mongoose.connect(app.get('dbUrl'), function onMongooseError(err){
  if (err) {
    console.log(err);
    throw err;
  }
});

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//module.exports = app;


// NOTE: code below was extracted from ./bin/www
var debug = require('debug')('my-application');
// var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// Expose app
exports = module.exports = app;