"use strict";

var mongo_connector_1 = require("../../backend/mongo-connector");
var model_1 = require("../../../model/model");
var logger_1 = require("../../logger");
var AdministrationController = {
    createAdmin: function (req, res) {
        var body = req.body;
        if (body) {
            logger_1.logger.debug("Create administrator: " + body);
            var mongoAdmin = new mongo_connector_1.MongoAdministrator(body);
            mongoAdmin.save(function (err, admin) {
                var response = err && model_1.Response.aError(err) || model_1.Response.aSuccess(admin);
                res.json(response.status, response.body);
                res.end();
            });
        }
    },
    deactivateUser: function (req, res) {
        var userId = req.params.userId;
        var deactivateUser = req.params.deactivate;
        logger_1.logger.debug("Deactivating user: " + userId + " - " + deactivateUser);
        mongo_connector_1.MongoUser.findOne({ _id: userId }, function (err, user) {
            if (user) {
                user.deactivated = deactivateUser;
                mongo_connector_1.MongoUser.findByIdAndUpdate(userId, { $set: user }, function (err, retVal) {
                    return defaultUpdate(res, err, retVal);
                });
            } else {
                var response = model_1.Response.aError({ message: 'User not found' });
                res.json(response.status, response.body);
                res.end();
            }
        });
    }
};
exports.AdministrationController = AdministrationController;
//---------------------privates----------------------------
function defaultUpdate(res, err, retVal) {
    if (err) return res.json(500, { message: 'ERROR', content: err });
    var response = retVal == null && model_1.Response.aError({ message: 'not found' }) || model_1.Response.aSuccess();
    res.json(response.status, response.body);
    res.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvYWRtaW4vYWRtaW5pc3RyYXRpb24tY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFBLG9CQUFBLFFBQTRDLCtCQUE1QyxDQUFBO0FBQ0EsSUFBQSxVQUFBLFFBQTRDLHNCQUE1QyxDQUFBO0FBQ0EsSUFBQSxXQUFBLFFBQXFCLGNBQXJCLENBQUE7QUFFQSxJQUFJLDJCQUEyQjtBQUM3QixpQkFBYSxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDdkMsWUFBSSxPQUFzQixJQUFJLElBQTlCO0FBQ0EsWUFBSSxJQUFKLEVBQVU7QUFDUixxQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLDJCQUF5QixJQUF0QztBQUNBLGdCQUFJLGFBQWEsSUFBSSxrQkFBQSxrQkFBSixDQUF1QixJQUF2QixDQUFqQjtBQUNBLHVCQUFXLElBQVgsQ0FBZ0IsVUFBVSxHQUFWLEVBQW9CLEtBQXBCLEVBQXdDO0FBQ3RELG9CQUFJLFdBQXNCLE9BQU8sUUFBQSxRQUFBLENBQVMsTUFBVCxDQUFnQixHQUFoQixDQUFSLElBQWlDLFFBQUEsUUFBQSxDQUFTLFFBQVQsQ0FBa0IsS0FBbEIsQ0FBMUQ7QUFDQSxvQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0Esb0JBQUksR0FBSjtBQUNELGFBSkQ7QUFLRDtBQUFDLEtBWHlCO0FBWTdCLG9CQUFnQixVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDMUMsWUFBSSxTQUFTLElBQUksTUFBSixDQUFXLE1BQXhCO0FBQ0EsWUFBSSxpQkFBaUIsSUFBSSxNQUFKLENBQVcsVUFBaEM7QUFDQSxpQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLHdCQUFzQixNQUF0QixHQUE0QixLQUE1QixHQUFrQyxjQUEvQztBQUNBLDBCQUFBLFNBQUEsQ0FBVSxPQUFWLENBQWtCLEVBQUMsS0FBSyxNQUFOLEVBQWxCLEVBQWlDLFVBQVUsR0FBVixFQUFvQixJQUFwQixFQUE4QjtBQUM3RCxnQkFBRyxJQUFILEVBQVE7QUFDTixxQkFBSyxXQUFMLEdBQW1CLGNBQW5CO0FBQ0Esa0NBQUEsU0FBQSxDQUFVLGlCQUFWLENBQTRCLE1BQTVCLEVBQW9DLEVBQUMsTUFBTSxJQUFQLEVBQXBDLEVBQ0UsVUFBQyxHQUFELEVBQVcsTUFBWCxFQUF1QjtBQUFLLDJCQUFBLGNBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixNQUF4QixDQUFBO0FBQStCLGlCQUQ3RDtBQUVELGFBSkQsTUFJTTtBQUNKLG9CQUFJLFdBQXFCLFFBQUEsUUFBQSxDQUFTLE1BQVQsQ0FBZ0IsRUFBQyxTQUFTLGdCQUFWLEVBQWhCLENBQXpCO0FBQ0Esb0JBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLG9CQUFJLEdBQUo7QUFDRDtBQUNGLFNBVkQ7QUFXRDtBQTNCNEIsQ0FBL0I7QUE4QlEsUUFBQSx3QkFBQSxHQUF3Qix3QkFBeEI7QUFFUjtBQUVBLFNBQUEsYUFBQSxDQUF1QixHQUF2QixFQUFpQyxHQUFqQyxFQUEyQyxNQUEzQyxFQUFzRDtBQUNwRCxRQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULFFBQUksV0FBc0IsVUFBVSxJQUFWLElBQWtCLFFBQUEsUUFBQSxDQUFTLE1BQVQsQ0FBZ0IsRUFBQyxTQUFTLFdBQVYsRUFBaEIsQ0FBbkIsSUFDcEIsUUFBQSxRQUFBLENBQVMsUUFBVCxFQURMO0FBRUEsUUFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsUUFBSSxHQUFKO0FBQ0QiLCJmaWxlIjoic2VydmVyL2FwaS9hZG1pbi9hZG1pbmlzdHJhdGlvbi1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvQWRtaW5pc3RyYXRvciwgTW9uZ29Vc2VyfSBmcm9tIFwiLi4vLi4vYmFja2VuZC9tb25nby1jb25uZWN0b3JcIjtcbmltcG9ydCB7QWRtaW5pc3RyYXRvciwgUmVzcG9uc2UsIFVzZXJ9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9tb2RlbFwiO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuLi8uLi9sb2dnZXJcIjtcblxudmFyIEFkbWluaXN0cmF0aW9uQ29udHJvbGxlciA9IHtcbiAgY3JlYXRlQWRtaW46IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQWRtaW5pc3RyYXRvciA9IHJlcS5ib2R5O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYENyZWF0ZSBhZG1pbmlzdHJhdG9yOiAke2JvZHl9YCk7XG4gICAgICBsZXQgbW9uZ29BZG1pbiA9IG5ldyBNb25nb0FkbWluaXN0cmF0b3IoYm9keSk7XG4gICAgICBtb25nb0FkbWluLnNhdmUoZnVuY3Rpb24gKGVycjogYW55LCBhZG1pbjogQWRtaW5pc3RyYXRvcikge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBSZXNwb25zZS5hRXJyb3IoZXJyKSkgfHwgUmVzcG9uc2UuYVN1Y2Nlc3MoYWRtaW4pO1xuICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICB9fSxcbiAgZGVhY3RpdmF0ZVVzZXI6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICBsZXQgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbGV0IGRlYWN0aXZhdGVVc2VyID0gcmVxLnBhcmFtcy5kZWFjdGl2YXRlO1xuICAgIGxvZ2dlci5kZWJ1ZyhgRGVhY3RpdmF0aW5nIHVzZXI6ICR7dXNlcklkfSAtICR7ZGVhY3RpdmF0ZVVzZXJ9YCk7XG4gICAgTW9uZ29Vc2VyLmZpbmRPbmUoe19pZDogdXNlcklkfSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyOiBVc2VyKSB7XG4gICAgICBpZih1c2VyKXtcbiAgICAgICAgdXNlci5kZWFjdGl2YXRlZCA9IGRlYWN0aXZhdGVVc2VyO1xuICAgICAgICBNb25nb1VzZXIuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7JHNldDogdXNlcn0sXG4gICAgICAgICAgKGVycjogYW55LCByZXRWYWw6IFVzZXIpID0+IGRlZmF1bHRVcGRhdGUocmVzLCBlcnIsIHJldFZhbCkpO1xuICAgICAgfWVsc2Uge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gUmVzcG9uc2UuYUVycm9yKHttZXNzYWdlOiAnVXNlciBub3QgZm91bmQnfSk7XG4gICAgICAgIHJlcy5qc29uKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtBZG1pbmlzdHJhdGlvbkNvbnRyb2xsZXJ9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpdmF0ZXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGRlZmF1bHRVcGRhdGUocmVzOiBhbnksIGVycjogYW55LCByZXRWYWw6IGFueSl7XG4gIGlmIChlcnIpIHJldHVybiByZXMuanNvbig1MDAsIHttZXNzYWdlOiAnRVJST1InLCBjb250ZW50OiBlcnJ9KTtcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IChyZXRWYWwgPT0gbnVsbCAmJiBSZXNwb25zZS5hRXJyb3Ioe21lc3NhZ2U6ICdub3QgZm91bmQnfSkpXG4gICAgfHwgUmVzcG9uc2UuYVN1Y2Nlc3MoKTtcbiAgcmVzLmpzb24ocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTtcbiAgcmVzLmVuZCgpO1xufVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
