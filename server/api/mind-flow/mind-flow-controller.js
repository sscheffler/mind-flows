"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var model_1 = require("../../../model/model");
var logger_1 = require("../../logger");
var MindFlowController = {
    findAll: function (req, res) {
        var userId = req.query.userId;
        logger_1.logger.debug("Find All mind flows for user : " + userId);
        mongo_connector_1.MongoMindFlow.find({ userId: userId }, function (err, flows) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = model_1.Response.aSuccess(flows);
            res.json(response.status, response.body);
            res.end();
        });
    },
    create: function (req, res) {
        var body = req.body;
        logger_1.logger.debug("Create mind flow for user : " + body.userId);
        if (body) {
            var mongoMindFlow = new mongo_connector_1.MongoMindFlow(body);
            mongoMindFlow.save(function (err, flow) {
                var response = err && model_1.Response.aError(err) || model_1.Response.aSuccess(flow);
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    findFlow: function (req, res) {
        var flowId = req.params.flowId;
        logger_1.logger.debug("mind-flow: " + flowId);
        mongo_connector_1.MongoMindFlow.findOne({ _id: flowId }, function (err, flow) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = model_1.Response.aSuccess(flow);
            res.json(response.status, response.body);
            res.end();
        });
    },
    deleteFlow: function (req, res) {
        var flowId = req.params.flowId;
        logger_1.logger.debug("Delete mind-flow: " + flowId);
        mongo_connector_1.MongoMindFlow.findByIdAndRemove(flowId, function (err, retVal) {
            if (err) return res.json(500, { message: 'ERROR', content: err });
            var response = retVal == null && model_1.Response.aError({ message: 'mind-flow not found' }) || model_1.Response.aSuccess(retVal);
            res.json(response.status, response.body);
            res.end();
        });
    },
    updateFlow: function (req, res) {
        var flowId = req.params.flowId;
        var body = req.body;
        logger_1.logger.debug("Update mind-flow: " + flowId);
        if (body) {
            mongo_connector_1.MongoMindFlow.findByIdAndUpdate(flowId, { $set: body }, function (err, retVal) {
                if (err) return res.json(500, { message: 'ERROR', content: err });
                var response = retVal == null && model_1.Response.aError({ message: 'mind-flow not found' }) || model_1.Response.aSuccess();
                res.json(response.status, response.body);
                res.end();
            });
        }
    }
};
exports.MindFlowController = MindFlowController;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvbWluZC1mbG93L21pbmQtZmxvdy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUEsb0JBQUEsUUFBdUMsK0JBQXZDLENBQUE7QUFDQSxJQUFBLFVBQUEsUUFBdUMsc0JBQXZDLENBQUE7QUFDQSxJQUFBLFdBQUEsUUFBcUIsY0FBckIsQ0FBQTtBQUVBLElBQUkscUJBQXFCO0FBQ3ZCLGFBQVMsVUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCO0FBQ25DLFlBQUksU0FBUyxJQUFJLEtBQUosQ0FBVSxNQUF2QjtBQUNBLGlCQUFBLE1BQUEsQ0FBTyxLQUFQLENBQWEsb0NBQW9DLE1BQWpEO0FBQ0EsMEJBQUEsYUFBQSxDQUFjLElBQWQsQ0FBbUIsRUFBQyxRQUFRLE1BQVQsRUFBbkIsRUFBcUMsVUFBVSxHQUFWLEVBQW9CLEtBQXBCLEVBQTBDO0FBQzdFLGdCQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULGdCQUFJLFdBQXFCLFFBQUEsUUFBQSxDQUFTLFFBQVQsQ0FBa0IsS0FBbEIsQ0FBekI7QUFDQSxnQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsZ0JBQUksR0FBSjtBQUNELFNBTEQ7QUFNRCxLQVZzQjtBQVd2QixZQUFRLFVBQVUsR0FBVixFQUFvQixHQUFwQixFQUE0QjtBQUNsQyxZQUFJLE9BQWlCLElBQUksSUFBekI7QUFDQSxpQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLGlDQUFpQyxLQUFLLE1BQW5EO0FBQ0EsWUFBSSxJQUFKLEVBQVU7QUFDUixnQkFBSSxnQkFBZ0IsSUFBSSxrQkFBQSxhQUFKLENBQWtCLElBQWxCLENBQXBCO0FBQ0EsMEJBQWMsSUFBZCxDQUFtQixVQUFVLEdBQVYsRUFBb0IsSUFBcEIsRUFBa0M7QUFD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QyxNQUEzQyxFQUFzRDtBQUNwRCxRQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULFFBQUksV0FBc0IsVUFBVSxJQUFWLElBQWtCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQjtBQUMxRCxpQkFBUyxnQkFEaUQ7QUFFMUQsaUJBQVM7QUFGaUQsS0FBbEIsQ0FBbkIsSUFHaEIsSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCLEVBQUMsU0FBUyxTQUFWLEVBQXFCLFNBQVMsRUFBOUIsRUFBbEIsQ0FIVDtBQUlBLFFBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLFFBQUksR0FBSjtBQUNEIiwiZmlsZSI6InNlcnZlci9hcGkvbWluZC1mbG93L21pbmQtZmxvdy1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvVXNlciwgTW9uZ29NaW5kRmxvd30gZnJvbSBcIi4uLy4uL2JhY2tlbmQvbW9uZ28tY29ubmVjdG9yXCI7XG5pbXBvcnQge1Jlc3BvbnNlLCBVc2VyLCBNaW5kRmxvd30gZnJvbSBcIi4uLy4uLy4uL21vZGVsL21vZGVsXCI7XG5pbXBvcnQge2xvZ2dlcn0gZnJvbSBcIi4uLy4uL2xvZ2dlclwiO1xuXG52YXIgTWluZEZsb3dDb250cm9sbGVyID0ge1xuICBmaW5kQWxsOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIHVzZXJJZCA9IHJlcS5xdWVyeS51c2VySWQ7XG4gICAgbG9nZ2VyLmRlYnVnKFwiRmluZCBBbGwgbWluZCBmbG93cyBmb3IgdXNlciA6IFwiICsgdXNlcklkKTtcbiAgICBNb25nb01pbmRGbG93LmZpbmQoe3VzZXJJZDogdXNlcklkfSwgZnVuY3Rpb24gKGVycjogYW55LCBmbG93czogQXJyYXk8TWluZEZsb3c+KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gUmVzcG9uc2UuYVN1Y2Nlc3MoZmxvd3MpO1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgdmFyIGJvZHk6IE1pbmRGbG93ID0gcmVxLmJvZHk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiQ3JlYXRlIG1pbmQgZmxvdyBmb3IgdXNlciA6IFwiICsgYm9keS51c2VySWQpO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsZXQgbW9uZ29NaW5kRmxvdyA9IG5ldyBNb25nb01pbmRGbG93KGJvZHkpO1xuICAgICAgbW9uZ29NaW5kRmxvdy5zYXZlKGZ1bmN0aW9uIChlcnI6IGFueSwgZmxvdzogTWluZEZsb3cpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChlcnIgJiYgUmVzcG9uc2UuYUVycm9yKGVycikpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKGZsb3cpO1xuICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGZpbmRGbG93OiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgbGV0IGZsb3dJZCA9IHJlcS5wYXJhbXMuZmxvd0lkO1xuICAgIGxvZ2dlci5kZWJ1ZyhcIm1pbmQtZmxvdzogXCIgKyBmbG93SWQpO1xuICAgIE1vbmdvTWluZEZsb3cuZmluZE9uZSh7X2lkOiBmbG93SWR9LCBmdW5jdGlvbiAoZXJyOiBhbnksIGZsb3c6IE1pbmRGbG93KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gUmVzcG9uc2UuYVN1Y2Nlc3MoZmxvdyk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICBkZWxldGVGbG93OiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgbGV0IGZsb3dJZCA9IHJlcS5wYXJhbXMuZmxvd0lkO1xuICAgIGxvZ2dlci5kZWJ1ZyhcIkRlbGV0ZSBtaW5kLWZsb3c6IFwiICsgZmxvd0lkKTtcbiAgICBNb25nb01pbmRGbG93LmZpbmRCeUlkQW5kUmVtb3ZlKGZsb3dJZCwgZnVuY3Rpb24gKGVycjogYW55LCByZXRWYWw6IE1pbmRGbG93KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHJldFZhbCA9PSBudWxsICYmIFJlc3BvbnNlLmFFcnJvcih7bWVzc2FnZTogJ21pbmQtZmxvdyBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKHJldFZhbCk7XG4gICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGVGbG93OiBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgbGV0IGZsb3dJZCA9IHJlcS5wYXJhbXMuZmxvd0lkO1xuICAgIGxldCBib2R5ID0gcmVxLmJvZHk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiVXBkYXRlIG1pbmQtZmxvdzogXCIgKyBmbG93SWQpO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBNb25nb01pbmRGbG93LmZpbmRCeUlkQW5kVXBkYXRlKGZsb3dJZCwgeyRzZXQ6IGJvZHl9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJldFZhbDogTWluZEZsb3cpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5qc29uKDUwMCwge21lc3NhZ2U6ICdFUlJPUicsIGNvbnRlbnQ6IGVycn0pO1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKHJldFZhbCA9PSBudWxsICYmIFJlc3BvbnNlLmFFcnJvcih7bWVzc2FnZTogJ21pbmQtZmxvdyBub3QgZm91bmQnfSkpIHx8IFJlc3BvbnNlLmFTdWNjZXNzKCk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5leHBvcnQge01pbmRGbG93Q29udHJvbGxlcn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpdmF0ZXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGRlZmF1bHRVcGRhdGUocmVzOiBhbnksIGVycjogYW55LCByZXRWYWw6IGFueSl7XG4gIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICBtZXNzYWdlOiAnaXRlbSBub3QgZm91bmQnLFxuICAgICAgY29udGVudDoge31cbiAgICB9KSkgfHwgbmV3IFJlc3BvbnNlKDIwMCwge21lc3NhZ2U6ICd1cGRhdGVkJywgY29udGVudDoge319KTtcbiAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgcmVzLmVuZCgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
