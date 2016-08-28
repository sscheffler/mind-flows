"use strict";

var express = require('express');
var body_parser_1 = require('body-parser');
var administration_controller_1 = require('./administration-controller');
//noinspection TypeScriptValidateTypes
var router = express.Router().use(body_parser_1.json());
router.route('/').post(function (req, res) {
    return administration_controller_1.AdministrationController.createAdmin(req, res);
});
router.route('/:userId/deactivate/:deactivate').put(function (req, res) {
    return administration_controller_1.AdministrationController.deactivateUser(req, res);
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvYWRtaW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBTyxVQUFPLFFBQVcsU0FBWCxDQUFkO0FBQ0EsSUFBQSxnQkFBQSxRQUFtQixhQUFuQixDQUFBO0FBQ0EsSUFBQSw4QkFBQSxRQUF1Qyw2QkFBdkMsQ0FBQTtBQUdBO0FBQ0EsSUFBSSxTQUFTLFFBQVEsTUFBUixHQUNWLEdBRFUsQ0FDTixjQUFBLElBQUEsRUFETSxDQUFiO0FBR0EsT0FBTyxLQUFQLENBQWEsR0FBYixFQUNHLElBREgsQ0FDUyxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLDRCQUFBLHdCQUFBLENBQXlCLFdBQXpCLENBQXFDLEdBQXJDLEVBQTBDLEdBQTFDLENBQUE7QUFBOEMsQ0FEckU7QUFHQSxPQUFPLEtBQVAsQ0FBYSxpQ0FBYixFQUNHLEdBREgsQ0FDUSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLDRCQUFBLHdCQUFBLENBQXlCLGNBQXpCLENBQXdDLEdBQXhDLEVBQTZDLEdBQTdDLENBQUE7QUFBaUQsQ0FEdkU7QUFHQSxPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoic2VydmVyL2FwaS9hZG1pbi9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQge2pzb259IGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCB7QWRtaW5pc3RyYXRpb25Db250cm9sbGVyfSBmcm9tICcuL2FkbWluaXN0cmF0aW9uLWNvbnRyb2xsZXInXG5cblxuLy9ub2luc3BlY3Rpb24gVHlwZVNjcmlwdFZhbGlkYXRlVHlwZXNcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG4gIC51c2UoanNvbigpKTtcblxucm91dGVyLnJvdXRlKCcvJylcbiAgLnBvc3QoIChyZXEsIHJlcykgPT4gQWRtaW5pc3RyYXRpb25Db250cm9sbGVyLmNyZWF0ZUFkbWluKHJlcSwgcmVzKSApO1xuXG5yb3V0ZXIucm91dGUoJy86dXNlcklkL2RlYWN0aXZhdGUvOmRlYWN0aXZhdGUnKVxuICAucHV0KCAocmVxLCByZXMpID0+IEFkbWluaXN0cmF0aW9uQ29udHJvbGxlci5kZWFjdGl2YXRlVXNlcihyZXEsIHJlcykgKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
