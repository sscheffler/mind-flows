"use strict";
import {MongoMindFlow} from "../../backend/mongo-connector";
import {Response, FlowStep, MindFlow} from "../../../model/model";
import {logger} from "../../logger";

var MindFlowController = {
  findAll: function (req: any, res: any) {
    var userId = req.query.userId;
    logger.debug("Find All mind flows for user : " + userId);
    MongoMindFlow.find({userId: userId}, function (err: any, flows: Array<MindFlow>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = Response.aSuccess(flows);
      res.json(response.status, response.body);
      res.end();
    });
  },
  create: function (req: any, res: any) {
    var body: MindFlow = req.body;
    logger.debug("Create mind flow for user : " + body.userId);
    if (body) {
      let mongoMindFlow = new MongoMindFlow(body);
      mongoMindFlow.save(function (err: any, flow: MindFlow) {
        let response: Response = (err && Response.aError(err)) || Response.aSuccess(flow);
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  findFlow: function (req: any, res: any) {
    let flowId = req.params.flowId;
    logger.debug("mind-flow: " + flowId);
    MongoMindFlow.findOne({_id: flowId}, function (err: any, flow: MindFlow) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = Response.aSuccess(flow);
      res.json(response.status, response.body);
      res.end();
    });
  },
  deleteFlow: function (req: any, res: any) {
    let flowId = req.params.flowId;
    logger.debug("Delete mind-flow: " + flowId);
    MongoMindFlow.findByIdAndRemove(flowId, function (err: any, retVal: MindFlow) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (retVal == null && Response.aError({message: 'mind-flow not found'})) || Response.aSuccess(retVal);
      res.json(response.status, response.body);
      res.end();
    });
  },
  updateFlow: function (req: any, res: any) {
    let flowId = req.params.flowId;
    let body = req.body;
    logger.debug("Update mind-flow: " + flowId);
    if (body) {
      MongoMindFlow.findByIdAndUpdate(flowId, {$set: body}, function (err: any, retVal: MindFlow) {
        if (err) return res.json(500, {message: 'ERROR', content: err});
        let response: Response = (retVal == null && Response.aError({message: 'mind-flow not found'})) || Response.aSuccess();
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  addStep: function (req: any, res: any) {
    var body: FlowStep = req.body;
    var id = req.params.flowId;
    logger.debug(`AddRootStep to mindFlow: ${id}`);
    console.log(JSON.stringify(body));
    if (body) {
      MongoMindFlow.findOne({_id: id}, function (err: any, mindFlow: MindFlow) {
        if (mindFlow) {
          mindFlow.rootSteps.push(body);
          MongoMindFlow.findByIdAndUpdate(id, {$set: mindFlow}, function (err: any, retVal: MindFlow) {
            if (err) return res.json(500, {message: 'ERROR', content: err});
            let response: Response = (retVal == null && Response.aError({message: 'mindFlow not found'}))
              || Response.aSuccess();
            res.json(response.status, response.body);
            res.end();
          });
        } else {
          let response: Response = Response.aError({message: 'mindFlow not found'});
          res.json(response.status, response.body);
          res.end();
        }
      });
    }
  },
  deleteStep: function (req: any, res: any) {
    var body: FlowStep = req.body;
    var id = req.params.flowId;
    logger.debug(`Remove RootStep from MindFlow: ${id}`);
    if (body) {
      MongoMindFlow.findOne({_id: id}, function (err: any, mindFlow: MindFlow) {
        if (mindFlow) {
          for (let idx = 0; idx < mindFlow.rootSteps.length; idx++) {
            if (mindFlow.rootSteps[idx].concern === body.concern) {
              var step = mindFlow.rootSteps.splice(idx);
              logger.debug(`Removing ${step}`);
              MongoMindFlow.findByIdAndUpdate(id, {$set: mindFlow},
                (err: any, retVal: MindFlow) => defaultUpdate(res, err, retVal));
            }
          }
        }
      })
    } else {
      let response: Response = Response.aError({message: 'concept not found'});
      res.json(response.status, response.body);
      res.end();
    }  }

};

export {MindFlowController};

//---------------------privates----------------------------

function defaultUpdate(res: any, err: any, retVal: any){
  if (err) return res.json(500, {message: 'ERROR', content: err});
  let response: Response = (retVal == null && new Response(500, {
      message: 'item not found',
      content: {}
    })) || new Response(200, {message: 'updated', content: {}});
  res.json(response.status, response.body);
  res.end();
}
