"use strict";
import {MongoUser} from "../../backend/mongo-connector"
import {User} from "../../../model/model";
import {logger} from "../../logger"

var UserController = {

  findById: function(req: any, res: any){
    let id = req.params.userId;
    logger.debug(`Search for user: ${id}`);
    MongoUser.find({ _id: id }, function(err: any, user: User){
      if (err) return console.error(err);
      res.json(user);
      res.end();
    });
  }

};

export {UserController}
