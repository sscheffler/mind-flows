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
                var response = err && new model_1.Response(500, {
                    message: 'ERROR',
                    content: err
                }) || new model_1.Response(200, { message: 'OK', content: admin });
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
                var response = model_1.Response.aError('User not found');
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
    var response = retVal == null && model_1.Response.aError('not found') || model_1.Response.aSuccess();
    res.json(response.status, response.body);
    res.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvYWRtaW4vYWRtaW5pc3RyYXRpb24tY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFBLG9CQUFBLFFBQTRDLCtCQUE1QyxDQUFBO0FBQ0EsSUFBQSxVQUFBLFFBQTRDLHNCQUE1QyxDQUFBO0FBQ0EsSUFBQSxXQUFBLFFBQXFCLGNBQXJCLENBQUE7QUFFQSxJQUFJLDJCQUEyQjtBQUM3QixpQkFBYSxVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDdkMsWUFBSSxPQUFzQixJQUFJLElBQTlCO0FBQ0EsWUFBSSxJQUFKLEVBQVU7QUFDUixxQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLDJCQUF5QixJQUF0QztBQUNBLGdCQUFJLGFBQWEsSUFBSSxrQkFBQSxrQkFBSixDQUF1QixJQUF2QixDQUFqQjtBQUNBLHVCQUFXLElBQVgsQ0FBZ0IsVUFBVSxHQUFWLEVBQW9CLEtBQXBCLEVBQXdDO0FBQ3RELG9CQUFJLFdBQXNCLE9BQU8sSUFBSSxRQUFBLFFBQUosQ0FBYSxHQUFiLEVBQWtCO0FBQy9DLDZCQUFTLE9BRHNDO0FBRS9DLDZCQUFTO0FBRnNDLGlCQUFsQixDQUFSLElBR2hCLElBQUksUUFBQSxRQUFKLENBQWEsR0FBYixFQUFrQixFQUFDLFNBQVMsSUFBVixFQUFnQixTQUFTLEtBQXpCLEVBQWxCLENBSFQ7QUFJQSxvQkFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0Esb0JBQUksR0FBSjtBQUNELGFBUEQ7QUFRRDtBQUFDLEtBZHlCO0FBZTdCLG9CQUFnQixVQUFVLEdBQVYsRUFBb0IsR0FBcEIsRUFBNEI7QUFDMUMsWUFBSSxTQUFTLElBQUksTUFBSixDQUFXLE1BQXhCO0FBQ0EsWUFBSSxpQkFBaUIsSUFBSSxNQUFKLENBQVcsVUFBaEM7QUFDQSxpQkFBQSxNQUFBLENBQU8sS0FBUCxDQUFhLHdCQUFzQixNQUF0QixHQUE0QixLQUE1QixHQUFrQyxjQUEvQztBQUNBLDBCQUFBLFNBQUEsQ0FBVSxPQUFWLENBQWtCLEVBQUMsS0FBSyxNQUFOLEVBQWxCLEVBQWlDLFVBQVUsR0FBVixFQUFvQixJQUFwQixFQUE4QjtBQUM3RCxnQkFBRyxJQUFILEVBQVE7QUFDTixxQkFBSyxXQUFMLEdBQW1CLGNBQW5CO0FBQ0Esa0NBQUEsU0FBQSxDQUFVLGlCQUFWLENBQTRCLE1BQTVCLEVBQW9DLEVBQUMsTUFBTSxJQUFQLEVBQXBDLEVBQ0UsVUFBQyxHQUFELEVBQVcsTUFBWCxFQUF1QjtBQUFLLDJCQUFBLGNBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixNQUF4QixDQUFBO0FBQStCLGlCQUQ3RDtBQUVELGFBSkQsTUFJTTtBQUNKLG9CQUFJLFdBQXFCLFFBQUEsUUFBQSxDQUFTLE1BQVQsQ0FBZ0IsZ0JBQWhCLENBQXpCO0FBQ0Esb0JBQUksSUFBSixDQUFTLFNBQVMsTUFBbEIsRUFBMEIsU0FBUyxJQUFuQztBQUNBLG9CQUFJLEdBQUo7QUFDRDtBQUNGLFNBVkQ7QUFXRDtBQTlCNEIsQ0FBL0I7QUFpQ1EsUUFBQSx3QkFBQSxHQUF3Qix3QkFBeEI7QUFFUjtBQUVBLFNBQUEsYUFBQSxDQUF1QixHQUF2QixFQUFpQyxHQUFqQyxFQUEyQyxNQUEzQyxFQUFzRDtBQUNwRCxRQUFJLEdBQUosRUFBUyxPQUFPLElBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxFQUFDLFNBQVMsT0FBVixFQUFtQixTQUFTLEdBQTVCLEVBQWQsQ0FBUDtBQUNULFFBQUksV0FBc0IsVUFBVSxJQUFWLElBQWtCLFFBQUEsUUFBQSxDQUFTLE1BQVQsQ0FBZ0IsV0FBaEIsQ0FBbkIsSUFDcEIsUUFBQSxRQUFBLENBQVMsUUFBVCxFQURMO0FBRUEsUUFBSSxJQUFKLENBQVMsU0FBUyxNQUFsQixFQUEwQixTQUFTLElBQW5DO0FBQ0EsUUFBSSxHQUFKO0FBQ0QiLCJmaWxlIjoic2VydmVyL2FwaS9hZG1pbi9hZG1pbmlzdHJhdGlvbi1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge01vbmdvQWRtaW5pc3RyYXRvciwgTW9uZ29Vc2VyfSBmcm9tIFwiLi4vLi4vYmFja2VuZC9tb25nby1jb25uZWN0b3JcIjtcbmltcG9ydCB7QWRtaW5pc3RyYXRvciwgUmVzcG9uc2UsIFVzZXJ9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9tb2RlbFwiO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuLi8uLi9sb2dnZXJcIjtcblxudmFyIEFkbWluaXN0cmF0aW9uQ29udHJvbGxlciA9IHtcbiAgY3JlYXRlQWRtaW46IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICB2YXIgYm9keTogQWRtaW5pc3RyYXRvciA9IHJlcS5ib2R5O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYENyZWF0ZSBhZG1pbmlzdHJhdG9yOiAke2JvZHl9YCk7XG4gICAgICBsZXQgbW9uZ29BZG1pbiA9IG5ldyBNb25nb0FkbWluaXN0cmF0b3IoYm9keSk7XG4gICAgICBtb25nb0FkbWluLnNhdmUoZnVuY3Rpb24gKGVycjogYW55LCBhZG1pbjogQWRtaW5pc3RyYXRvcikge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gKGVyciAmJiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRVJST1InLFxuICAgICAgICAgICAgY29udGVudDogZXJyXG4gICAgICAgICAgfSkpIHx8IG5ldyBSZXNwb25zZSgyMDAsIHttZXNzYWdlOiAnT0snLCBjb250ZW50OiBhZG1pbn0pO1xuICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICB9fSxcbiAgZGVhY3RpdmF0ZVVzZXI6IGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICBsZXQgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XG4gICAgbGV0IGRlYWN0aXZhdGVVc2VyID0gcmVxLnBhcmFtcy5kZWFjdGl2YXRlO1xuICAgIGxvZ2dlci5kZWJ1ZyhgRGVhY3RpdmF0aW5nIHVzZXI6ICR7dXNlcklkfSAtICR7ZGVhY3RpdmF0ZVVzZXJ9YCk7XG4gICAgTW9uZ29Vc2VyLmZpbmRPbmUoe19pZDogdXNlcklkfSwgZnVuY3Rpb24gKGVycjogYW55LCB1c2VyOiBVc2VyKSB7XG4gICAgICBpZih1c2VyKXtcbiAgICAgICAgdXNlci5kZWFjdGl2YXRlZCA9IGRlYWN0aXZhdGVVc2VyO1xuICAgICAgICBNb25nb1VzZXIuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7JHNldDogdXNlcn0sXG4gICAgICAgICAgKGVycjogYW55LCByZXRWYWw6IFVzZXIpID0+IGRlZmF1bHRVcGRhdGUocmVzLCBlcnIsIHJldFZhbCkpO1xuICAgICAgfWVsc2Uge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gUmVzcG9uc2UuYUVycm9yKCdVc2VyIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7QWRtaW5pc3RyYXRpb25Db250cm9sbGVyfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLXByaXZhdGVzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBkZWZhdWx0VXBkYXRlKHJlczogYW55LCBlcnI6IGFueSwgcmV0VmFsOiBhbnkpe1xuICBpZiAoZXJyKSByZXR1cm4gcmVzLmpzb24oNTAwLCB7bWVzc2FnZTogJ0VSUk9SJywgY29udGVudDogZXJyfSk7XG4gIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSAocmV0VmFsID09IG51bGwgJiYgUmVzcG9uc2UuYUVycm9yKCdub3QgZm91bmQnKSlcbiAgICB8fCBSZXNwb25zZS5hU3VjY2VzcygpO1xuICByZXMuanNvbihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmJvZHkpO1xuICByZXMuZW5kKCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
