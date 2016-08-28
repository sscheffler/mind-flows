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
  .post( (req, res) => MindFlowController.addStep(req, res) )
  .delete( (req, res) => MindFlowController.deleteStep(req, res) )
;

router.route('/:flowId/concept/:concept')
  .post(function (req, res) {
    res.json({message: 'Link concept to flow'});
    res.end();
  })
;

module.exports = router;