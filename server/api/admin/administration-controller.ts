"use strict";
import {MongoAdministrator, MongoUser} from "../../backend/mongo-connector";
import {Administrator, Response, User} from "../../../model/model";
import {logger} from "../../logger";

var AdministrationController = {
  createAdmin: function (req: any, res: any) {
    var body: Administrator = req.body;
    if (body) {
      logger.debug(`Create administrator: ${body}`);
      let mongoAdmin = new MongoAdministrator(body);
      mongoAdmin.save(function (err: any, admin: Administrator) {
        let response: Response = (err && new Response(500, {
            message: 'ERROR',
            content: err
          })) || new Response(200, {message: 'OK', content: admin});
        res.json(response.status, response.body);
        res.end();
      });
    }},
  deactivateUser: function (req: any, res: any) {
    let userId = req.params.userId;
    let deactivateUser = req.params.deactivate;
    logger.debug(`Deactivating user: ${userId} - ${deactivateUser}`);
    MongoUser.findOne({_id: userId}, function (err: any, user: User) {
      if(user){
        user.deactivated = deactivateUser;
        MongoUser.findByIdAndUpdate(userId, {$set: user},
          (err: any, retVal: User) => defaultUpdate(res, err, retVal));
      }else {
        let response: Response = Response.aError('User not found');
        res.json(response.status, response.body);
        res.end();
      }
    });
  }
};

export {AdministrationController}

//---------------------privates----------------------------

function defaultUpdate(res: any, err: any, retVal: any){
  if (err) return res.json(500, {message: 'ERROR', content: err});
  let response: Response = (retVal == null && Response.aError('not found'))
    || Response.aSuccess();
  res.json(response.status, response.body);
  res.end();
}

