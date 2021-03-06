"use strict";

var express = require('express');
var body_parser_1 = require('body-parser');
var user_controller_1 = require("./user-controller");
//noinspection TypeScriptValidateTypes
var router = express.Router().use(body_parser_1.json());
router.route('/').get(function (req, res) {
    return user_controller_1.UserController.findAll(req, res);
}).post(function (req, res) {
    return user_controller_1.UserController.create(req, res);
});
router.route('/:userId').get(function (req, res) {
    return user_controller_1.UserController.findById(req, res);
}).put(function (req, res) {
    return user_controller_1.UserController.update(req, res);
}).delete(function (req, res) {
    return user_controller_1.UserController.deleteUser(req, res);
});
router.route('/email/exists/:email').get(function (req, res) {
    return user_controller_1.UserController.emailExists(req, res);
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvdXNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFPLFVBQU8sUUFBVyxTQUFYLENBQWQ7QUFDQSxJQUFBLGdCQUFBLFFBQW1CLGFBQW5CLENBQUE7QUFDQSxJQUFBLG9CQUFBLFFBQTZCLG1CQUE3QixDQUFBO0FBRUE7QUFDQSxJQUFJLFNBQVMsUUFBUSxNQUFSLEdBQ1YsR0FEVSxDQUNOLGNBQUEsSUFBQSxFQURNLENBQWI7QUFHQSxPQUFPLEtBQVAsQ0FBYSxHQUFiLEVBQ0csR0FESCxDQUNRLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBUztBQUFLLFdBQUEsa0JBQUEsY0FBQSxDQUFlLE9BQWYsQ0FBdUIsR0FBdkIsRUFBNEIsR0FBNUIsQ0FBQTtBQUFnQyxDQUR0RCxFQUVHLElBRkgsQ0FFUSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLGtCQUFBLGNBQUEsQ0FBZSxNQUFmLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLENBQUE7QUFBK0IsQ0FGckQ7QUFJQSxPQUFPLEtBQVAsQ0FBYSxVQUFiLEVBQ0csR0FESCxDQUNRLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBUztBQUFLLFdBQUEsa0JBQUEsY0FBQSxDQUFlLFFBQWYsQ0FBd0IsR0FBeEIsRUFBNkIsR0FBN0IsQ0FBQTtBQUFpQyxDQUR2RCxFQUVHLEdBRkgsQ0FFUSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLGtCQUFBLGNBQUEsQ0FBZSxNQUFmLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLENBQUE7QUFBK0IsQ0FGckQsRUFHRyxNQUhILENBR1csVUFBQyxHQUFELEVBQU0sR0FBTixFQUFTO0FBQUssV0FBQSxrQkFBQSxjQUFBLENBQWUsVUFBZixDQUEwQixHQUExQixFQUErQixHQUEvQixDQUFBO0FBQW1DLENBSDVEO0FBS0EsT0FBTyxLQUFQLENBQWEsc0JBQWIsRUFDRyxHQURILENBQ1EsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFTO0FBQUssV0FBQSxrQkFBQSxjQUFBLENBQWUsV0FBZixDQUEyQixHQUEzQixFQUFnQyxHQUFoQyxDQUFBO0FBQW9DLENBRDFEO0FBSUEsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6InNlcnZlci9hcGkvdXNlci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQge2pzb259IGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCB7VXNlckNvbnRyb2xsZXJ9IGZyb20gXCIuL3VzZXItY29udHJvbGxlclwiXG5cbi8vbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZVR5cGVzXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKVxuICAudXNlKGpzb24oKSk7XG5cbnJvdXRlci5yb3V0ZSgnLycpXG4gIC5nZXQoIChyZXEsIHJlcykgPT4gVXNlckNvbnRyb2xsZXIuZmluZEFsbChyZXEsIHJlcykgKVxuICAucG9zdCgocmVxLCByZXMpID0+IFVzZXJDb250cm9sbGVyLmNyZWF0ZShyZXEsIHJlcykpO1xuXG5yb3V0ZXIucm91dGUoJy86dXNlcklkJylcbiAgLmdldCggKHJlcSwgcmVzKSA9PiBVc2VyQ29udHJvbGxlci5maW5kQnlJZChyZXEsIHJlcykgKVxuICAucHV0KCAocmVxLCByZXMpID0+IFVzZXJDb250cm9sbGVyLnVwZGF0ZShyZXEsIHJlcykgKVxuICAuZGVsZXRlKCAocmVxLCByZXMpID0+IFVzZXJDb250cm9sbGVyLmRlbGV0ZVVzZXIocmVxLCByZXMpIClcbjtcbnJvdXRlci5yb3V0ZSgnL2VtYWlsL2V4aXN0cy86ZW1haWwnKVxuICAuZ2V0KCAocmVxLCByZXMpID0+IFVzZXJDb250cm9sbGVyLmVtYWlsRXhpc3RzKHJlcSwgcmVzKSApXG47XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
