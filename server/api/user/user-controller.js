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
    }
};
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUVBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFFbkIsY0FBVSxVQUFTLEdBQVQsRUFBbUIsR0FBbkIsRUFBMkI7QUFDbkMsWUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE1BQXBCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSx1QkFBcUIsRUFBbEM7QUFDQSwwQkFBQSxTQUFBLENBQVUsT0FBVixDQUFrQixFQUFFLEtBQUssRUFBUCxFQUFsQixFQUErQixVQUFTLEdBQVQsRUFBbUIsSUFBbkIsRUFBNkI7QUFDMUQsZ0JBQUksR0FBSixFQUFTLE9BQU8sUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFQO0FBQ1QsZ0JBQUksSUFBSixDQUFTLElBQVQ7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FKRDtBQUtEO0FBVmtCLENBQXJCO0FBY1EsUUFBQSxjQUFBLEdBQWMsY0FBZCIsImZpbGUiOiJzZXJ2ZXIvYXBpL3VzZXIvdXNlci1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvVXNlcn0gZnJvbSBcIi4uLy4uL2JhY2tlbmQvbW9uZ28tY29ubmVjdG9yXCJcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uLy4uLy4uL21vZGVsL21vZGVsXCI7XG5pbXBvcnQge2xvZ2dlcn0gZnJvbSBcIi4uLy4uL2xvZ2dlclwiXG5cbnZhciBVc2VyQ29udHJvbGxlciA9IHtcblxuICBmaW5kQnlJZDogZnVuY3Rpb24ocmVxOiBhbnksIHJlczogYW55KXtcbiAgICBsZXQgaWQgPSByZXEucGFyYW1zLnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYFNlYXJjaCBmb3IgdXNlciA6ICR7aWR9YCk7XG4gICAgTW9uZ29Vc2VyLmZpbmRPbmUoeyBfaWQ6IGlkIH0sIGZ1bmN0aW9uKGVycjogYW55LCB1c2VyOiBVc2VyKXtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXMuanNvbih1c2VyKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQge1VzZXJDb250cm9sbGVyfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
