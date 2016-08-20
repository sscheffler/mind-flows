"use strict";

var express = require('express');
var logger_1 = require("./logger");
var BASE = '/api';
var DefaultServer = function () {
    function DefaultServer(config) {
        this.app = express();
        this.config = config;
    }
    /**
     * new instance
     * @param config
     * @returns {DefaultServer}
     */
    DefaultServer.bootstrap = function (config) {
        return new DefaultServer(config);
    };
    DefaultServer.prototype.registerRouter = function (base, router) {
        logger_1.logger.info("Registering router on base: " + base);
        //noinspection TypeScriptValidateTypes
        this.app.use(base, router);
        return this;
    };
    /**
     * starts the server
     */
    DefaultServer.prototype.listen = function () {
        var config = this.config;
        var app = this.app;
        app.get('/api', function (req, res) {
            res.write('Two APIs are provided: "/api/insertMessage" and "/api/render"' + "\n" + 'When "/api/insertMessage" is called, messages will be written to database' + "\n" + 'When "/api/render" is called, the inserted message will be shown');
            res.end();
        });
        //noinspection TypeScriptValidateTypes
        app.listen(config.port, config.host, function () {
            return logger_1.logger.info("Express server listening on " + JSON.stringify(config) + " mode: " + app.get('env'));
        });
        return this;
    };
    return DefaultServer;
}();
exports.DefaultServer = DefaultServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9ub2RlLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFPLFVBQU8sUUFBVyxTQUFYLENBQWQ7QUFDQSxJQUFBLFdBQUEsUUFBcUIsVUFBckIsQ0FBQTtBQUdBLElBQU0sT0FBTSxNQUFaO0FBWUEsSUFBQSxnQkFBQSxZQUFBO0FBY0UsYUFBQSxhQUFBLENBQVksTUFBWixFQUFpQztBQUMvQixhQUFLLEdBQUwsR0FBVyxTQUFYO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNEO0FBWkQ7Ozs7O0FBS2Msa0JBQUEsU0FBQSxHQUFkLFVBQXdCLE1BQXhCLEVBQTZDO0FBQzNDLGVBQU8sSUFBSSxhQUFKLENBQWtCLE1BQWxCLENBQVA7QUFDRCxLQUZhO0FBU2Qsa0JBQUEsU0FBQSxDQUFBLGNBQUEsR0FBQSxVQUFlLElBQWYsRUFBNkIsTUFBN0IsRUFBbUQ7QUFDakQsaUJBQUEsTUFBQSxDQUFPLElBQVAsQ0FBWSxpQ0FBK0IsSUFBM0M7QUFDQTtBQUNBLGFBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLE1BQW5CO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsS0FMRDtBQU9BOzs7QUFHQSxrQkFBQSxTQUFBLENBQUEsTUFBQSxHQUFBLFlBQUE7QUFDRSxZQUFJLFNBQVMsS0FBSyxNQUFsQjtBQUNBLFlBQUksTUFBTSxLQUFLLEdBQWY7QUFFQSxZQUFJLEdBQUosQ0FBUSxNQUFSLEVBQWdCLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBa0I7QUFDaEMsZ0JBQUksS0FBSixDQUFVLGtFQUFrRSxJQUFsRSxHQUNOLDJFQURNLEdBQ3dFLElBRHhFLEdBRU4sa0VBRko7QUFHQSxnQkFBSSxHQUFKO0FBQ0QsU0FMRDtBQU9BO0FBQ0EsWUFBSSxNQUFKLENBQ0UsT0FBTyxJQURULEVBRUUsT0FBTyxJQUZULEVBR0UsWUFBQTtBQUFNLG1CQUFBLFNBQUEsTUFBQSxDQUFPLElBQVAsQ0FBWSxpQ0FBK0IsS0FBSyxTQUFMLENBQWUsTUFBZixDQUEvQixHQUFxRCxTQUFyRCxHQUErRCxJQUFJLEdBQUosQ0FBUSxLQUFSLENBQTNFLENBQUE7QUFBNEYsU0FIcEc7QUFJQSxlQUFPLElBQVA7QUFDRCxLQWpCRDtBQWtCRixXQUFBLGFBQUE7QUEvQ0EsQ0FBQSxFQUFBO0FBQWEsUUFBQSxhQUFBLEdBQWEsYUFBYiIsImZpbGUiOiJzZXJ2ZXIvbm9kZS1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuL2xvZ2dlclwiXG5pbXBvcnQgY29uY2F0ID0gcmVxdWlyZShcImNvcmUtanMvZm4vYXJyYXkvY29uY2F0XCIpO1xuXG5jb25zdCBCQVNFPSAnL2FwaSdcblxuZXhwb3J0IGludGVyZmFjZSBJU2VydmVyQ29uZmlnIHtcbiAgaG9zdDogc3RyaW5nO1xuICBwb3J0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vZGVTZXJ2ZXIge1xuICBsaXN0ZW4oKTogSU5vZGVTZXJ2ZXI7XG4gIHJlZ2lzdGVyUm91dGVyKGJhc2U6IHN0cmluZywgcm91dGVyOiBleHByZXNzLlJvdXRlcik6IElOb2RlU2VydmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNlcnZlciBpbXBsZW1lbnRzIElOb2RlU2VydmVye1xuXG4gIHByaXZhdGUgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICBwcml2YXRlIGNvbmZpZzogSVNlcnZlckNvbmZpZztcblxuICAvKipcbiAgICogbmV3IGluc3RhbmNlXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHJldHVybnMge0RlZmF1bHRTZXJ2ZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGJvb3RzdHJhcChjb25maWc6IElTZXJ2ZXJDb25maWcpOiBEZWZhdWx0U2VydmVyIHtcbiAgICByZXR1cm4gbmV3IERlZmF1bHRTZXJ2ZXIoY29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVNlcnZlckNvbmZpZykge1xuICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgcmVnaXN0ZXJSb3V0ZXIoYmFzZTogc3RyaW5nLCByb3V0ZXI6IGV4cHJlc3MuUm91dGVyKTogSU5vZGVTZXJ2ZXJ7XG4gICAgbG9nZ2VyLmluZm8oYFJlZ2lzdGVyaW5nIHJvdXRlciBvbiBiYXNlOiAke2Jhc2V9YCk7XG4gICAgLy9ub2luc3BlY3Rpb24gVHlwZVNjcmlwdFZhbGlkYXRlVHlwZXNcbiAgICB0aGlzLmFwcC51c2UoYmFzZSwgcm91dGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydHMgdGhlIHNlcnZlclxuICAgKi9cbiAgbGlzdGVuICgpe1xuICAgIGxldCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBsZXQgYXBwID0gdGhpcy5hcHA7XG5cbiAgICBhcHAuZ2V0KCcvYXBpJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICByZXMud3JpdGUoJ1R3byBBUElzIGFyZSBwcm92aWRlZDogXCIvYXBpL2luc2VydE1lc3NhZ2VcIiBhbmQgXCIvYXBpL3JlbmRlclwiJyArIFwiXFxuXCJcbiAgICAgICAgKyAnV2hlbiBcIi9hcGkvaW5zZXJ0TWVzc2FnZVwiIGlzIGNhbGxlZCwgbWVzc2FnZXMgd2lsbCBiZSB3cml0dGVuIHRvIGRhdGFiYXNlJyArIFwiXFxuXCJcbiAgICAgICAgKyAnV2hlbiBcIi9hcGkvcmVuZGVyXCIgaXMgY2FsbGVkLCB0aGUgaW5zZXJ0ZWQgbWVzc2FnZSB3aWxsIGJlIHNob3duJyk7XG4gICAgICByZXMuZW5kKCk7XG4gICAgfSk7XG5cbiAgICAvL25vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVUeXBlc1xuICAgIGFwcC5saXN0ZW4oXG4gICAgICBjb25maWcucG9ydCxcbiAgICAgIGNvbmZpZy5ob3N0LFxuICAgICAgKCkgPT4gbG9nZ2VyLmluZm8oYEV4cHJlc3Mgc2VydmVyIGxpc3RlbmluZyBvbiAke0pTT04uc3RyaW5naWZ5KGNvbmZpZyl9IG1vZGU6ICR7YXBwLmdldCgnZW52Jyl9YCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
