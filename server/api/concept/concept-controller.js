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
            var response = new model_1.Response(500, {
                message: 'concept not found',
                content: {}
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvY29uY2VwdC9jb25jZXB0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBQSxvQkFBQSxRQUEwQywrQkFBMUMsQ0FBQTtBQUNBLElBQUEsVUFBQSxRQUEwQyxzQkFBMUMsQ0FBQTtBQUNBLElBQUEsV0FBQSxRQUFxQixjQUFyQixDQUFBO0FBRUEsSUFBSSxvQkFBb0I7QUFDdEIsYUFBUyxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDbkMsWUFBSSxTQUFTLElBQUksS0FBSixDQUFVLE1BQXZCO0FBQ0EsaUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxrQ0FBZ0MsTUFBN0M7QUFDQSwwQkFBQSxZQUFBLENBQWEsSUFBYixDQUFrQixFQUFDLFFBQVEsTUFBVCxFQUFsQixFQUFvQyxVQUFVLEdBQVYsRUFBb0IsUUFBcEIsRUFBNEM7QUFDOUUsZ0JBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQUMsU0FBUyxPQUFWLEVBQW1CLFNBQVMsR0FBNUIsRUFBZCxDQUFQO0FBQ1QsZ0JBQUksV0FBcUIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCO0FBQ3ZDLHlCQUFTLElBRDhCO0FBRXZDLHlCQUFTO0FBRjhCLGFBQWxCLENBQXpCO0FBS0EsZ0JBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLGdCQUFJLEdBQUo7QUFDRCxTQVREO0FBV0QsS0FmcUI7QUFnQnRCLFlBQVEsVUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCO0FBQ2xDLFlBQUksT0FBZ0IsSUFBSSxJQUF4QjtBQUNBLFlBQUksSUFBSixFQUFVO0FBQ1IscUJBQUEsTUFBQSxDQUFPLEtBQVAsQ0FBYSxxQkFBbUIsSUFBaEM7QUFDQSxnQkFBSSxlQUFlLElBQUksa0JBQUEsWUFBSixDQUFpQixJQUFqQixDQUFuQjtBQUNBLHlCQUFhLElBQWIsQ0FBa0Is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QVgsRUFBMEI7QUFBSyx1Q0FBQSxjQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsTUFBeEIsQ0FBQTtBQUErQiw2QkFEaEU7QUFFRDtBQUNGO0FBQ0Y7QUFDRixhQVhEO0FBWUQsU0FiRCxNQWFPO0FBQ0gsZ0JBQUksV0FBcUIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCO0FBQ3pDLHlCQUFTLG1CQURnQztBQUV6Qyx5QkFBUztBQUZnQyxhQUFsQixDQUF6QjtBQUlBLGdCQUFJLElBQUosQ0FBUyxTQUFTLE1BQWxCLEVBQTBCLFNBQVMsSUFBbkM7QUFDQSxnQkFBSSxHQUFKO0FBQ0Q7QUFDRjtBQS9IbUIsQ0FBeEI7QUFrSVEsUUFBQSxpQkFBQSxHQUFpQixpQkFBakI7QUFFUjtBQUVBLFNBQUEsYUFBQSxDQUF1QixHQUF2QixFQUFpQyxHQUFqQyxFQUEyQyxNQUEzQyxFQUFzRDtBQUNwRCxRQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULFFBQUksV0FBc0IsVUFBVSxJQUFWLElBQWtCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQjtBQUMxRCxpQkFBUyxnQkFEaUQ7QUFFMUQsaUJBQVM7QUFGaUQsS0FBbEIsQ0FBbkIsSUFHaEIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCLEVBQUMsU0FBUyxTQUFWLEVBQXFCLFNBQVMsRUFBOUIsRUFBbEIsQ0FIVDtBQUlBLFFBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLFFBQUksR0FBSjtBQUNEIiwiZmlsZSI6InNlcnZlci9hcGkvY29uY2VwdC9jb25jZXB0LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7TW9uZ29Db25jZXB0LCBNb25nb0Zsb3dTdGVwfSBmcm9tIFwiLi4vLi4vYmFja2VuZC9tb25nby1jb25uZWN0b3JcIjtcbmltcG9ydCB7Q29uY2VwdCwgUmVzcG9uc2UsIEZsb3dTdGVwfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvbW9kZWxcIjtcbmltcG9ydCB7bG9nZ2VyfSBmcm9tIFwiLi4vLi4vbG9nZ2VyXCI7XG5cbnZhciBDb25jZXB0Q29udHJvbGxlciA9IHtcbiAgZmluZEFsbDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGxldCB1c2VySWQgPSByZXEucXVlcnkudXNlcklkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgRmluZCBBbGwgY29uY2VwdHMgZm9yIHVzZXIgOiAke3VzZXJJZH1gKTtcbiAgICBNb25nb0NvbmNlcHQuZmluZCh7dXNlcklkOiB1c2VySWR9LCBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbmNlcHRzOiBBcnJheTxDb25jZXB0Pikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgyMDAsIHtcbiAgICAgICAgICBtZXNzYWdlOiAnT0snLFxuICAgICAgICAgIGNvbnRlbnQ6IGNvbmNlcHRzXG4gICAgICAgIH0pO1xuXG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBDb25jZXB0ID0gcmVxLmJvZHk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRlIGNvbmNlcHQ6ICR7Ym9keX1gKTtcbiAgICAgIGxldCBtb25nb0NvbmNlcHQgPSBuZXcgTW9uZ29Db25jZXB0KGJvZHkpO1xuICAgICAgbW9uZ29Db25jZXB0LnNhdmUoZnVuY3Rpb24gKGVycjogYW55LCBjb25jZXB0OiBDb25jZXB0KSB7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAoZXJyICYmIG5ldyBSZXNwb25zZSg1MDAsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFUlJPUicsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJcbiAgICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdPSycsIGNvbnRlbnQ6IGNvbmNlcHR9KTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBmaW5kQnlJZDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZCBjb25jZXB0IGJ5IElkOiAke2lkfWApO1xuICAgIE1vbmdvQ29uY2VwdC5maW5kT25lKHtfaWQ6IGlkfSwgZnVuY3Rpb24gKGVycjogYW55LCBjb25jZXB0OiBDb25jZXB0KVxuICAgIHtcbiAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAoZXJyICYmIG5ldyBSZXNwb25zZSg1MDAsIHtcbiAgICAgICAgICBtZXNzYWdlOiAnRVJST1InLFxuICAgICAgICAgIGNvbnRlbnQ6IGVyclxuICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdPSycsIGNvbnRlbnQ6IGNvbmNlcHR9KTtcbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH0sXG4gIGRlbGV0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgZGVsZXRlIGNvbmNlcHQgYnkgSWQ6ICR7aWR9YCk7XG4gICAgTW9uZ29Db25jZXB0LmZpbmRCeUlkQW5kUmVtb3ZlKGlkLCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogQ29uY2VwdCkge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJyxcbiAgICAgICAgICBjb250ZW50OiB7fVxuICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICdyZW1vdmVkIHVzZXInLCBjb250ZW50OiByZXRWYWx9KTtcbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBDb25jZXB0ID0gcmVxLmJvZHk7XG4gICAgdmFyIGlkID0gcmVxLnBhcmFtcy5jb25jZXB0SWQ7XG4gICAgbG9nZ2VyLmRlYnVnKGBVcGRhdGUgY29uY2VwdCBieSBJZDogJHtpZH1gKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgTW9uZ29Db25jZXB0LmZpbmRCeUlkQW5kVXBkYXRlKGlkLCB7JHNldDogYm9keX0sIGZ1bmN0aW9uIChlcnI6IGFueSwgcmV0VmFsOiBDb25jZXB0KSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnY29uY2VwdCBub3QgZm91bmQnLFxuICAgICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICd1cGRhdGVkIGNvbmNlcHQnLCBjb250ZW50OiB7fX0pO1xuICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGFkZFN0ZXA6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogRmxvd1N0ZXAgPSByZXEuYm9keTtcbiAgICB2YXIgaWQgPSByZXEucGFyYW1zLmNvbmNlcHRJZDtcbiAgICBsb2dnZXIuZGVidWcoYEFkZFJvb3RTdGVwIHRvIGNvbmNlcHQ6ICR7aWR9YCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIE1vbmdvQ29uY2VwdC5maW5kT25lKHtfaWQ6IGlkfSwgZnVuY3Rpb24gKGVycjogYW55LCBjb25jZXB0OiBDb25jZXB0KVxuICAgICAge1xuICAgICAgICBpZihjb25jZXB0KSB7XG4gICAgICAgICAgY29uY2VwdC5yb290U3RlcHMucHVzaChib2R5KTtcbiAgICAgICAgICBNb25nb0NvbmNlcHQuZmluZEJ5SWRBbmRVcGRhdGUoaWQsIHskc2V0OiBjb25jZXB0fSwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IENvbmNlcHQpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdjb25jZXB0IG5vdCBmb3VuZCcsXG4gICAgICAgICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnYWRkZWQgcm9vdCBzdGVwIHRvIGNvbmNlcHQnLCBjb250ZW50OiB7fX0pO1xuICAgICAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKDUwMCwge1xuICAgICAgICAgICAgbWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVsZXRlU3RlcDogZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIHZhciBib2R5OiBGbG93U3RlcCA9IHJlcS5ib2R5O1xuICAgIHZhciBpZCA9IHJlcS5wYXJhbXMuY29uY2VwdElkO1xuICAgIGxvZ2dlci5kZWJ1ZyhgUmVtb3ZlIFJvb3RTdGVwIGZyb20gQ29uY2VwdDogJHtpZH1gKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgTW9uZ29Db25jZXB0LmZpbmRPbmUoe19pZDogaWR9LCBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbmNlcHQ6IENvbmNlcHQpIHtcbiAgICAgICAgaWYgKGNvbmNlcHQpIHtcbiAgICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBjb25jZXB0LnJvb3RTdGVwcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBpZihjb25jZXB0LnJvb3RTdGVwc1tpZHhdLmNvbmNlcm4gPT09IGJvZHkuY29uY2Vybil7XG4gICAgICAgICAgICAgIHZhciBzdGVwID0gY29uY2VwdC5yb290U3RlcHMuc3BsaWNlKGlkeCk7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVtb3ZpbmcgJHtzdGVwfWApO1xuICAgICAgICAgICAgICBNb25nb0NvbmNlcHQuZmluZEJ5SWRBbmRVcGRhdGUoaWQsIHskc2V0OiBjb25jZXB0fSxcbiAgICAgICAgICAgICAgICAoZXJyOiBhbnksIHJldFZhbDogQ29uY2VwdCkgPT4gZGVmYXVsdFVwZGF0ZShyZXMsIGVyciwgcmV0VmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ2NvbmNlcHQgbm90IGZvdW5kJyxcbiAgICAgICAgICBjb250ZW50OiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCB7Q29uY2VwdENvbnRyb2xsZXJ9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpdmF0ZXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGRlZmF1bHRVcGRhdGUocmVzOiBhbnksIGVycjogYW55LCByZXRWYWw6IGFueSl7XG4gIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICBtZXNzYWdlOiAnaXRlbSBub3QgZm91bmQnLFxuICAgICAgY29udGVudDoge31cbiAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICd1cGRhdGVkJywgY29udGVudDoge319KTtcbiAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgcmVzLmVuZCgpO1xufVxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
