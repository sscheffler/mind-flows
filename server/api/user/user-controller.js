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
    update: function (req, res) {
        var body = req.body;
        var id = req.params.userId;
        logger_1.logger.debug("Update user : " + id);
        if (body) {
            mongo_connector_1.MongoUser.findByIdAndUpdate(id, { $set: body }, function (err, retVal) {
                if (err) return res.json({ status: 'ERROR', message: err });
                var responseMessage = retVal == null && 'user not found' || 'updated user';
                res.json({ status: 'ERROR', message: responseMessage });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUVBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFFbkIsY0FBVSxVQUFTLEdBQVQsRUFBbUIsR0FBbkIsRUFBMkI7QUFDbkMsWUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE1BQXBCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSx1QkFBcUIsRUFBbEM7QUFDQSwwQkFBQSxTQUFBLENBQVUsT0FBVixDQUFrQixFQUFFLEtBQUssRUFBUCxFQUFsQixFQUErQixVQUFTLEdBQVQsRUFBbUIsSUFBbkIsRUFBNkI7QUFDMUQsZ0JBQUksR0FBSixFQUFTLE9BQU8sUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFQO0FBQ1QsZ0JBQUksSUFBSixDQUFTLElBQVQ7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FKRDtBQUtELEtBVmtCO0FBV25CLFlBQVEsVUFBUyxHQUFULEVBQW1CLEdBQW5CLEVBQTJCO0FBQ2pDLFlBQUksT0FBYSxJQUFJLElBQXJCO0FBQ0EsWUFBRyxJQUFILEVBQVE7QUFDTixnQkFBSSxPQUFPLElBQUksa0JBQUEsU0FBSixDQUFjLElBQWQsQ0FBWDtBQUNBLGlCQUFLLElBQUwsQ0FBVSxVQUFVLEdBQVYsRUFBb0IsSUFBcEIsRUFBOEI7QUFDdEMsb0JBQUksR0FBSixFQUFTLE9BQU8sUUFBUSxLQUFSLENBQWMsR0FBZCxDQUFQO0FBQ1Qsb0JBQUksSUFBSixDQUFTLElBQVQ7QUFDQSxvQkFBSSxHQUFKO0FBQ0QsYUFKRDtBQUtEO0FBQ0YsS0FyQmtCO0FBdUJuQixZQUFRLFVBQVMsR0FBVCxFQUFtQixHQUFuQixFQUEyQjtBQUNqQyxZQUFJLE9BQWEsSUFBSSxJQUFyQjtBQUNBLFlBQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxNQUFwQjtBQUNBLGlCQUFBLE1BQUEsQ0FBTyxLQUFQLENBQWEsbUJBQWlCLEVBQTlCO0FBQ0EsWUFBRyxJQUFILEVBQVE7QUFDTiw4QkFBQSxTQUFBLENBQVUsaUJBQVYsQ0FBNEIsRUFBNUIsRUFBZ0MsRUFBRSxNQUFNLElBQVIsRUFBaEMsRUFBK0MsVUFBVSxHQUFWLEVBQW9CLE1BQXBCLEVBQWdDO0FBQzdFLG9CQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEVBQUMsUUFBUSxPQUFULEVBQWtCLFNBQVMsR0FBM0IsRUFBVCxDQUFQO0FBQ1Qsb0JBQUksa0JBQTBCLFVBQVUsSUFBVixJQUFrQixnQkFBbEIsSUFBc0MsY0FBcEU7QUFDQSxvQkFBSSxJQUFKLENBQVMsRUFBQyxRQUFRLE9BQVQsRUFBa0IsU0FBUyxlQUEzQixFQUFUO0FBQ0Esb0JBQUksR0FBSjtBQUNELGFBTEQ7QUFNRDtBQUNGLEtBbkNrQjtBQW9DbkIsaUJBQVcsVUFBQyxHQUFELEVBQVcsR0FBWCxFQUFtQjtBQUM1QixnQkFBUSxHQUFSLENBQVksSUFBSSxNQUFKLENBQVcsS0FBdkI7QUFDQSwwQkFBQSxTQUFBLENBQVUsSUFBVixDQUFlLEVBQUUsT0FBTyxJQUFJLE1BQUosQ0FBVyxLQUFwQixFQUFmLEVBQTRDLFVBQVMsR0FBVCxFQUFtQixLQUFuQixFQUFxQztBQUNoRixnQkFBSSxHQUFKLEVBQVMsUUFBUSxHQUFSLENBQVksR0FBWjtBQUNULGdCQUFHLE1BQU0sTUFBTixHQUFlLENBQWxCLEVBQXFCO0FBQ25CLG9CQUFJLElBQUosQ0FBUyxFQUFDLFFBQVEsR0FBVCxFQUFUO0FBQ0Esb0JBQUksR0FBSjtBQUNELGFBSEQsTUFHSztBQUNILG9CQUFJLElBQUosQ0FBUyxFQUFDLFFBQVEsR0FBVCxFQUFUO0FBQ0Esb0JBQUksR0FBSjtBQUNEO0FBQ0gsU0FUQztBQVVEO0FBaERrQixDQUFyQjtBQW1EUSxRQUFBLGNBQUEsR0FBYyxjQUFkIiwiZmlsZSI6InNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7TW9uZ29Vc2VyfSBmcm9tIFwiLi4vLi4vYmFja2VuZC9tb25nby1jb25uZWN0b3JcIlxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvbW9kZWxcIjtcbmltcG9ydCB7bG9nZ2VyfSBmcm9tIFwiLi4vLi4vbG9nZ2VyXCJcblxudmFyIFVzZXJDb250cm9sbGVyID0ge1xuXG4gIGZpbmRCeUlkOiBmdW5jdGlvbihyZXE6IGFueSwgcmVzOiBhbnkpe1xuICAgIGxldCBpZCA9IHJlcS5wYXJhbXMudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgU2VhcmNoIGZvciB1c2VyIDogJHtpZH1gKTtcbiAgICBNb25nb1VzZXIuZmluZE9uZSh7IF9pZDogaWQgfSwgZnVuY3Rpb24oZXJyOiBhbnksIHVzZXI6IFVzZXIpe1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5qc29uKHVzZXIpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgdmFyIGJvZHk6IFVzZXIgPSByZXEuYm9keTtcbiAgICBpZihib2R5KXtcbiAgICAgIGxldCB1c2VyID0gbmV3IE1vbmdvVXNlcihib2R5KTtcbiAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyOiBhbnksIHVzZXI6IFVzZXIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmVzLmpzb24odXNlcik7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgdmFyIGJvZHk6IFVzZXIgPSByZXEuYm9keTtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYFVwZGF0ZSB1c2VyIDogJHtpZH1gKTtcbiAgICBpZihib2R5KXtcbiAgICAgIE1vbmdvVXNlci5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyAkc2V0OiBib2R5fSwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IFVzZXIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKHtzdGF0dXM6ICdFUlJPUicsIG1lc3NhZ2U6IGVycn0pO1xuICAgICAgICBsZXQgcmVzcG9uc2VNZXNzYWdlOiBzdHJpbmcgPSByZXRWYWwgPT0gbnVsbCAmJiAndXNlciBub3QgZm91bmQnIHx8ICd1cGRhdGVkIHVzZXInXG4gICAgICAgIHJlcy5qc29uKHtzdGF0dXM6ICdFUlJPUicsIG1lc3NhZ2U6IHJlc3BvbnNlTWVzc2FnZX0pO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGVtYWlsRXhpc3RzKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgY29uc29sZS5sb2cocmVxLnBhcmFtcy5lbWFpbCk7XG4gICAgTW9uZ29Vc2VyLmZpbmQoeyBlbWFpbDogcmVxLnBhcmFtcy5lbWFpbCB9LCBmdW5jdGlvbihlcnI6IGFueSwgdXNlcnM6IEFycmF5PFVzZXI+KXtcbiAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcbiAgICAgaWYodXNlcnMubGVuZ3RoID4gMSkge1xuICAgICAgIHJlcy5qc29uKHtzdGF0dXM6ICcxJ30pO1xuICAgICAgIHJlcy5lbmQoKTtcbiAgICAgfWVsc2V7XG4gICAgICAgcmVzLmpzb24oe3N0YXR1czogJzAnfSk7XG4gICAgICAgcmVzLmVuZCgpO1xuICAgICB9XG4gIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1VzZXJDb250cm9sbGVyfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
