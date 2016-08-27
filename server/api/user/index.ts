"use strict";
import express = require('express');
import {json} from 'body-parser';
import {UserController} from "./user-controller"

//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get(function (req, res) {
    res.json({message: 'Return all users'});
    res.end();
  })
  .post((req, res) => UserController.create(req, res));

router.route('/:userId')
  .get( (req, res) => UserController.findById(req, res) )
  .put( (req, res) => UserController.update(req, res) )
  .delete(function (req, res) {
    res.json({message: 'delete user'});
    res.end();
  })
;
router.route('/email/exists/:email')
  .get( (req, res) => UserController.emailExists(req, res) )
;


module.exports = router;