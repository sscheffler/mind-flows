"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var logger_1 = require("../../logger");
var UserController = {
    findById: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Search for user : " + id);
        mongo_connector_1.MongoUser.findOne({ _id: id }, function (err, user) {
            if (err) return console.error(err);
            res.json(user);
            res.end();
        });
    },
    create: function (req, res) {
        var body = req.body;
        if (body) {
            var user = new mongo_connector_1.MongoUser(body);
            user.save(function (err, user) {
                if (err) return console.error(err);
                res.json(user);
                res.end();
            });
        }
    },
    emailExists: function (req, res) {
        console.log(req.params.email);
        mongo_connector_1.MongoUser.find({ email: req.params.email }, function (err, users) {
            if (err) console.log(err);
            if (users.length > 1) {
                res.json({ status: '1' });
                res.end();
            } else {
                res.json({ status: '0' });
                res.end();
            }
        });
    }
};
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUVBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFFbkIsY0FBVSxVQUFTLEdBQVQsRUFBbUIsR0FBbkIsRUFBMkI7QUFDbkMsWUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE1BQXBCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSx1QkFBcUIsRUFBbEM7QUFDQSwwQkFBQSxTQUFBLENBQVUsT0FBVixDQUFrQixFQUFFLEtBQUssRUFBUCxFQUFsQixFQUErQixVQUFTLEdBQVQsRUFBbUIsSUFBbkIsRUFBNkI7QUFDMUQsZ0JBQUksR0FBSixFQUFTLE9BQU8sUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFQO0FBQ1QsZ0JBQUksSUFBSixDQUFTLElBQVQ7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FKRDtBQUtELEtBVmtCO0FBV25CLFlBQVEsVUFBUyxHQUFULEVBQW1CLEdBQW5CLEVBQTJCO0FBQ2pDLFlBQUksT0FBYSxJQUFJLElBQXJCO0FBQ0EsWUFBRyxJQUFILEVBQVE7QUFDTixnQkFBSSxPQUFPLElBQUksa0JBQUEsU0FBSixDQUFjLElBQWQsQ0FBWDtBQUNBLGlCQUFLLElBQUwsQ0FBVSxVQUFVLEdBQVYsRUFBb0IsSUFBcEIsRUFBOEI7QUFDdEMsb0JBQUksR0FBSixFQUFTLE9BQU8sUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFQO0FBQ1Qsb0JBQUksSUFBSixDQUFTLElBQVQ7QUFDQSxvQkFBSSxHQUFKO0FBQ0QsYUFKRDtBQUtEO0FBQ0YsS0FyQmtCO0FBc0JuQixpQkFBVyxVQUFDLEdBQUQsRUFBVyxHQUFYLEVBQW1CO0FBQzVCLGdCQUFRLEdBQVIsQ0FBWSxJQUFJLE1BQUosQ0FBVyxLQUF2QjtBQUNBLDBCQUFBLFNBQUEsQ0FBVSxJQUFWLENBQWUsRUFBRSxPQUFPLElBQUksTUFBSixDQUFXLEtBQXBCLEVBQWYsRUFBNEMsVUFBUyxHQUFULEVBQW1CLEtBQW5CLEVBQXFDO0FBQ2hGLGdCQUFJLEdBQUosRUFBUyxRQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ1QsZ0JBQUcsTUFBTSxNQUFOLEdBQWUsQ0FBbEIsRUFBcUI7QUFDbkIsb0JBQUksSUFBSixDQUFTLEVBQUMsUUFBUSxHQUFULEVBQVQ7QUFDQSxvQkFBSSxHQUFKO0FBQ0QsYUFIRCxNQUdLO0FBQ0gsb0JBQUksSUFBSixDQUFTLEVBQUMsUUFBUSxHQUFULEVBQVQ7QUFDQSxvQkFBSSxHQUFKO0FBQ0Q7QUFDSCxTQVRDO0FBVUQ7QUFsQ2tCLENBQXJCO0FBcUNRLFFBQUEsY0FBQSxHQUFjLGNBQWQiLCJmaWxlIjoic2VydmVyL2FwaS91c2VyL3VzZXItY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtNb25nb1VzZXJ9IGZyb20gXCIuLi8uLi9iYWNrZW5kL21vbmdvLWNvbm5lY3RvclwiXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9tb2RlbFwiO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuLi8uLi9sb2dnZXJcIlxuXG52YXIgVXNlckNvbnRyb2xsZXIgPSB7XG5cbiAgZmluZEJ5SWQ6IGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgbGV0IGlkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBTZWFyY2ggZm9yIHVzZXIgOiAke2lkfWApO1xuICAgIE1vbmdvVXNlci5maW5kT25lKHsgX2lkOiBpZCB9LCBmdW5jdGlvbihlcnI6IGFueSwgdXNlcjogVXNlcil7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgcmVzLmpzb24odXNlcik7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24ocmVxOiBhbnksIHJlczogYW55KXtcbiAgICB2YXIgYm9keTogVXNlciA9IHJlcS5ib2R5O1xuICAgIGlmKGJvZHkpe1xuICAgICAgbGV0IHVzZXIgPSBuZXcgTW9uZ29Vc2VyKGJvZHkpO1xuICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnI6IGFueSwgdXNlcjogVXNlcikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZXMuanNvbih1c2VyKTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBlbWFpbEV4aXN0cyhyZXE6IGFueSwgcmVzOiBhbnkpe1xuICAgIGNvbnNvbGUubG9nKHJlcS5wYXJhbXMuZW1haWwpO1xuICAgIE1vbmdvVXNlci5maW5kKHsgZW1haWw6IHJlcS5wYXJhbXMuZW1haWwgfSwgZnVuY3Rpb24oZXJyOiBhbnksIHVzZXJzOiBBcnJheTxVc2VyPil7XG4gICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XG4gICAgIGlmKHVzZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICByZXMuanNvbih7c3RhdHVzOiAnMSd9KTtcbiAgICAgICByZXMuZW5kKCk7XG4gICAgIH1lbHNle1xuICAgICAgIHJlcy5qc29uKHtzdGF0dXM6ICcwJ30pO1xuICAgICAgIHJlcy5lbmQoKTtcbiAgICAgfVxuICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtVc2VyQ29udHJvbGxlcn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
