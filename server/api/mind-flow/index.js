"use strict";

var express = require('express');
var body_parser_1 = require("body-parser");
//noinspection TypeScriptValidateTypes
var router = express.Router().use(body_parser_1.json());
router.route('/').get(function (req, res) {
    res.json({ message: 'Get all for user' });
    res.end();
}).post(function (req, res) {
    res.json({ message: 'Create new for user' });
    res.end();
});
router.route('/:flowId').get(function (req, res) {
    res.json({ message: 'Get certain flow' });
    res.end();
}).delete(function (req, res) {
    res.json({ message: 'delete complete flow' });
    res.end();
}).put(function (req, res) {
    res.json({ message: 'update' });
    res.end();
});
router.route('/:flowId/step').post(function (req, res) {
    res.json({ message: 'Add step to flow' });
    res.end();
}).post(function (req, res) {
    res.json({ message: 'Remove step to flow' });
    res.end();
});
router.route('/:flowId/concept/:concept').post(function (req, res) {
    res.json({ message: 'Link concept to flow' });
    res.end();
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvbWluZC1mbG93L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQU8sVUFBTyxRQUFXLFNBQVgsQ0FBZDtBQUNBLElBQUEsZ0JBQUEsUUFBbUIsYUFBbkIsQ0FBQTtBQUVBO0FBQ0EsSUFBSSxTQUFTLFFBQVEsTUFBUixHQUNWLEdBRFUsQ0FDTixjQUFBLElBQUEsRUFETSxDQUFiO0FBR0EsT0FBTyxLQUFQLENBQWEsR0FBYixFQUNHLEdBREgsQ0FDTyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQWtCO0FBQ3JCLFFBQUksSUFBSixDQUFTLEVBQUMsU0FBUyxrQkFBVixFQUFUO0FBQ0EsUUFBSSxHQUFKO0FBQ0QsQ0FKSCxFQUtHLElBTEgsQ0FLUSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQWtCO0FBQ3RCLFFBQUksSUFBSixDQUFTLEVBQUMsU0FBUyxxQkFBVixFQUFUO0FBQ0EsUUFBSSxHQUFKO0FBQ0QsQ0FSSDtBQVdBLE9BQU8sS0FBUCxDQUFhLFVBQWIsRUFDRyxHQURILENBQ08sVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFrQjtBQUNyQixRQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMsa0JBQVYsRUFBVDtBQUNBLFFBQUksR0FBSjtBQUNELENBSkgsRUFLRyxNQUxILENBS1UsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFrQjtBQUN4QixRQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMsc0JBQVYsRUFBVDtBQUNBLFFBQUksR0FBSjtBQUNELENBUkgsRUFTRyxHQVRILENBU08sVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFrQjtBQUNyQixRQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMsUUFBVixFQUFUO0FBQ0EsUUFBSSxHQUFKO0FBQ0QsQ0FaSDtBQWVBLE9BQU8sS0FBUCxDQUFhLGVBQWIsRUFDRyxJQURILENBQ1EsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFrQjtBQUN0QixRQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMsa0JBQVYsRUFBVDtBQUNBLFFBQUksR0FBSjtBQUNELENBSkgsRUFLRyxJQUxILENBS1EsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFrQjtBQUN0QixRQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMscUJBQVYsRUFBVDtBQUNBLFFBQUksR0FBSjtBQUNELENBUkg7QUFXQSxPQUFPLEtBQVAsQ0FBYSwyQkFBYixFQUNHLElBREgsQ0FDUSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQWtCO0FBQ3RCLFFBQUksSUFBSixDQUFTLEVBQUMsU0FBUyxzQkFBVixFQUFUO0FBQ0EsUUFBSSxHQUFKO0FBQ0QsQ0FKSDtBQU9BLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJzZXJ2ZXIvYXBpL21pbmQtZmxvdy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQge2pzb259IGZyb20gXCJib2R5LXBhcnNlclwiO1xuXG4vL25vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVUeXBlc1xudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKClcbiAgLnVzZShqc29uKCkpO1xuXG5yb3V0ZXIucm91dGUoJy8nKVxuICAuZ2V0KGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIHJlcy5qc29uKHttZXNzYWdlOiAnR2V0IGFsbCBmb3IgdXNlcid9KTtcbiAgICByZXMuZW5kKCk7XG4gIH0pXG4gIC5wb3N0KGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIHJlcy5qc29uKHttZXNzYWdlOiAnQ3JlYXRlIG5ldyBmb3IgdXNlcid9KTtcbiAgICByZXMuZW5kKCk7XG4gIH0pXG47XG5cbnJvdXRlci5yb3V0ZSgnLzpmbG93SWQnKVxuICAuZ2V0KGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIHJlcy5qc29uKHttZXNzYWdlOiAnR2V0IGNlcnRhaW4gZmxvdyd9KTtcbiAgICByZXMuZW5kKCk7XG4gIH0pXG4gIC5kZWxldGUoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLmpzb24oe21lc3NhZ2U6ICdkZWxldGUgY29tcGxldGUgZmxvdyd9KTtcbiAgICByZXMuZW5kKClcbiAgfSlcbiAgLnB1dChmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuanNvbih7bWVzc2FnZTogJ3VwZGF0ZSd9KTtcbiAgICByZXMuZW5kKClcbiAgfSlcbjtcblxucm91dGVyLnJvdXRlKCcvOmZsb3dJZC9zdGVwJylcbiAgLnBvc3QoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLmpzb24oe21lc3NhZ2U6ICdBZGQgc3RlcCB0byBmbG93J30pO1xuICAgIHJlcy5lbmQoKTtcbiAgfSlcbiAgLnBvc3QoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLmpzb24oe21lc3NhZ2U6ICdSZW1vdmUgc3RlcCB0byBmbG93J30pO1xuICAgIHJlcy5lbmQoKTtcbiAgfSlcbjtcblxucm91dGVyLnJvdXRlKCcvOmZsb3dJZC9jb25jZXB0Lzpjb25jZXB0JylcbiAgLnBvc3QoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVzLmpzb24oe21lc3NhZ2U6ICdMaW5rIGNvbmNlcHQgdG8gZmxvdyd9KTtcbiAgICByZXMuZW5kKCk7XG4gIH0pXG47XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==