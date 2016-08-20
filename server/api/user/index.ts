"use strict";
import express = require('express');
import {json} from 'body-parser';


//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get(function (req, res) {
    res.json({message: 'Return all users'});
    res.end();
  })
  .post(function (req, res) {
    res.json({message: 'Create User'});
    res.end();
  });

router.route('/:userId')
  .get(function (req, res) {
    res.json({message: 'get certain user'});
    res.end();
  })
  .put(function (req, res) {
    res.json({message: 'update user'});
    res.end();
  })
  .delete(function (req, res) {
    res.json({message: 'delete user'});
    res.end();
  })
;

module.exports = router;