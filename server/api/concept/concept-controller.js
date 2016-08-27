"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var model_1 = require("../../../model/model");
var logger_1 = require("../../logger");
var ConceptController = {
    findAll: function (req, res) {
        var userId = req.query.userId;
        logger_1.logger.debug("Find All concepts for user : " + userId);
        mongo_connector_1.MongoConcept.find({ userId: userId }, function (err, concepts) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = new model_1.Response(200, {
                message: 'OK',
                content: concepts
            });
            res.json(response.status, response.body);
            res.end();
        });
    },
    create: function (req, res) {
        var body = req.body;
        if (body) {
            logger_1.logger.debug("Create concept: " + body);
            var mongoConcept = new mongo_connector_1.MongoConcept(body);
            mongoConcept.save(function (err, concept) {
                var response = err && new model_1.Response(500, {
                    message: 'ERROR',
                    content: err
                }) || new model_1.Response(200, { message: 'OK', content: concept });
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    findById: function (req, res) {
        var id = req.params.conceptId;
        logger_1.logger.debug("find concept by Id: " + id);
        mongo_connector_1.MongoConcept.findOne({ _id: id }, function (err, concept) {
            var response = err && new model_1.Response(500, {
                message: 'ERROR',
                content: err
            }) || new model_1.Response(200, { message: 'OK', content: concept });
            res.json(response.status, response.body);
            res.end();
        });
    },
    delete: function (req, res) {
        var id = req.params.conceptId;
        logger_1.logger.debug("delete concept by Id: " + id);
        mongo_connector_1.MongoConcept.findByIdAndRemove(id, function (err, retVal) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = retVal == null && new model_1.Response(500, {
                message: 'concept not found',
                content: {}
            }) || new model_1.Response(200, { message: 'removed user', content: retVal });
            res.json(response.status, response.body);
            res.end();
        });
    },
    update: function (req, res) {
        var body = req.body;
        var id = req.params.conceptId;
        logger_1.logger.debug("Update concept by Id: " + id);
        if (body) {
            mongo_connector_1.MongoConcept.findByIdAndUpdate(id, { $set: body }, function (err, retVal) {
                if (err) return res.json(500, { message: 'ERROR', content: err });
                var response = retVal == null && new model_1.Response(500, {
                    message: 'concept not found',
                    content: {}
                }) || new model_1.Response(200, { message: 'updated concept', content: {} });
                res.json(response.status, response.body);
                res.end();
            });
        }
    }
};
exports.ConceptController = ConceptController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvY29uY2VwdC9jb25jZXB0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUEyQiwrQkFBM0IsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUFnQyxzQkFBaEMsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxvQkFBb0I7QUFDdEIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsWUFBSSxTQUFTLElBQUksS0FBSixDQUFVLE1BQXZCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxrQ0FBZ0MsTUFBN0M7QUFDQSwwQkFBQSxZQUFBLENBQWEsSUFBYixDQUFrQixFQUFDLFFBQVEsTUFBVCxFQUFsQixFQUFvQyxVQUFVLEdBQVYsRUFBb0IsUUFBcEIsRUFBNEM7QUFDOUUsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCO0FBQ3ZDLHlCQUFTLElBRDhCO0FBRXZDLHlCQUFTO0FBRjhCLGFBQWxCLENBQXpCO0FBS0EsZ0JBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLGdCQUFJLEdBQUo7QUFDRCxTQVREO0FBV0QsS0FmcUI7QUFnQnRCLFlBQVEsVUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCO0FBQ2xDLFlBQUksT0FBZ0IsSUFBSSxJQUF4QjtBQUNBLFlBQUksSUFBSixFQUFVO0FBQ1IscUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxxQkFBbUIsSUFBaEM7QUFDQSxnQkFBSSxlQUFlLElBQUksa0JBQUEsWUFBSixDQUFpQixJQUFqQixDQUFuQjtBQUNBLHlCQUFhLElBQWIsQ0FBa0Is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QVM7QUFGaUQsaUJBQWxCLENBQW5CLElBR2hCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQixFQUFDLFNBQVMsaUJBQVYsRUFBNkIsU0FBUyxFQUF0QyxFQUFsQixDQUhUO0FBSUEsb0JBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLG9CQUFJLEdBQUo7QUFDRCxhQVJEO0FBU0Q7QUFDRjtBQXhFcUIsQ0FBeEI7QUE2RVEsUUFBQSxpQkFBQSxHQUFpQixpQkFBakIiLCJmaWxlIjoic2VydmVyL2FwaS9jb25jZXB0L2NvbmNlcHQtY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtNb25nb0NvbmNlcHR9IGZyb20gXCIuLi8uLi9iYWNrZW5kL21vbmdvLWNvbm5lY3RvclwiO1xuaW1wb3J0IHtDb25jZXB0LCBSZXNwb25zZX0gZnJvbSBcIi4uLy4uLy4uL21vZGVsL21vZGVsXCI7XG5pbXBvcnQge2xvZ2dlcn0gZnJvbSBcIi4uLy4uL2xvZ2dlclwiO1xuXG52YXIgQ29uY2VwdENvbnRyb2xsZXIgPSB7XG4gIGZpbmRBbGw6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICBsZXQgdXNlcklkID0gcmVxLnF1ZXJ5LnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYEZpbmQgQWxsIGNvbmNlcHRzIGZvciB1c2VyIDogJHt1c2VySWR9YCk7XG4gICAgTW9uZ29Db25jZXB0LmZpbmQoe3VzZXJJZDogdXNlcklkfSwgZnVuY3Rpb24gKGVycjogYW55LCBjb25jZXB0czogQXJyYXk8Q29uY2VwdD4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoMjAwLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ09LJyxcbiAgICAgICAgICBjb250ZW50OiBjb25jZXB0c1xuICAgICAgICB9KTtcblxuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcblxuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQ29uY2VwdCA9IHJlcS5ib2R5O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYENyZWF0ZSBjb25jZXB0OiAke2JvZHl9YCk7XG4gICAgICBsZXQgbW9uZ29Db25jZXB0ID0gbmV3IE1vbmdvQ29uY2VwdChib2R5KTtcbiAgICAgIG1vbmdvQ29uY2VwdC5zYXZlKGZ1bmN0aW9uIChlcnI6IGFueSwgY29uY2VwdDogQ29uY2VwdCkge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRVJST1InLFxuICAgICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiBjb25jZXB0fSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZmluZEJ5SWQ6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLmNvbmNlcHRJZDtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmQgY29uY2VwdCBieSBJZDogJHtpZH1gKTtcbiAgICBNb25nb0NvbmNlcHQuZmluZE9uZSh7X2lkOiBpZH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgY29uY2VwdDogQ29uY2VwdClcbiAgICB7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ0VSUk9SJyxcbiAgICAgICAgICBjb250ZW50OiBlcnJcbiAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiBjb25jZXB0fSk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBkZWxldGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLmNvbmNlcHRJZDtcbiAgICBsb2dnZXIuZGVidWcoYGRlbGV0ZSBjb25jZXB0IGJ5IElkOiAke2lkfWApO1xuICAgIE1vbmdvQ29uY2VwdC5maW5kQnlJZEFuZFJlbW92ZShpZCwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IENvbmNlcHQpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgIG1lc3NhZ2U6ICdjb25jZXB0IG5vdCBmb3VuZCcsXG4gICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAncmVtb3ZlZCB1c2VyJywgY29udGVudDogcmV0VmFsfSk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQ29uY2VwdCA9IHJlcS5ib2R5O1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgVXBkYXRlIGNvbmNlcHQgYnkgSWQ6ICR7aWR9YCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIE1vbmdvQ29uY2VwdC5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyRzZXQ6IGJvZHl9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogQ29uY2VwdCkge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgICAgbWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHt9XG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAndXBkYXRlZCBjb25jZXB0JywgY29udGVudDoge319KTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG5cbn07XG5cbmV4cG9ydCB7Q29uY2VwdENvbnRyb2xsZXJ9Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
