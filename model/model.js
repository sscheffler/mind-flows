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
    function MindFlow(name, comment, visibiliyPublic) {
        this.rootSteps = [];
        this.linkedConcepts = [];
        this.name = name;
        this.comment = comment;
        this.visibiliyPublic = visibiliyPublic;
    }
    return MindFlow;
}();
exports.MindFlow = MindFlow;
var Concept = function () {
    function Concept(name, comment, visibiliyPublic) {
        this.rootSteps = [];
        this.linkedConcepts = [];
        this.name = name;
        this.comment = comment;
        this.visibiliyPublic = visibiliyPublic;
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
var UserGroup = function () {
    function UserGroup(name) {
        this.name = name;
    }
    return UserGroup;
}();
exports.UserGroup = UserGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsL21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQVNBLElBQUEsV0FBQSxZQUFBO0FBSUUsYUFBQSxRQUFBLENBQVksT0FBWixFQUEyQjtBQUYzQixhQUFBLE1BQUEsR0FBMEIsRUFBMUI7QUFFK0IsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUF5QjtBQUMxRCxXQUFBLFFBQUE7QUFMQSxDQUFBLEVBQUE7QUFBYSxRQUFBLFFBQUEsR0FBUSxRQUFSO0FBT2IsSUFBQSxXQUFBLFlBQUE7QUFPRSxhQUFBLFFBQUEsQ0FBWSxJQUFaLEVBQTBCLE9BQTFCLEVBQTJDLGVBQTNDLEVBQW1FO0FBRm5FLGFBQUEsU0FBQSxHQUE2QixFQUE3QjtBQUNBLGFBQUEsY0FBQSxHQUFpQyxFQUFqQztBQUN1RSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQWtCLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFBd0IsYUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQXlDO0FBQzVKLFdBQUEsUUFBQTtBQVJBLENBQUEsRUFBQTtBQUFhLFFBQUEsUUFBQSxHQUFRLFFBQVI7QUFVYixJQUFBLFVBQUEsWUFBQTtBQU9FLGFBQUEsT0FBQSxDQUFZLElBQVosRUFBMEIsT0FBMUIsRUFBMkMsZUFBM0MsRUFBbUU7QUFGbkUsYUFBQSxTQUFBLEdBQTZCLEVBQTdCO0FBQ0EsYUFBQSxjQUFBLEdBQWlDLEVBQWpDO0FBQ3VFLGFBQUssSUFBTCxHQUFZLElBQVo7QUFBa0IsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUF3QixhQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFBeUM7QUFDNUosV0FBQSxPQUFBO0FBUkEsQ0FBQSxFQUFBO0FBQWEsUUFBQSxPQUFBLEdBQU8sT0FBUDtBQVdiLElBQUEsZ0JBQUEsWUFBQTtBQUtFLGFBQUEsYUFBQSxDQUFZLEtBQVosRUFBMkIsS0FBM0IsRUFBMEMsTUFBMUMsRUFBd0Q7QUFDdEQsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0Q7QUFDSCxXQUFBLGFBQUE7QUFWQSxDQUFBLEVBQUE7QUFBYSxRQUFBLGFBQUEsR0FBYSxhQUFiO0FBWWIsSUFBQSxPQUFBLFlBQUE7QUFPRSxhQUFBLElBQUEsQ0FBWSxLQUFaLEVBQTJCLEtBQTNCLEVBQTBDLE1BQTFDLEVBQXdEO0FBRnhELGFBQUEsV0FBQSxHQUF1QixLQUF2QjtBQUNBLGFBQUEsS0FBQSxHQUE4QixFQUE5QjtBQUVFLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNEO0FBQ0gsV0FBQSxJQUFBO0FBWkEsQ0FBQSxFQUFBO0FBQWEsUUFBQSxJQUFBLEdBQUksSUFBSjtBQWNiLElBQUEsWUFBQSxZQUFBO0FBS0UsYUFBQSxTQUFBLENBQVksSUFBWixFQUF3QjtBQUFJLGFBQUssSUFBTCxHQUFZLElBQVo7QUFBbUI7QUFDakQsV0FBQSxTQUFBO0FBTkEsQ0FBQSxFQUFBO0FBQWEsUUFBQSxTQUFBLEdBQVMsU0FBVCIsImZpbGUiOiJtb2RlbC9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbnRlcmZhY2UgSUlkIHtcbiAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFrZWhvbGRlcnsgZW1haWw6IHN0cmluZzsgbG9naW46IHN0cmluZzsgcGFzc3dkOiBzdHJpbmc7IH1cbmV4cG9ydCBpbnRlcmZhY2UgS25vd2xlZGdlRmxvd3sgbmFtZTogc3RyaW5nOyBjb21tZW50OiBzdHJpbmc7IHJvb3RTdGVwczogQXJyYXk8Rmxvd1N0ZXA+OyB2aXNpYmlsaXlQdWJsaWM6IGJvb2xlYW59XG5cbmV4cG9ydCBjbGFzcyBGbG93U3RlcCB7XG4gIGNvbmNlcm46IHN0cmluZztcbiAgY2hpbGRzOiBBcnJheTxGbG93U3RlcD4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25jZXJuOiBzdHJpbmcpIHsgdGhpcy5jb25jZXJuID0gY29uY2VybjsgfVxufVxuXG5leHBvcnQgY2xhc3MgTWluZEZsb3cgaW1wbGVtZW50cyBJSWQsIEtub3dsZWRnZUZsb3d7XG4gIHZpc2liaWxpeVB1YmxpYzogYm9vbGVhbjtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb21tZW50OiBzdHJpbmc7XG4gIHJvb3RTdGVwczogQXJyYXk8Rmxvd1N0ZXA+ID0gW107XG4gIGxpbmtlZENvbmNlcHRzOiBBcnJheTxDb25jZXB0PiA9IFtdO1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbW1lbnQ6IHN0cmluZywgdmlzaWJpbGl5UHVibGljOiBib29sZWFuKSB7IHRoaXMubmFtZSA9IG5hbWU7IHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7IHRoaXMudmlzaWJpbGl5UHVibGljID0gdmlzaWJpbGl5UHVibGljOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25jZXB0IGltcGxlbWVudHMgSUlkLCBLbm93bGVkZ2VGbG93e1xuICB2aXNpYmlsaXlQdWJsaWM6IGJvb2xlYW47XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29tbWVudDogc3RyaW5nO1xuICByb290U3RlcHM6IEFycmF5PEZsb3dTdGVwPiA9IFtdO1xuICBsaW5rZWRDb25jZXB0czogQXJyYXk8Q29uY2VwdD4gPSBbXTtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjb21tZW50OiBzdHJpbmcsIHZpc2liaWxpeVB1YmxpYzogYm9vbGVhbikgeyB0aGlzLm5hbWUgPSBuYW1lOyB0aGlzLmNvbW1lbnQgPSBjb21tZW50OyB0aGlzLnZpc2liaWxpeVB1YmxpYyA9IHZpc2liaWxpeVB1YmxpYzsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBBZG1pbmlzdHJhdG9yIGltcGxlbWVudHMgSUlkLCBTdGFrZWhvbGRlcntcbiAgaWQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgbG9naW46IHN0cmluZztcbiAgcGFzc3dkOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGVtYWlsOiBzdHJpbmcsIGxvZ2luOiBzdHJpbmcsIHBhc3N3ZDogc3RyaW5nKSB7XG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgIHRoaXMubG9naW4gPSBsb2dpbjtcbiAgICB0aGlzLnBhc3N3ZCA9IHBhc3N3ZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXNlciBpbXBsZW1lbnRzIElJZCwgU3Rha2Vob2xkZXJ7XG4gIGlkOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIGxvZ2luOiBzdHJpbmc7XG4gIHBhc3N3ZDogc3RyaW5nO1xuICBkZWFjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBmbG93czogQXJyYXk8S25vd2xlZGdlRmxvdz4gPSBbXTtcbiAgY29uc3RydWN0b3IoZW1haWw6IHN0cmluZywgbG9naW46IHN0cmluZywgcGFzc3dkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVtYWlsID0gZW1haWw7XG4gICAgdGhpcy5sb2dpbiA9IGxvZ2luO1xuICAgIHRoaXMucGFzc3dkID0gcGFzc3dkO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyR3JvdXAgaW1wbGVtZW50cyBJSWR7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXNlcnM6IEFycmF5PFVzZXI+O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyB0aGlzLm5hbWUgPSBuYW1lOyB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
