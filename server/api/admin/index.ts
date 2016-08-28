"use strict";
import express = require('express');
import {json} from 'body-parser';
import {AdministrationController} from './administration-controller'


//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .post( (req, res) => AdministrationController.createAdmin(req, res) );

router.route('/:userId/deactivate/:deactivate')
  .put( (req, res) => AdministrationController.deactivateUser(req, res) );

module.exports = router;