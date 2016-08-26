"use strict";
import {MongoUser} from "../../backend/mongo-connector"
import {User} from "../../../model/model";
import {logger} from "../../logger"

var UserController = {

  findById: function(req: any, res: any){
    let id = req.params.userId;
    logger.debug(`Search for user : ${id}`);
    MongoUser.findOne({ _id: id }, function(err: any, user: User){
      if (err) return console.error(err);
      res.json(user);
      res.end();
    });
  },
  create: function(req: any, res: any){
    var body: User = req.body;
    if(body){
      let user = new MongoUser(body);
      user.save(function (err: any, user: User) {
        if (err) return console.error(err);
        res.json(user);
        res.end();
      });
    }
  },
  emailExists(req: any, res: any){
    console.log(req.params.email);
    MongoUser.find({ email: req.params.email }, function(err: any, users: Array<User>){
     if (err) console.log(err);
     if(users.length > 1) {
       res.json({status: '1'});
       res.end();
     }else{
       res.json({status: '0'});
       res.end();
     }
  });
  }
};

export {UserController}
