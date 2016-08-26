"use strict";
import {logger} from "../logger";
import {User} from "../../model/model";
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
var MongoUser = mongoose.model("User", userSchema);


export {db, MongoUser};