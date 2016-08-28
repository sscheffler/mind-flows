"use strict";

var express = require('express');
var body_parser_1 = require("body-parser");
var mind_flow_controller_1 = require("./mind-flow-controller");
//noinspection TypeScriptValidateTypes
var router = express.Router().use(body_parser_1.json());
router.route('/').get(function (req, res) {
    return mind_flow_controller_1.MindFlowController.findAll(req, res);
}).post(function (req, res) {
    return mind_flow_controller_1.MindFlowController.create(req, res);
});
router.route('/:flowId').get(function (req, res) {
    return mind_flow_controller_1.MindFlowController.findFlow(req, res);
}).delete(function (req, res) {
    return mind_flow_controller_1.MindFlowController.deleteFlow(req, res);
}).put(function (req, res) {
    return mind_flow_controller_1.MindFlowController.updateFlow(req, res);
});
router.route('/:flowId/step').post(function (req, res) {
    return mind_flow_controller_1.MindFlowController.addStep(req, res);
}).delete(function (req, res) {
    return mind_flow_controller_1.MindFlowController.deleteStep(req, res);
});
router.route('/:flowId/concept/:concept').post(function (req, res) {
    res.json({ message: 'Link concept to flow' });
    res.end();
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hcGkvbWluZC1mbG93L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQU8sVUFBTyxRQUFXLFNBQVgsQ0FBZDtBQUNBLElBQUEsZ0JBQUEsUUFBbUIsYUFBbkIsQ0FBQTtBQUNBLElBQUEseUJBQUEsUUFBaUMsd0JBQWpDLENBQUE7QUFFQTtBQUNBLElBQUksU0FBUyxRQUFRLE1BQVIsR0FDVixHQURVLENBQ04sY0FBQSxJQUFBLEVBRE0sQ0FBYjtBQUdBLE9BQU8sS0FBUCxDQUFhLEdBQWIsRUFDRyxHQURILENBQ1EsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFTO0FBQUssV0FBQSx1QkFBQSxrQkFBQSxDQUFtQixPQUFuQixDQUEyQixHQUEzQixFQUFnQyxHQUFoQyxDQUFBO0FBQW9DLENBRDFELEVBRUcsSUFGSCxDQUVTLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBUztBQUFLLFdBQUEsdUJBQUEsa0JBQUEsQ0FBbUIsTUFBbkIsQ0FBMEIsR0FBMUIsRUFBK0IsR0FBL0IsQ0FBQTtBQUFtQyxDQUYxRDtBQUtBLE9BQU8sS0FBUCxDQUFhLFVBQWIsRUFDRyxHQURILENBQ1EsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFTO0FBQUssV0FBQSx1QkFBQSxrQkFBQSxDQUFtQixRQUFuQixDQUE0QixHQUE1QixFQUFpQyxHQUFqQyxDQUFBO0FBQXFDLENBRDNELEVBRUcsTUFGSCxDQUVXLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBUztBQUFLLFdBQUEsdUJBQUEsa0JBQUEsQ0FBbUIsVUFBbkIsQ0FBOEIsR0FBOUIsRUFBbUMsR0FBbkMsQ0FBQTtBQUF1QyxDQUZoRSxFQUdHLEdBSEgsQ0FHUSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLHVCQUFBLGtCQUFBLENBQW1CLFVBQW5CLENBQThCLEdBQTlCLEVBQW1DLEdBQW5DLENBQUE7QUFBdUMsQ0FIN0Q7QUFNQSxPQUFPLEtBQVAsQ0FBYSxlQUFiLEVBQ0csSUFESCxDQUNTLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBUztBQUFLLFdBQUEsdUJBQUEsa0JBQUEsQ0FBbUIsT0FBbkIsQ0FBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FBQTtBQUFvQyxDQUQzRCxFQUVHLE1BRkgsQ0FFVyxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVM7QUFBSyxXQUFBLHVCQUFBLGtCQUFBLENBQW1CLFVBQW5CLENBQThCLEdBQTlCLEVBQW1DLEdBQW5DLENBQUE7QUFBdUMsQ0FGaEU7QUFLQSxPQUFPLEtBQVAsQ0FBYSwyQkFBYixFQUNHLElBREgsQ0FDUSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQWtCO0FBQ3RCLFFBQUksSUFBSixDQUFTLEVBQUMsU0FBUyxzQkFBVixFQUFUO0FBQ0EsUUFBSSxHQUFKO0FBQ0QsQ0FKSDtBQU9BLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJzZXJ2ZXIvYXBpL21pbmQtZmxvdy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQge2pzb259IGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0IHtNaW5kRmxvd0NvbnRyb2xsZXJ9IGZyb20gXCIuL21pbmQtZmxvdy1jb250cm9sbGVyXCJcblxuLy9ub2luc3BlY3Rpb24gVHlwZVNjcmlwdFZhbGlkYXRlVHlwZXNcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG4gIC51c2UoanNvbigpKTtcblxucm91dGVyLnJvdXRlKCcvJylcbiAgLmdldCggKHJlcSwgcmVzKSA9PiBNaW5kRmxvd0NvbnRyb2xsZXIuZmluZEFsbChyZXEsIHJlcykgKVxuICAucG9zdCggKHJlcSwgcmVzKSA9PiBNaW5kRmxvd0NvbnRyb2xsZXIuY3JlYXRlKHJlcSwgcmVzKSApXG47XG5cbnJvdXRlci5yb3V0ZSgnLzpmbG93SWQnKVxuICAuZ2V0KCAocmVxLCByZXMpID0+IE1pbmRGbG93Q29udHJvbGxlci5maW5kRmxvdyhyZXEsIHJlcykgKVxuICAuZGVsZXRlKCAocmVxLCByZXMpID0+IE1pbmRGbG93Q29udHJvbGxlci5kZWxldGVGbG93KHJlcSwgcmVzKSApXG4gIC5wdXQoIChyZXEsIHJlcykgPT4gTWluZEZsb3dDb250cm9sbGVyLnVwZGF0ZUZsb3cocmVxLCByZXMpIClcbjtcblxucm91dGVyLnJvdXRlKCcvOmZsb3dJZC9zdGVwJylcbiAgLnBvc3QoIChyZXEsIHJlcykgPT4gTWluZEZsb3dDb250cm9sbGVyLmFkZFN0ZXAocmVxLCByZXMpIClcbiAgLmRlbGV0ZSggKHJlcSwgcmVzKSA9PiBNaW5kRmxvd0NvbnRyb2xsZXIuZGVsZXRlU3RlcChyZXEsIHJlcykgKVxuO1xuXG5yb3V0ZXIucm91dGUoJy86Zmxvd0lkL2NvbmNlcHQvOmNvbmNlcHQnKVxuICAucG9zdChmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuanNvbih7bWVzc2FnZTogJ0xpbmsgY29uY2VwdCB0byBmbG93J30pO1xuICAgIHJlcy5lbmQoKTtcbiAgfSlcbjtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
