"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var model_1 = require("../../../model/model");
var logger_1 = require("../../logger");
var UserController = {
    findAll: function (req, res) {
        logger_1.logger.debug("Retrieving all users");
        mongo_connector_1.MongoUser.find({}, function (err, users) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = new model_1.Response(200, { message: 'OK', content: users });
            res.json(response.status, response.body);
            res.end();
        });
    },
    findById: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Search for user : " + id);
        mongo_connector_1.MongoUser.findOne({ _id: id }, function (err, user) {
            var response = err && new model_1.Response(500, {
                message: 'ERROR',
                content: err
            }) || new model_1.Response(200, { message: 'OK', content: user });
            res.json(response.status, response.body);
            res.end();
        });
    },
    create: function (req, res) {
        var body = req.body;
        if (body) {
            logger_1.logger.debug("Create user: " + body);
            var user = new mongo_connector_1.MongoUser(body);
            user.save(function (err, user) {
                var response = err && new model_1.Response(500, {
                    message: 'ERROR',
                    content: err
                }) || new model_1.Response(200, { message: 'OK', content: user });
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
                var response = retVal == null && new model_1.Response(500, {
                    message: 'user not found',
                    content: {}
                }) || new model_1.Response(200, { message: 'updated user', content: {} });
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    delete: function (req, res) {
        var id = req.params.userId;
        logger_1.logger.debug("Delete user : " + id);
        mongo_connector_1.MongoUser.findByIdAndRemove(id, function (err, retVal) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = retVal == null && new model_1.Response(500, {
                message: 'user not found',
                content: {}
            }) || new model_1.Response(200, { message: 'removed user', content: retVal });
            res.json(response.status, response.body);
            res.end();
        });
    },
    emailExists: function (req, res) {
        logger_1.logger.debug("Find user bey email " + req.params.email);
        mongo_connector_1.MongoUser.find({ email: req.params.email }, function (err, users) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = users.length > 1 && new model_1.Response(200, {
                message: '1',
                content: {}
            }) || new model_1.Response(200, { message: '0', content: {} });
            res.json(response.status, response.body);
            res.end();
        });
    }
};
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUE2QixzQkFBN0IsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFDbkIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxzQkFBYjtBQUNBLDBCQUFBLFNBQUEsQ0FBVSxJQUFWLENBQWUsRUFBZixFQUFtQixVQUFVLEdBQVYsRUFBb0IsS0FBcEIsRUFBc0M7QUFDdkQsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFNBQVMsS0FBekIsRUFBbEIsQ0FBekI7QUFDQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBTEQ7QUFNRCxLQVRrQjtBQVVuQixjQUFVLFVBQVUsR0FBVixFQUFvQixHQUFwQixFQUE0QjtBQUNwQyxZQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsTUFBcEI7QUFDQSxpQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLHVCQUFxQixFQUFsQztBQUNBLDBCQUFBLFNBQUEsQ0FBVSxPQUFWLENBQWtCLEVBQUMsS0FBSyxFQUFOLEVBQWxCLEVBQTZCLFVBQVUsR0FBVixFQUFvQixJQUFwQixFQUE4QjtBQUN6RCxnQkFBSSxXQUFzQixPQUFPLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQjtBQUMvQyx5QkFBUyxP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VixFQUEwQixTQUFTLE1BQW5DLEVBQWxCLENBSFQ7QUFJQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBUkQ7QUFTRCxLQWxFa0I7QUFtRW5CLGlCQUFXLFVBQUMsR0FBRCxFQUFXLEdBQVgsRUFBbUI7QUFDNUIsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSx5QkFBdUIsSUFBSSxNQUFKLENBQVcsS0FBL0M7QUFDQSwwQkFBQSxTQUFBLENBQVUsSUFBVixDQUFlLEVBQUMsT0FBTyxJQUFJLE1BQUosQ0FBVyxLQUFuQixFQUFmLEVBQTBDLFVBQVUsR0FBVixFQUFvQixLQUFwQixFQUFzQztBQUM5RSxnQkFBSSxHQUFKLEVBQVMsT0FBTyxJQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsRUFBQyxTQUFTLE9BQVYsRUFBbUIsU0FBUyxHQUE1QixFQUFkLENBQVA7QUFDVCxnQkFBSSxXQUFzQixNQUFNLE1BQU4sR0FBZSxDQUFmLElBQW9CLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQjtBQUM1RCx5QkFBUyxHQURtRDtBQUU1RCx5QkFBUztBQUZtRCxhQUFsQixDQUFyQixJQUdoQixJQUFJLFFBQUEsUUFBSixDQUFhLEdBQWIsRUFBa0IsRUFBQyxTQUFTLEdBQVYsRUFBZSxTQUFTLEVBQXhCLEVBQWxCLENBSFQ7QUFLQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBVEQ7QUFVRDtBQS9Fa0IsQ0FBckI7QUFrRlEsUUFBQSxjQUFBLEdBQWMsY0FBZCIsImZpbGUiOiJzZXJ2ZXIvYXBpL3VzZXIvdXNlci1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvVXNlcn0gZnJvbSBcIi4uLy4uL2JhY2tlbmQvbW9uZ28tY29ubmVjdG9yXCI7XG5pbXBvcnQge1VzZXIsIFJlc3BvbnNlfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvbW9kZWxcIjtcbmltcG9ydCB7bG9nZ2VyfSBmcm9tIFwiLi4vLi4vbG9nZ2VyXCI7XG5cbnZhciBVc2VyQ29udHJvbGxlciA9IHtcbiAgZmluZEFsbDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgUmV0cmlldmluZyBhbGwgdXNlcnNgKTtcbiAgICBNb25nb1VzZXIuZmluZCh7fSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyczogQXJyYXk8VXNlcj4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoMjAwLCB7bWVzc2FnZTogJ09LJywgY29udGVudDogdXNlcnN9KTtcbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH0sXG4gIGZpbmRCeUlkOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgbGV0IGlkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBTZWFyY2ggZm9yIHVzZXIgOiAke2lkfWApO1xuICAgIE1vbmdvVXNlci5maW5kT25lKHtfaWQ6IGlkfSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyOiBVc2VyKSB7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ0VSUk9SJyxcbiAgICAgICAgICBjb250ZW50OiBlcnJcbiAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiB1c2VyfSk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogVXNlciA9IHJlcS5ib2R5O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYENyZWF0ZSB1c2VyOiAke2JvZHl9YCk7XG4gICAgICBsZXQgdXNlciA9IG5ldyBNb25nb1VzZXIoYm9keSk7XG4gICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycjogYW55LCB1c2VyOiBVc2VyKSB7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAoZXJyICYmIG5ldyBSZXNwb25zZSg1MDAsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFUlJPUicsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJcbiAgICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdPSycsIGNvbnRlbnQ6IHVzZXJ9KTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBVc2VyID0gcmVxLmJvZHk7XG4gICAgdmFyIGlkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBVcGRhdGUgdXNlciA6ICR7aWR9YCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIE1vbmdvVXNlci5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyRzZXQ6IGJvZHl9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogVXNlcikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgICAgbWVzc2FnZTogJ3VzZXIgbm90IGZvdW5kJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHt9XG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAndXBkYXRlZCB1c2VyJywgY29udGVudDoge319KTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBkZWxldGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYERlbGV0ZSB1c2VyIDogJHtpZH1gKTtcbiAgICBNb25nb1VzZXIuZmluZEJ5SWRBbmRSZW1vdmUoaWQsIGZ1bmN0aW9uIChlcnI6IGFueSwgcmV0VmFsOiBVc2VyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHJldFZhbCA9PSBudWxsICYmIG5ldyBSZXNwb25zZSg1MDAsIHtcbiAgICAgICAgICBtZXNzYWdlOiAndXNlciBub3QgZm91bmQnLFxuICAgICAgICAgIGNvbnRlbnQ6IHt9XG4gICAgICAgIH0pKSB8fCBuZXcgUmVzcG9uc2UoMjAwLCB7bWVzc2FnZTogJ3JlbW92ZWQgdXNlcicsIGNvbnRlbnQ6IHJldFZhbH0pO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfSxcbiAgZW1haWxFeGlzdHMocmVxOiBhbnksIHJlczogYW55KXtcbiAgICBsb2dnZXIuZGVidWcoYEZpbmQgdXNlciBiZXkgZW1haWwgJHtyZXEucGFyYW1zLmVtYWlsfWApO1xuICAgIE1vbmdvVXNlci5maW5kKHtlbWFpbDogcmVxLnBhcmFtcy5lbWFpbH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgdXNlcnM6IEFycmF5PFVzZXI+KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHVzZXJzLmxlbmd0aCA+IDEgJiYgbmV3IFJlc3BvbnNlKDIwMCwge1xuICAgICAgICAgIG1lc3NhZ2U6ICcxJyxcbiAgICAgICAgICBjb250ZW50OiB7fVxuICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICcwJywgY29udGVudDoge319KTtcblxuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtVc2VyQ29udHJvbGxlcn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
