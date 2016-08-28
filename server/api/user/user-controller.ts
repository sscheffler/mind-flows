"use strict";
import {MongoUser} from "../../backend/mongo-connector";
import {User, Response} from "../../../model/model";
import {logger} from "../../logger";

var UserController = {
  findAll: function (req: any, res: any) {
    logger.debug(`Retrieving all users`);
    MongoUser.find({}, function (err: any, users: Array<User>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = Response.aSuccess(users);
      res.json(response.status, response.body);
      res.end();
    });
  },
  findById: function (req: any, res: any) {
    let id = req.params.userId;
    logger.debug(`Search for user : ${id}`);
    MongoUser.findOne({_id: id}, function (err: any, user: User) {
      let response: Response = (err &&  Response.aError(err)) || Response.aSuccess(user);
      res.json(response.status, response.body);
      res.end();
    });
  },
  create: function (req: any, res: any) {
    var body: User = req.body;
    if (body) {
      logger.debug(`Create user: ${body}`);
      body.deactivated = false;
      let mongoUser = new MongoUser(body);
      mongoUser.save(function (err: any, user: User) {
        let response: Response = (err && Response.aError(err)) || Response.aSuccess(user);
        res.json(response.status, response.body);
        res.end();
      });
    }
  },

  update: function (req: any, res: any) {
    var body: User = req.body;
    var id = req.params.userId;
    logger.debug(`Update user : ${id}`);
    if (body) {
      MongoUser.findByIdAndUpdate(id, {$set: body}, function (err: any, retVal: User) {
        if (err) return res.json(500, {message: 'ERROR', content: err});
        let response: Response = (retVal == null && Response.aError({message: 'User not found'})) || Response.aSuccess();
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  deleteUser: function (req: any, res: any) {
    var id = req.params.userId;
    logger.debug(`Delete user : ${id}`);
    MongoUser.findByIdAndRemove(id, function (err: any, retVal: User) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (retVal == null && Response.aError({message: 'User not found'})) || Response.aSuccess(retVal);
      res.json(response.status, response.body);
      res.end();
    });
  },
  emailExists(req: any, res: any){
    logger.debug(`Find user bey email ${req.params.email}`);
    MongoUser.find({email: req.params.email}, function (err: any, users: Array<User>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (users.length > 1 && Response.aSuccess({found: true})) || Response.aSuccess({found: false});
      res.json(response.status, response.body);
      res.end();
    });
  }
};

export {UserController}
