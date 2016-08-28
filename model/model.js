"use strict";

var FlowStep = function () {
    function FlowStep(concern) {
        this.childs = [];
        this.concern = concern;
    }
    return FlowStep;
}();
exports.FlowStep = FlowStep;
var MindFlow = function () {
    function MindFlow(name, comment, visibiliyPublic, userId) {
        this.rootSteps = [];
        this.linkedConcepts = [];
        this.name = name;
        this.comment = comment;
        this.visibiliyPublic = visibiliyPublic;
        this.userId = userId;
    }
    return MindFlow;
}();
exports.MindFlow = MindFlow;
var Concept = function () {
    function Concept(name, comment, visibiliyPublic, userId) {
        this.rootSteps = [];
        this.linkedConcepts = [];
        this.name = name;
        this.comment = comment;
        this.visibiliyPublic = visibiliyPublic;
        this.userId = userId;
    }
    return Concept;
}();
exports.Concept = Concept;
var Administrator = function () {
    function Administrator(email, login, passwd) {
        this.email = email;
        this.login = login;
        this.passwd = passwd;
    }
    return Administrator;
}();
exports.Administrator = Administrator;
var User = function () {
    function User(email, login, passwd) {
        this.deactivated = false;
        this.flows = [];
        this.email = email;
        this.login = login;
        this.passwd = passwd;
    }
    return User;
}();
exports.User = User;
var Response = function () {
    function Response(status, body) {
        this.status = status;
        this.body = body;
    }
    Response.aError = function (content, message) {
        if (content === void 0) {
            content = {};
        }
        if (message === void 0) {
            message = 'ERROR';
        }
        return new Response(500, {
            message: message,
            content: content
        });
    };
    Response.aSuccess = function (content, message) {
        if (content === void 0) {
            content = {};
        }
        if (message === void 0) {
            message = 'OK';
        }
        return new Response(200, {
            message: message,
            content: content
        });
    };
    return Response;
}();
exports.Response = Response;
var UserGroup = function () {
    function UserGroup(name) {
        this.name = name;
    }
    return UserGroup;
}();
exports.UserGroup = UserGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQVdBLElBQUEsV0FBQSxZQUFBO0FBSUUsYUFBQSxRQUFBLENBQVksT0FBWixFQUEyQjtBQUYzQixhQUFBLE1BQUEsR0FBMEIsRUFBMUI7QUFHRSxhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7QUFDSCxXQUFBLFFBQUE7QUFQQSxDQUFBLEVBQUE7QUFBYSxRQUFBLFFBQUEsR0FBUSxRQUFSO0FBU2IsSUFBQSxXQUFBLFlBQUE7QUFTRSxhQUFBLFFBQUEsQ0FBWSxJQUFaLEVBQTBCLE9BQTFCLEVBQTJDLGVBQTNDLEVBQXFFLE1BQXJFLEVBQW1GO0FBSG5GLGFBQUEsU0FBQSxHQUE2QixFQUE3QjtBQUNBLGFBQUEsY0FBQSxHQUFpQyxFQUFqQztBQUdFLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNEO0FBQ0gsV0FBQSxRQUFBO0FBZkEsQ0FBQSxFQUFBO0FBQWEsUUFBQSxRQUFBLEdBQVEsUUFBUjtBQWlCYixJQUFBLFVBQUEsWUFBQTtBQVNFLGFBQUEsT0FBQSxDQUFZLElBQVosRUFBMEIsT0FBMUIsRUFBMkMsZUFBM0MsRUFBcUUsTUFBckUsRUFBbUY7QUFIbkYsYUFBQSxTQUFBLEdBQTZCLEVBQTdCO0FBQ0EsYUFBQSxjQUFBLEdBQWlDLEVBQWpDO0FBR0UsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0Q7QUFDSCxXQUFBLE9BQUE7QUFmQSxDQUFBLEVBQUE7QUFBYSxRQUFBLE9BQUEsR0FBTyxPQUFQO0FBaUJiLElBQUEsZ0JBQUEsWUFBQTtBQU1FLGFBQUEsYUFBQSxDQUFZLEtBQVosRUFBMkIsS0FBM0IsRUFBMEMsTUFBMUMsRUFBd0Q7QUFDdEQsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0Q7QUFDSCxXQUFBLGFBQUE7QUFYQSxDQUFBLEVBQUE7QUFBYSxRQUFBLGFBQUEsR0FBYSxhQUFiO0FBYWIsSUFBQSxPQUFBLFlBQUE7QUFTRSxhQUFBLElBQUEsQ0FBWSxLQUFaLEVBQTJCLEtBQTNCLEVBQTBDLE1BQTFDLEVBQXdEO0FBSHhELGFBQUEsV0FBQSxHQUF1QixLQUF2QjtBQUNBLGFBQUEsS0FBQSxHQUE4QixFQUE5QjtBQUdFLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNEO0FBQ0gsV0FBQSxJQUFBO0FBZEEsQ0FBQSxFQUFBO0FBQWEsUUFBQSxJQUFBLEdBQUksSUFBSjtBQWdCYixJQUFBLFdBQUEsWUFBQTtBQXFCRSxhQUFBLFFBQUEsQ0FBWSxNQUFaLEVBQTRCLElBQTVCLEVBQWlFO0FBQy9ELGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7QUFqQk0sYUFBQSxNQUFBLEdBQVMsVUFBUyxPQUFULEVBQTRCLE9BQTVCLEVBQXFEO0FBQTVDLFlBQUEsWUFBQSxLQUFBLENBQUEsRUFBaUI7QUFBakIsc0JBQUEsRUFBQTtBQUFpQjtBQUFFLFlBQUEsWUFBQSxLQUFBLENBQUEsRUFBeUI7QUFBekIsc0JBQUEsT0FBQTtBQUF5QjtBQUNuRSxlQUFPLElBQUksUUFBSixDQUFhLEdBQWIsRUFBa0I7QUFDdkIscUJBQVMsT0FEYztBQUV2QixxQkFBUztBQUZjLFNBQWxCLENBQVA7QUFJRCxLQUxNO0FBT0EsYUFBQSxRQUFBLEdBQVcsVUFBUyxPQUFULEVBQTRCLE9BQTVCLEVBQWtEO0FBQXpDLFlBQUEsWUFBQSxLQUFBLENBQUEsRUFBaUI7QUFBakIsc0JBQUEsRUFBQTtBQUFpQjtBQUFFLFlBQUEsWUFBQSxLQUFBLENBQUEsRUFBc0I7QUFBdEIsc0JBQUEsSUFBQTtBQUFzQjtBQUNsRSxlQUFPLElBQUksUUFBSixDQUFhLEdBQWIsRUFBa0I7QUFDdkIscUJBQVMsT0FEYztBQUV2QixxQkFBUztBQUZjLFNBQWxCLENBQVA7QUFJRCxLQUxNO0FBV1QsV0FBQSxRQUFBO0FBekJBLENBQUEsRUFBQTtBQUFhLFFBQUEsUUFBQSxHQUFRLFFBQVI7QUEyQmIsSUFBQSxZQUFBLFlBQUE7QUFLRSxhQUFBLFNBQUEsQ0FBWSxJQUFaLEVBQXdCO0FBQ3RCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDRDtBQUNILFdBQUEsU0FBQTtBQVJBLENBQUEsRUFBQTtBQUFhLFFBQUEsU0FBQSxHQUFTLFNBQVQiLCJmaWxlIjoibW9kZWwvbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW50ZXJmYWNlIElJZCB7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3Rha2Vob2xkZXIgeyBlbWFpbDogc3RyaW5nOyBsb2dpbjogc3RyaW5nOyBwYXNzd2Q6IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgS25vd2xlZGdlRmxvdyB7IG5hbWU6IHN0cmluZzsgY29tbWVudDogc3RyaW5nOyByb290U3RlcHM6IEFycmF5PEZsb3dTdGVwPjsgdmlzaWJpbGl5UHVibGljOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBGbG93U3RlcCB7XG4gIGNvbmNlcm46IHN0cmluZztcbiAgY2hpbGRzOiBBcnJheTxGbG93U3RlcD4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25jZXJuOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbmNlcm4gPSBjb25jZXJuO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNaW5kRmxvdyBpbXBsZW1lbnRzIElJZCwgS25vd2xlZGdlRmxvdyB7XG4gIHZpc2liaWxpeVB1YmxpYzogYm9vbGVhbjtcbiAgaWQ6IHN0cmluZztcbiAgdXNlcklkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29tbWVudDogc3RyaW5nO1xuICByb290U3RlcHM6IEFycmF5PEZsb3dTdGVwPiA9IFtdO1xuICBsaW5rZWRDb25jZXB0czogQXJyYXk8Q29uY2VwdD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbW1lbnQ6IHN0cmluZywgdmlzaWJpbGl5UHVibGljOiBib29sZWFuLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcbiAgICB0aGlzLnZpc2liaWxpeVB1YmxpYyA9IHZpc2liaWxpeVB1YmxpYztcbiAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29uY2VwdCBpbXBsZW1lbnRzIElJZCwgS25vd2xlZGdlRmxvdyB7XG4gIHZpc2liaWxpeVB1YmxpYzogYm9vbGVhbjtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29tbWVudDogc3RyaW5nO1xuICByb290U3RlcHM6IEFycmF5PEZsb3dTdGVwPiA9IFtdO1xuICBsaW5rZWRDb25jZXB0czogQXJyYXk8Q29uY2VwdD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbW1lbnQ6IHN0cmluZywgdmlzaWJpbGl5UHVibGljOiBib29sZWFuLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcbiAgICB0aGlzLnZpc2liaWxpeVB1YmxpYyA9IHZpc2liaWxpeVB1YmxpYztcbiAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRtaW5pc3RyYXRvciBpbXBsZW1lbnRzIElJZCwgU3Rha2Vob2xkZXIge1xuICBpZDogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBsb2dpbjogc3RyaW5nO1xuICBwYXNzd2Q6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihlbWFpbDogc3RyaW5nLCBsb2dpbjogc3RyaW5nLCBwYXNzd2Q6IHN0cmluZykge1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLmxvZ2luID0gbG9naW47XG4gICAgdGhpcy5wYXNzd2QgPSBwYXNzd2Q7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVzZXIgaW1wbGVtZW50cyBJSWQsIFN0YWtlaG9sZGVyIHtcbiAgaWQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgbG9naW46IHN0cmluZztcbiAgcGFzc3dkOiBzdHJpbmc7XG4gIGdyYXZhdGFyVXJsOiBzdHJpbmc7XG4gIGRlYWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGZsb3dzOiBBcnJheTxLbm93bGVkZ2VGbG93PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGVtYWlsOiBzdHJpbmcsIGxvZ2luOiBzdHJpbmcsIHBhc3N3ZDogc3RyaW5nKSB7XG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgIHRoaXMubG9naW4gPSBsb2dpbjtcbiAgICB0aGlzLnBhc3N3ZCA9IHBhc3N3ZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2Uge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb250ZW50OiBhbnlcbiAgfTtcblxuICBzdGF0aWMgYUVycm9yID0gZnVuY3Rpb24oY29udGVudDogYW55ID0ge30sIG1lc3NhZ2U6IHN0cmluZyA9ICdFUlJPUicpe1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoNTAwLCB7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgY29udGVudDogY29udGVudFxuICAgIH0pO1xuICB9O1xuXG4gIHN0YXRpYyBhU3VjY2VzcyA9IGZ1bmN0aW9uKGNvbnRlbnQ6IGFueSA9IHt9LCBtZXNzYWdlOiBzdHJpbmcgPSAnT0snKXtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKDIwMCwge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihzdGF0dXM6IG51bWJlciwgYm9keToge21lc3NhZ2U6IHN0cmluZzsgY29udGVudDogYW55fSkge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cCBpbXBsZW1lbnRzIElJZCB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXNlcnM6IEFycmF5PFVzZXI+O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
