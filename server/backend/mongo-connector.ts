"use strict";
var mongoose = require('mongoose');

var conn_str = "mongodb://user:user@ds161225.mlab.com:61225/minddb";
mongoose.connect(conn_str);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = mongoose.Schema({
  email: String,
  login: String,
  passwd: String,
  gravatarUrl: String,
  deactivated: String
});

var conceptSchema = mongoose.Schema({
  comment: String,
  name: String,
  userId: String,
  visibilityPublic: String,
  rootSteps: []
});

var flowStepSchema = mongoose.Schema({
  concern: String,
  childs: []
});

var MongoUser = mongoose.model("User", userSchema);
var MongoConcept = mongoose.model("Concept", conceptSchema);
var MongoFlowStep= mongoose.model("FlowStep", flowStepSchema);

export {db, MongoUser, MongoConcept, MongoFlowStep};