"use strict";
import express = require('express');
import {json} from "body-parser";

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

router.route('/:flowId')
  .get(function (req, res) {
    res.json({message: 'Get certain flow'});
    res.end();
  })
  .delete(function (req, res) {
    res.json({message: 'delete complete flow'});
    res.end()
  })
  .put(function (req, res) {
    res.json({message: 'update'});
    res.end()
  })
;

router.route('/:flowId/step')
  .post(function (req, res) {
    res.json({message: 'Add step to flow'});
    res.end();
  })
  .post(function (req, res) {
    res.json({message: 'Remove step to flow'});
    res.end();
  })
;

router.route('/:flowId/concept/:concept')
  .post(function (req, res) {
    res.json({message: 'Link concept to flow'});
    res.end();
  })
;

module.exports = router;