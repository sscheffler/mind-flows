"use strict";
import {MongoUser} from "../../backend/mongo-connector";
import {User, Response} from "../../../model/model";
import {logger} from "../../logger";

var UserController = {
  findAll: function (req: any, res: any) {
    logger.debug(`Retrieving all users`);
    MongoUser.find({}, function (err: any, users: Array<User>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = new Response(200, {message: 'OK', content: users});
      res.json(response.status, response.body);
      res.end();
    });
  },
  findById: function (req: any, res: any) {
    let id = req.params.userId;
    logger.debug(`Search for user : ${id}`);
    MongoUser.findOne({_id: id}, function (err: any, user: User) {
      let response: Response = (err && new Response(500, {
          message: 'ERROR',
          content: err
        })) || new Response(200, {message: 'OK', content: user});
      res.json(response.status, response.body);
      res.end();
    });
  },
  create: function (req: any, res: any) {
    var body: User = req.body;
    if (body) {
      logger.debug(`Create user: ${body}`);
      let user = new MongoUser(body);
      user.save(function (err: any, user: User) {
        let response: Response = (err && new Response(500, {
            message: 'ERROR',
            content: err
          })) || new Response(200, {message: 'OK', content: user});
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
        let response: Response = (retVal == null && new Response(500, {
            message: 'user not found',
            content: {}
          })) || new Response(200, {message: 'updated user', content: {}});
        res.json(response.status, response.body);
        res.end();
      });
    }
  },
  delete: function (req: any, res: any) {
    var id = req.params.userId;
    logger.debug(`Delete user : ${id}`);
    MongoUser.findByIdAndRemove(id, function (err: any, retVal: User) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (retVal == null && new Response(500, {
          message: 'user not found',
          content: {}
        })) || new Response(200, {message: 'removed user', content: retVal});
      res.json(response.status, response.body);
      res.end();
    });
  },
  emailExists(req: any, res: any){
    logger.debug(`Find user bey email ${req.params.email}`);
    MongoUser.find({email: req.params.email}, function (err: any, users: Array<User>) {
      if (err) return res.json(500, {message: 'ERROR', content: err});
      let response: Response = (users.length > 1 && new Response(200, {
          message: '1',
          content: {}
        })) || new Response(200, {message: '0', content: {}});

      res.json(response.status, response.body);
      res.end();
    });
  }
};

export {UserController}
