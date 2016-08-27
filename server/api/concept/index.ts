"use strict";
import express = require('express');
import {json} from 'body-parser';
import {ConceptController} from './concept-controller';

//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .post( (req, res) => ConceptController.create(req, res) )
  .get( (req, res) => ConceptController.findAll(req, res) )
;

router.route('/:conceptId')
  .get( (req, res) => ConceptController.findById(req, res) )
  .delete( (req, res) => ConceptController.delete(req, res) )
  .put( (req, res) => ConceptController.update(req, res) )
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