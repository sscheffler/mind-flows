"use strict";

/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var root = path.normalize(__dirname + '/../..')
console.log(root)

module.exports = function(app: any) {
  var env = app.get('env');

  app.set('views', root + '/server/views');
  app.set('view engine', 'pug');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(root, '.tmp')));
  app.use(express.static(path.join(root, 'client')));
  app.set('appPath', path.join(root, 'client'));
  app.use(morgan('dev'));
  app.use(errorHandler()); // Error handler - has to be last
};