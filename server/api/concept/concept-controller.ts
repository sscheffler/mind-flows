"use strict";
import {MongoConcept} from "../../backend/mongo-connector";
import {Concept, Response, FlowStep} from "../../../model/model";
import {logger} from "../../logger";

var ConceptController = {
  findAll: function (req: any, res: any) {
    let userId = req.query.userId;
    logger.debug(`Find All concepts for user : ${userId}`);
    MongoConcept.find({userId: userId}, function (err: any, concepts: Array<Concept>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = new Response(200, {
          message: 'OK',
          content: concepts
        });

      res.json(response.status, response.body);
      res.end();
    });

  },
  create: function (req: any, res: any) {
    var body: Concept = req.body;
    if (body) {
      logger.debug(`Create concept: ${body}`);
      let mongoConcept = new MongoConcept(body);
      mongoConcept.save(function (err: any, concept: Concept) {
        let response: Response = (err && new Response(500, {
            message: 'ERROR',
            content: err
          })) || new Response(200, {message: 'OK', content: concept});
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  findById: function (req: any, res: any) {
    var id = req.params.conceptId;
    logger.debug(`find concept by Id: ${id}`);
    MongoConcept.findOne({_id: id}, function (err: any, concept: Concept)
    {
      let response: Response = (err && new Response(500, {
          message: 'ERROR',
          content: err
        })) || new Response(200, {message: 'OK', content: concept});
      res.json(response.status, response.body);
      res.end();
    });
  },
  delete: function (req: any, res: any) {
    var id = req.params.conceptId;
    logger.debug(`delete concept by Id: ${id}`);
    MongoConcept.findByIdAndRemove(id, function (err: any, retVal: Concept) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (retVal == null && new Response(500, {
          message: 'concept not found',
          content: {}
        })) || new Response(200, {message: 'removed user', content: retVal});
      res.json(response.status, response.body);
      res.end();
    });
  },
  update: function (req: any, res: any) {
    var body: Concept = req.body;
    var id = req.params.conceptId;
    logger.debug(`Update concept by Id: ${id}`);
    if (body) {
      MongoConcept.findByIdAndUpdate(id, {$set: body}, function (err: any, retVal: Concept) {
        if (err) return res.json(500, {message: 'ERROR', content: err});
        let response: Response = (retVal == null && new Response(500, {
            message: 'concept not found',
            content: {}
          })) || new Response(200, {message: 'updated concept', content: {}});
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  addStep: function (req: any, res: any) {
    var body: FlowStep = req.body;
    var id = req.params.conceptId;
    logger.debug(`AddRootStep to concept: ${id}`);
    if (body) {
      MongoConcept.findOne({_id: id}, function (err: any, concept: Concept)
      {
        if(concept) {
          concept.rootSteps.push(body);
          MongoConcept.findByIdAndUpdate(id, {$set: concept}, function (err: any, retVal: Concept) {
            if (err) return res.json(500, {message: 'ERROR', content: err});
            let response: Response = (retVal == null && new Response(500, {
                message: 'concept not found',
                content: {}
              })) || new Response(200, {message: 'added root step to concept', content: {}});
            res.json(response.status, response.body);
            res.end();
          });
        } else {
          let response: Response = new Response(500, {
            message: 'concept not found',
            content: {}
          });
          res.json(response.status, response.body);
          res.end();
        }
      });
    }
  },
  deleteStep: function (req: any, res: any) {
    var body: FlowStep = req.body;
    var id = req.params.conceptId;
    logger.debug(`Remove RootStep from Concept: ${id}`);
    if (body) {
      MongoConcept.findOne({_id: id}, function (err: any, concept: Concept) {
        if (concept) {
          for (let idx = 0; idx < concept.rootSteps.length; idx++) {
            if(concept.rootSteps[idx].concern === body.concern){
              var step = concept.rootSteps.splice(idx);
              logger.debug(`Removing ${step}`);
              MongoConcept.findByIdAndUpdate(id, {$set: concept},
                (err: any, retVal: Concept) => defaultUpdate(res, err, retVal));
            }
          }
        }
      })
    } else {
        let response: Response = new Response(500, {
          message: 'concept not found',
          content: {}
        });
        res.json(response.status, response.body);
        res.end();
      }
    }
};

export {ConceptController}

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


