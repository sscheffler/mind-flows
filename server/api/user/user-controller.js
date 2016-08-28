"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var model_1 = require("../../../model/model");
var logger_1 = require("../../logger");
var UserController = {
    findAll: function (req, res) {
        logger_1.logger.debug("Retrieving all users");
        mongo_connector_1.MongoUser.find({}, function (err, users) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = model_1.Response.aSuccess(users);
            res.json(response.status, response.body);
            res.end();
        });
    },
    findById: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Search for user : " + id);
        mongo_connector_1.MongoUser.findOne({ _id: id }, function (err, user) {
            var response = err && model_1.Response.aError(err) || model_1.Response.aSuccess(user);
            res.json(response.status, response.body);
            res.end();
        });
    },
    create: function (req, res) {
        var body = req.body;
        if (body) {
            logger_1.logger.debug("Create user: " + body);
            body.deactivated = false;
            var mongoUser = new mongo_connector_1.MongoUser(body);
            mongoUser.save(function (err, user) {
                var response = err && model_1.Response.aError(err) || model_1.Response.aSuccess(user);
                res.json(response.status, response.body);
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
                if (err) return res.json(500, { message: 'ERROR', content: err });
                var response = retVal == null && model_1.Response.aError({ message: 'User not found' }) || model_1.Response.aSuccess();
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    deleteUser: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Delete user : " + id);
        mongo_connector_1.MongoUser.findByIdAndRemove(id, function (err, retVal) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = retVal == null && model_1.Response.aError({ message: 'User not found' }) || model_1.Response.aSuccess(retVal);
            res.json(response.status, response.body);
            res.end();
        });
    },
    emailExists: function (req, res) {
        logger_1.logger.debug("Find user bey email " + req.params.email);
        mongo_connector_1.MongoUser.find({ email: req.params.email }, function (err, users) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = users.length > 1 && model_1.Response.aSuccess({ found: true }) || model_1.Response.aSuccess({ found: false });
            res.json(response.status, response.body);
            res.end();
        });
    }
};
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUE2QixzQkFBN0IsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFDbkIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxzQkFBYjtBQUNBLDBCQUFBLFNBQUEsQ0FBVSxJQUFWLENBQWUsRUFBZixFQUFtQixVQUFVLEdBQVYsRUFBb0IsS0FBcEIsRUFBc0M7QUFDdkQsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsUUFBQSxRQUFBLENBQVMsUUFBVCxDQUFrQixLQUFsQixDQUF6QjtBQUNBLGdCQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FMRDtBQU1ELEtBVGtCO0FBVW5CLGNBQVUsVUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCO0FBQ3BDLFlBQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxNQUFwQjtBQUNBLGlCQUFBLE1BQUEsQ0FBTyxLQUFQLENBQWEsdUJBQXFCLEVBQWxDO0FBQ0EsMEJBQUEsU0FBQSxDQUFVLE9BQVYsQ0FBa0IsRUFBQyxLQUFLLEVBQU4sRUFBbEIsRUFBNkIsVUFBVSxHQUFWLEVBQW9CLElBQXBCLEVBQThCO0FBQ3pELGdCQUFJLFdBQXNCLE9BQVEsUUFBQSxRQUFBLENBQVMsTUFBVCxDQUFnQixHQUFoQixDQUFULElBQWtDLFFBQUEsUUFBQSxDQUFTLFFBQVQsQ0FBa0IsSUFBbEIsQ0FBM0Q7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RUFBb0IsS0FBcEIsRUFBc0M7QUFDOUUsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBc0IsTUFBTSxNQUFOLEdBQWUsQ0FBZixJQUFvQixRQUFBLFFBQUEsQ0FBUyxRQUFULENBQWtCLEVBQUMsT0FBTyxJQUFSLEVBQWxCLENBQXJCLElBQTBELFFBQUEsUUFBQSxDQUFTLFFBQVQsQ0FBa0IsRUFBQyxPQUFPLEtBQVIsRUFBbEIsQ0FBbkY7QUFDQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBTEQ7QUFNRDtBQWhFa0IsQ0FBckI7QUFtRVEsUUFBQSxjQUFBLEdBQWMsY0FBZCIsImZpbGUiOiJzZXJ2ZXIvYXBpL3VzZXIvdXNlci1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvVXNlcn0gZnJvbSBcIi4uLy4uL2JhY2tlbmQvbW9uZ28tY29ubmVjdG9yXCI7XG5pbXBvcnQge1VzZXIsIFJlc3BvbnNlfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvbW9kZWxcIjtcbmltcG9ydCB7bG9nZ2VyfSBmcm9tIFwiLi4vLi4vbG9nZ2VyXCI7XG5cbnZhciBVc2VyQ29udHJvbGxlciA9IHtcbiAgZmluZEFsbDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgUmV0cmlldmluZyBhbGwgdXNlcnNgKTtcbiAgICBNb25nb1VzZXIuZmluZCh7fSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyczogQXJyYXk8VXNlcj4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBSZXNwb25zZS5hU3VjY2Vzcyh1c2Vycyk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBmaW5kQnlJZDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGxldCBpZCA9IHJlcS5wYXJhbXMudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgU2VhcmNoIGZvciB1c2VyIDogJHtpZH1gKTtcbiAgICBNb25nb1VzZXIuZmluZE9uZSh7X2lkOiBpZH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgdXNlcjogVXNlcikge1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChlcnIgJiYgIFJlc3BvbnNlLmFFcnJvcihlcnIpKSB8fCBSZXNwb25zZS5hU3VjY2Vzcyh1c2VyKTtcbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBVc2VyID0gcmVxLmJvZHk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRlIHVzZXI6ICR7Ym9keX1gKTtcbiAgICAgIGJvZHkuZGVhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgIGxldCBtb25nb1VzZXIgPSBuZXcgTW9uZ29Vc2VyKGJvZHkpO1xuICAgICAgbW9uZ29Vc2VyLnNhdmUoZnVuY3Rpb24gKGVycjogYW55LCB1c2VyOiBVc2VyKSB7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAoZXJyICYmIFJlc3BvbnNlLmFFcnJvcihlcnIpKSB8fCBSZXNwb25zZS5hU3VjY2Vzcyh1c2VyKTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBVc2VyID0gcmVxLmJvZHk7XG4gICAgdmFyIGlkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBVcGRhdGUgdXNlciA6ICR7aWR9YCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIE1vbmdvVXNlci5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyRzZXQ6IGJvZHl9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogVXNlcikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgUmVzcG9uc2UuYUVycm9yKHttZXNzYWdlOiAnVXNlciBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKCk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVsZXRlVXNlcjogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgRGVsZXRlIHVzZXIgOiAke2lkfWApO1xuICAgIE1vbmdvVXNlci5maW5kQnlJZEFuZFJlbW92ZShpZCwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IFVzZXIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgUmVzcG9uc2UuYUVycm9yKHttZXNzYWdlOiAnVXNlciBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKHJldFZhbCk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBlbWFpbEV4aXN0cyhyZXE6IGFueSwgcmVzOiBhbnkpe1xuICAgIGxvZ2dlci5kZWJ1ZyhgRmluZCB1c2VyIGJleSBlbWFpbCAke3JlcS5wYXJhbXMuZW1haWx9YCk7XG4gICAgTW9uZ29Vc2VyLmZpbmQoe2VtYWlsOiByZXEucGFyYW1zLmVtYWlsfSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyczogQXJyYXk8VXNlcj4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAodXNlcnMubGVuZ3RoID4gMSAmJiBSZXNwb25zZS5hU3VjY2Vzcyh7Zm91bmQ6IHRydWV9KSkgfHwgUmVzcG9uc2UuYVN1Y2Nlc3Moe2ZvdW5kOiBmYWxzZX0pO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtVc2VyQ29udHJvbGxlcn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
