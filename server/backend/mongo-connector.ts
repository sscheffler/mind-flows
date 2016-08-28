"use strict";
import Any = jasmine.Any;
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

var adminSchema = mongoose.Schema({
  email: String,
  login: String,
  passwd: String
});

var conceptSchema = mongoose.Schema({
  comment: String,
  name: String,
  userId: String,
  visibilityPublic: String,
  rootSteps: []
});

var mindFlowSchema = mongoose.Schema({
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
var MongoAdministrator = mongoose.model("Administrator", adminSchema);
var MongoConcept = mongoose.model("Concept", conceptSchema);
var MongoMindFlow = mongoose.model("MindFlow", mindFlowSchema);
var MongoFlowStep= mongoose.model("FlowStep", flowStepSchema);

export {db, MongoUser, MongoConcept, MongoMindFlow, MongoFlowStep, MongoAdministrator};