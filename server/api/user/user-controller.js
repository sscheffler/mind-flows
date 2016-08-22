"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var logger_1 = require("../../logger");
var UserController = {
    findById: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Search for user: " + id);
        mongo_connector_1.MongoUser.find({ _id: id }, function (err, user) {
            if (err) return console.error(err);
            res.json(user);
            res.end();
        });
    }
};
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUVBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFFbkIsY0FBVSxVQUFTLEdBQVQsRUFBbUIsR0FBbkIsRUFBMkI7QUFDbkMsWUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE1BQXBCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxzQkFBb0IsRUFBakM7QUFDQSwwQkFBQSxTQUFBLENBQVUsSUFBVixDQUFlLEVBQUUsS0FBSyxFQUFQLEVBQWYsRUFBNEIsVUFBUyxHQUFULEVBQW1CLElBQW5CLEVBQTZCO0FBQ3ZELGdCQUFJLEdBQUosRUFBUyxPQUFPLFFBQVEsS0FBUixDQUFjLEdBQWQsQ0FBUDtBQUNULGdCQUFJLElBQUosQ0FBUyxJQUFUO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBSkQ7QUFLRDtBQVZrQixDQUFyQjtBQWNRLFFBQUEsY0FBQSxHQUFjLGNBQWQiLCJmaWxlIjoic2VydmVyL2FwaS91c2VyL3VzZXItY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtNb25nb1VzZXJ9IGZyb20gXCIuLi8uLi9iYWNrZW5kL21vbmdvLWNvbm5lY3RvclwiXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9tb2RlbFwiO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuLi8uLi9sb2dnZXJcIlxuXG52YXIgVXNlckNvbnRyb2xsZXIgPSB7XG5cbiAgZmluZEJ5SWQ6IGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgbGV0IGlkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBTZWFyY2ggZm9yIHVzZXI6ICR7aWR9YCk7XG4gICAgTW9uZ29Vc2VyLmZpbmQoeyBfaWQ6IGlkIH0sIGZ1bmN0aW9uKGVycjogYW55LCB1c2VyOiBVc2VyKXtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXMuanNvbih1c2VyKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQge1VzZXJDb250cm9sbGVyfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
