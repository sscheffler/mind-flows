"use strict";
import express = require('express');
import {json} from "body-parser";
import {MindFlowController} from "./mind-flow-controller"

//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get( (req, res) => MindFlowController.findAll(req, res) )
  .post( (req, res) => MindFlowController.create(req, res) )
;

router.route('/:flowId')
  .get( (req, res) => MindFlowController.findFlow(req, res) )
  .delete( (req, res) => MindFlowController.deleteFlow(req, res) )
  .put( (req, res) => MindFlowController.updateFlow(req, res) )
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