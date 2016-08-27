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
        var body = req.body;
        var id = req.params.userId;
        logger_1.logger.debug("Delete user : " + id);
        if (body) {
            mongo_connector_1.MongoUser.findByIdAndRemove(id, function (err, retVal) {
                if (err) return res.json(500, { message: 'ERROR', content: err });
                var response = retVal == null && new model_1.Response(500, {
                    message: 'user not found',
                    content: {}
                }) || new model_1.Response(200, { message: 'removed user', content: retVal });
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    emailExists: function (req, res) {
        console.log(req.params.email);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUF3QiwrQkFBeEIsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUE2QixzQkFBN0IsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxpQkFBaUI7QUFDbkIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxzQkFBYjtBQUNBLDBCQUFBLFNBQUEsQ0FBVSxJQUFWLENBQWUsRUFBZixFQUFtQixVQUFTLEdBQVQsRUFBbUIsS0FBbkIsRUFBcUM7QUFDdEQsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFNBQVMsS0FBekIsRUFBbEIsQ0FBekI7QUFDQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBTEQ7QUFNRCxLQVRrQjtBQVVuQixjQUFVLFVBQVUsR0FBVixFQUFvQixHQUFwQixFQUE0QjtBQUNwQyxZQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsTUFBcEI7QUFDQSxpQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLHVCQUFxQixFQUFsQztBQUNBLDBCQUFBLFNBQUEsQ0FBVSxPQUFWLENBQWtCLEVBQUMsS0FBSyxFQUFOLEVBQWxCLEVBQTZCLFVBQVUsR0FBVixFQUFvQixJQUFwQixFQUE4QjtBQUN6RCxnQkFBSSxXQUFzQixPQUFPLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQjtBQUMvQyx5QkFBUyxP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aEIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCLEVBQUMsU0FBUyxjQUFWLEVBQTBCLFNBQVMsTUFBbkMsRUFBbEIsQ0FIVDtBQUlBLG9CQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxvQkFBSSxHQUFKO0FBQ0QsYUFSRDtBQVNEO0FBQ0YsS0FyRWtCO0FBc0VuQixpQkFBVyxVQUFDLEdBQUQsRUFBVyxHQUFYLEVBQW1CO0FBQzVCLGdCQUFRLEdBQVIsQ0FBWSxJQUFJLE1BQUosQ0FBVyxLQUF2QjtBQUNBLDBCQUFBLFNBQUEsQ0FBVSxJQUFWLENBQWUsRUFBQyxPQUFPLElBQUksTUFBSixDQUFXLEtBQW5CLEVBQWYsRUFBMEMsVUFBVSxHQUFWLEVBQW9CLEtBQXBCLEVBQXNDO0FBQzlFLGdCQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULGdCQUFJLFdBQXNCLE1BQU0sTUFBTixHQUFlLENBQWYsSUFBb0IsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCO0FBQzVELHlCQUFTLEdBRG1EO0FBRTVELHlCQUFTO0FBRm1ELGFBQWxCLENBQXJCLElBR2hCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQixFQUFDLFNBQVMsR0FBVixFQUFlLFNBQVMsRUFBeEIsRUFBbEIsQ0FIVDtBQUtBLGdCQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FURDtBQVVEO0FBbEZrQixDQUFyQjtBQXFGUSxRQUFBLGNBQUEsR0FBYyxjQUFkIiwiZmlsZSI6InNlcnZlci9hcGkvdXNlci91c2VyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7TW9uZ29Vc2VyfSBmcm9tIFwiLi4vLi4vYmFja2VuZC9tb25nby1jb25uZWN0b3JcIjtcbmltcG9ydCB7VXNlciwgUmVzcG9uc2V9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9tb2RlbFwiO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuLi8uLi9sb2dnZXJcIjtcblxudmFyIFVzZXJDb250cm9sbGVyID0ge1xuICBmaW5kQWxsOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBSZXRyaWV2aW5nIGFsbCB1c2Vyc2ApO1xuICAgIE1vbmdvVXNlci5maW5kKHt9LCBmdW5jdGlvbihlcnI6IGFueSwgdXNlcnM6IEFycmF5PFVzZXI+KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdPSycsIGNvbnRlbnQ6IHVzZXJzfSk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBmaW5kQnlJZDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGxldCBpZCA9IHJlcS5wYXJhbXMudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgU2VhcmNoIGZvciB1c2VyIDogJHtpZH1gKTtcbiAgICBNb25nb1VzZXIuZmluZE9uZSh7X2lkOiBpZH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgdXNlcjogVXNlcikge1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChlcnIgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgIG1lc3NhZ2U6ICdFUlJPUicsXG4gICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgIH0pKSB8fCBuZXcgUmVzcG9uc2UoMjAwLCB7bWVzc2FnZTogJ09LJywgY29udGVudDogdXNlcn0pO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIGJvZHk6IFVzZXIgPSByZXEuYm9keTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGUgdXNlcjogJHtib2R5fWApO1xuICAgICAgbGV0IHVzZXIgPSBuZXcgTW9uZ29Vc2VyKGJvZHkpO1xuICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnI6IGFueSwgdXNlcjogVXNlcikge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRVJST1InLFxuICAgICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiB1c2VyfSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogVXNlciA9IHJlcS5ib2R5O1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgVXBkYXRlIHVzZXIgOiAke2lkfWApO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBNb25nb1VzZXIuZmluZEJ5SWRBbmRVcGRhdGUoaWQsIHskc2V0OiBib2R5fSwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IFVzZXIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHJldFZhbCA9PSBudWxsICYmIG5ldyBSZXNwb25zZSg1MDAsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICd1c2VyIG5vdCBmb3VuZCcsXG4gICAgICAgICAgICBjb250ZW50OiB7fVxuICAgICAgICAgIH0pKSB8fCBuZXcgUmVzcG9uc2UoMjAwLCB7bWVzc2FnZTogJ3VwZGF0ZWQgdXNlcicsIGNvbnRlbnQ6IHt9fSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVsZXRlOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIGJvZHk6IFVzZXIgPSByZXEuYm9keTtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYERlbGV0ZSB1c2VyIDogJHtpZH1gKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgTW9uZ29Vc2VyLmZpbmRCeUlkQW5kUmVtb3ZlKGlkLCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogVXNlcikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgICAgbWVzc2FnZTogJ3VzZXIgbm90IGZvdW5kJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHt9XG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAncmVtb3ZlZCB1c2VyJywgY29udGVudDogcmV0VmFsfSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZW1haWxFeGlzdHMocmVxOiBhbnksIHJlczogYW55KXtcbiAgICBjb25zb2xlLmxvZyhyZXEucGFyYW1zLmVtYWlsKTtcbiAgICBNb25nb1VzZXIuZmluZCh7ZW1haWw6IHJlcS5wYXJhbXMuZW1haWx9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHVzZXJzOiBBcnJheTxVc2VyPikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9ICh1c2Vycy5sZW5ndGggPiAxICYmIG5ldyBSZXNwb25zZSgyMDAsIHtcbiAgICAgICAgICBtZXNzYWdlOiAnMScsXG4gICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnMCcsIGNvbnRlbnQ6IHt9fSk7XG5cbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7VXNlckNvbnRyb2xsZXJ9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
