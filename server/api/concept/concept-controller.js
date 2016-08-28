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
            var response = model_1.Response.aSuccess(concepts);
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
            var response = retVal == null && model_1.Response.aError({ message: 'mind-flow not found' }) || model_1.Response.aSuccess(retVal);
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
                var response = retVal == null && model_1.Response.aError({ message: 'concept not found' }) || model_1.Response.aSuccess();
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    addStep: function (req, res) {
        var body = req.body;
        var id = req.params.conceptId;
        logger_1.logger.debug("AddRootStep to concept: " + id);
        if (body) {
            mongo_connector_1.MongoConcept.findOne({ _id: id }, function (err, concept) {
                if (concept) {
                    concept.rootSteps.push(body);
                    mongo_connector_1.MongoConcept.findByIdAndUpdate(id, { $set: concept }, function (err, retVal) {
                        if (err) return res.json(500, { message: 'ERROR', content: err });
                        var response = retVal == null && new model_1.Response(500, {
                            message: 'concept not found',
                            content: {}
                        }) || new model_1.Response(200, { message: 'added root step to concept', content: {} });
                        res.json(response.status, response.body);
                        res.end();
                    });
                } else {
                    var response = new model_1.Response(500, {
                        message: 'concept not found',
                        content: {}
                    });
                    res.json(response.status, response.body);
                    res.end();
                }
            });
        }
    },
    deleteStep: function (req, res) {
        var body = req.body;
        var id = req.params.conceptId;
        logger_1.logger.debug("Remove RootStep from Concept: " + id);
        if (body) {
            mongo_connector_1.MongoConcept.findOne({ _id: id }, function (err, concept) {
                if (concept) {
                    for (var idx = 0; idx < concept.rootSteps.length; idx++) {
                        if (concept.rootSteps[idx].concern === body.concern) {
                            var step = concept.rootSteps.splice(idx);
                            logger_1.logger.debug("Removing " + step);
                            mongo_connector_1.MongoConcept.findByIdAndUpdate(id, { $set: concept }, function (err, retVal) {
                                return defaultUpdate(res, err, retVal);
                            });
                        }
                    }
                }
            });
        } else {
            var response = model_1.Response.aError({ message: 'concept not found' });
            res.json(response.status, response.body);
            res.end();
        }
    }
};
exports.ConceptController = ConceptController;
//---------------------privates----------------------------
function defaultUpdate(res, err, retVal) {
    if (err) return res.json(500, { message: 'ERROR', content: err });
    var response = retVal == null && new model_1.Response(500, {
        message: 'item not found',
        content: {}
    }) || new model_1.Response(200, { message: 'updated', content: {} });
    res.json(response.status, response.body);
    res.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvY29uY2VwdC9jb25jZXB0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUEyQiwrQkFBM0IsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUEwQyxzQkFBMUMsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxvQkFBb0I7QUFDdEIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsWUFBSSxTQUFTLElBQUksS0FBSixDQUFVLE1BQXZCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxrQ0FBZ0MsTUFBN0M7QUFDQSwwQkFBQSxZQUFBLENBQWEsSUFBYixDQUFrQixFQUFDLFFBQVEsTUFBVCxFQUFsQixFQUFvQyxVQUFVLEdBQVYsRUFBb0IsUUFBcEIsRUFBNEM7QUFDOUUsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsUUFBQSxRQUFBLENBQVMsUUFBVCxDQUFrQixRQUFsQixDQUF6QjtBQUNBLGdCQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxnQkFBSSxHQUFKO0FBQ0QsU0FMRDtBQU1ELEtBVnFCO0FBV3RCLFlBQVEsVUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCO0FBQ2xDLFlBQUksT0FBZ0IsSUFBSSxJQUF4QjtBQUNBLFlBQUksSUFBSixFQUFVO0FBQ1IscUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxxQkFBbUIsSUFBaEM7QUFDQSxnQkFBSSxlQUFlLElBQUksa0JBQUEsWUFBSixDQUFpQixJQUFqQixDQUFuQjtBQUNBLHlCQUFhLElBQWIsQ0FBa0IsVUFBVSxHQUFWLEVBQW9CLE9BQXBCLEVBQW9DO0FBQ3BELG9CQUFJLFdB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ekI7QUFDQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNEO0FBQ0Y7QUEvR3FCLENBQXhCO0FBa0hRLFFBQUEsaUJBQUEsR0FBaUIsaUJBQWpCO0FBRVI7QUFFQSxTQUFBLGFBQUEsQ0FBdUIsR0FBdkIsRUFBaUMsR0FBakMsRUFBMkMsTUFBM0MsRUFBc0Q7QUFDcEQsUUFBSSxHQUFKLEVBQVMsT0FBTyxJQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsRUFBQyxTQUFTLE9BQVYsRUFBbUIsU0FBUyxHQUE1QixFQUFkLENBQVA7QUFDVCxRQUFJLFdBQXNCLFVBQVUsSUFBVixJQUFrQixJQUFJLFFBQUEsUUFBSixDQUFhLEdBQWIsRUFBa0I7QUFDMUQsaUJBQVMsZ0JBRGlEO0FBRTFELGlCQUFTO0FBRmlELEtBQWxCLENBQW5CLElBR2hCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQixFQUFDLFNBQVMsU0FBVixFQUFxQixTQUFTLEVBQTlCLEVBQWxCLENBSFQ7QUFJQSxRQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxRQUFJLEdBQUo7QUFDRCIsImZpbGUiOiJzZXJ2ZXIvYXBpL2NvbmNlcHQvY29uY2VwdC1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvQ29uY2VwdH0gZnJvbSBcIi4uLy4uL2JhY2tlbmQvbW9uZ28tY29ubmVjdG9yXCI7XG5pbXBvcnQge0NvbmNlcHQsIFJlc3BvbnNlLCBGbG93U3RlcH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsL21vZGVsXCI7XG5pbXBvcnQge2xvZ2dlcn0gZnJvbSBcIi4uLy4uL2xvZ2dlclwiO1xuXG52YXIgQ29uY2VwdENvbnRyb2xsZXIgPSB7XG4gIGZpbmRBbGw6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICBsZXQgdXNlcklkID0gcmVxLnF1ZXJ5LnVzZXJJZDtcbiAgICBsb2dnZXIuZGVidWcoYEZpbmQgQWxsIGNvbmNlcHRzIGZvciB1c2VyIDogJHt1c2VySWR9YCk7XG4gICAgTW9uZ29Db25jZXB0LmZpbmQoe3VzZXJJZDogdXNlcklkfSwgZnVuY3Rpb24gKGVycjogYW55LCBjb25jZXB0czogQXJyYXk8Q29uY2VwdD4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBSZXNwb25zZS5hU3VjY2Vzcyhjb25jZXB0cyk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQ29uY2VwdCA9IHJlcS5ib2R5O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYENyZWF0ZSBjb25jZXB0OiAke2JvZHl9YCk7XG4gICAgICBsZXQgbW9uZ29Db25jZXB0ID0gbmV3IE1vbmdvQ29uY2VwdChib2R5KTtcbiAgICAgIG1vbmdvQ29uY2VwdC5zYXZlKGZ1bmN0aW9uIChlcnI6IGFueSwgY29uY2VwdDogQ29uY2VwdCkge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRVJST1InLFxuICAgICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiBjb25jZXB0fSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZmluZEJ5SWQ6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLmNvbmNlcHRJZDtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmQgY29uY2VwdCBieSBJZDogJHtpZH1gKTtcbiAgICBNb25nb0NvbmNlcHQuZmluZE9uZSh7X2lkOiBpZH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgY29uY2VwdDogQ29uY2VwdCkge1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChlcnIgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgIG1lc3NhZ2U6ICdFUlJPUicsXG4gICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgIH0pKSB8fCBuZXcgUmVzcG9uc2UoMjAwLCB7bWVzc2FnZTogJ09LJywgY29udGVudDogY29uY2VwdH0pO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfSxcbiAgZGVsZXRlOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIGlkID0gcmVxLnBhcmFtcy5jb25jZXB0SWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBkZWxldGUgY29uY2VwdCBieSBJZDogJHtpZH1gKTtcbiAgICBNb25nb0NvbmNlcHQuZmluZEJ5SWRBbmRSZW1vdmUoaWQsIGZ1bmN0aW9uIChlcnI6IGFueSwgcmV0VmFsOiBDb25jZXB0KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHJldFZhbCA9PSBudWxsICYmIFJlc3BvbnNlLmFFcnJvcih7bWVzc2FnZTogJ21pbmQtZmxvdyBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKHJldFZhbCk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQ29uY2VwdCA9IHJlcS5ib2R5O1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgVXBkYXRlIGNvbmNlcHQgYnkgSWQ6ICR7aWR9YCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIE1vbmdvQ29uY2VwdC5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyRzZXQ6IGJvZHl9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogQ29uY2VwdCkge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgUmVzcG9uc2UuYUVycm9yKHttZXNzYWdlOiAnY29uY2VwdCBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKCk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgYWRkU3RlcDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBGbG93U3RlcCA9IHJlcS5ib2R5O1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgQWRkUm9vdFN0ZXAgdG8gY29uY2VwdDogJHtpZH1gKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgTW9uZ29Db25jZXB0LmZpbmRPbmUoe19pZDogaWR9LCBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbmNlcHQ6IENvbmNlcHQpIHtcbiAgICAgICAgaWYgKGNvbmNlcHQpIHtcbiAgICAgICAgICBjb25jZXB0LnJvb3RTdGVwcy5wdXNoKGJvZHkpO1xuICAgICAgICAgIE1vbmdvQ29uY2VwdC5maW5kQnlJZEFuZFVwZGF0ZShpZCwgeyRzZXQ6IGNvbmNlcHR9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogQ29uY2VwdCkge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB7fVxuICAgICAgICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdhZGRlZCByb290IHN0ZXAgdG8gY29uY2VwdCcsIGNvbnRlbnQ6IHt9fSk7XG4gICAgICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnY29uY2VwdCBub3QgZm91bmQnLFxuICAgICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBkZWxldGVTdGVwOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIGJvZHk6IEZsb3dTdGVwID0gcmVxLmJvZHk7XG4gICAgdmFyIGlkID0gcmVxLnBhcmFtcy5jb25jZXB0SWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBSZW1vdmUgUm9vdFN0ZXAgZnJvbSBDb25jZXB0OiAke2lkfWApO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBNb25nb0NvbmNlcHQuZmluZE9uZSh7X2lkOiBpZH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgY29uY2VwdDogQ29uY2VwdCkge1xuICAgICAgICBpZiAoY29uY2VwdCkge1xuICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGNvbmNlcHQucm9vdFN0ZXBzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmIChjb25jZXB0LnJvb3RTdGVwc1tpZHhdLmNvbmNlcm4gPT09IGJvZHkuY29uY2Vybikge1xuICAgICAgICAgICAgICB2YXIgc3RlcCA9IGNvbmNlcHQucm9vdFN0ZXBzLnNwbGljZShpZHgpO1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFJlbW92aW5nICR7c3RlcH1gKTtcbiAgICAgICAgICAgICAgTW9uZ29Db25jZXB0LmZpbmRCeUlkQW5kVXBkYXRlKGlkLCB7JHNldDogY29uY2VwdH0sXG4gICAgICAgICAgICAgICAgKGVycjogYW55LCByZXRWYWw6IENvbmNlcHQpID0+IGRlZmF1bHRVcGRhdGUocmVzLCBlcnIsIHJldFZhbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IFJlc3BvbnNlLmFFcnJvcih7bWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJ30pO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7Q29uY2VwdENvbnRyb2xsZXJ9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpdmF0ZXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGRlZmF1bHRVcGRhdGUocmVzOiBhbnksIGVycjogYW55LCByZXRWYWw6IGFueSkge1xuICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgbWVzc2FnZTogJ2l0ZW0gbm90IGZvdW5kJyxcbiAgICAgIGNvbnRlbnQ6IHt9XG4gICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAndXBkYXRlZCcsIGNvbnRlbnQ6IHt9fSk7XG4gIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gIHJlcy5lbmQoKTtcbn1cblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
