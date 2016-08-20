"use strict";
import express = require('express');
import {json} from 'body-parser';

//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get(function (req, res) {
    res.json({message: 'Get all for user'});
    res.end();
  })
  .post(function (req, res) {
    res.json({message: 'Create new for user'});
    res.end();
  })
;

router.route('/:conceptId')
  .get(function (req, res) {
    res.json({message: 'Get certain concept'});
    res.end();
  })
  .delete(function (req, res) {
    res.json({message: 'delete complete concept'});
    res.end()
  })
  .put(function (req, res) {
    res.json({message: 'update'});
    res.end()
  })
;

router.route('/:conceptId/step')
  .post(function (req, res) {
    res.json({message: 'Add step to concept'});
    res.end();
  })
  .post(function (req, res) {
    res.json({message: 'Remove step to concept'});
    res.end();
  })
;
module.exports = router;