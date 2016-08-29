"use strict";

var express = require('express');
var logger_1 = require("./logger");
var BASE = '/api';
var DefaultServer = function () {
    function DefaultServer(config) {
        this.app = express();
        require('./config/express')(this.app);
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
        //noinspection TypeScriptValidateTypes
        app.listen(config.port, config.host, function () {
            return logger_1.logger.info("Express server listening on " + JSON.stringify(config) + " mode: " + app.get('env'));
        });
        return this;
    };
    return DefaultServer;
}();
exports.DefaultServer = DefaultServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9ub2RlLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFPLFVBQU8sUUFBVyxTQUFYLENBQWQ7QUFDQSxJQUFBLFdBQUEsUUFBcUIsVUFBckIsQ0FBQTtBQUdBLElBQU0sT0FBTSxNQUFaO0FBWUEsSUFBQSxnQkFBQSxZQUFBO0FBY0UsYUFBQSxhQUFBLENBQVksTUFBWixFQUFpQztBQUMvQixhQUFLLEdBQUwsR0FBVyxTQUFYO0FBQ0EsZ0JBQVEsa0JBQVIsRUFBNEIsS0FBSyxHQUFqQztBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRDtBQWJEOzs7OztBQUtjLGtCQUFBLFNBQUEsR0FBZCxVQUF3QixNQUF4QixFQUE2QztBQUMzQyxlQUFPLElBQUksYUFBSixDQUFrQixNQUFsQixDQUFQO0FBQ0QsS0FGYTtBQVVkLGtCQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQUEsVUFBZSxJQUFmLEVBQTZCLE1BQTdCLEVBQW1EO0FBQ2pELGlCQUFBLE1BQUEsQ0FBTyxJQUFQLENBQVksaUNBQStCLElBQTNDO0FBQ0E7QUFDQSxhQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsSUFBYixFQUFtQixNQUFuQjtBQUNBLGVBQU8sSUFBUDtBQUNELEtBTEQ7QUFPQTs7O0FBR0Esa0JBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxZQUFBO0FBQ0UsWUFBSSxTQUFTLEtBQUssTUFBbEI7QUFDQSxZQUFJLE1BQU0sS0FBSyxHQUFmO0FBRUE7QUFDQSxZQUFJLE1BQUosQ0FDRSxPQUFPLElBRFQsRUFFRSxPQUFPLElBRlQsRUFHRSxZQUFBO0FBQU0sbUJBQUEsU0FBQSxNQUFBLENBQU8sSUFBUCxDQUFZLGlDQUErQixLQUFLLFNBQUwsQ0FBZSxNQUFmLENBQS9CLEdBQXFELFNBQXJELEdBQStELElBQUksR0FBSixDQUFRLEtBQVIsQ0FBM0UsQ0FBQTtBQUE0RixTQUhwRztBQUlBLGVBQU8sSUFBUDtBQUNELEtBVkQ7QUFXRixXQUFBLGFBQUE7QUF6Q0EsQ0FBQSxFQUFBO0FBQWEsUUFBQSxhQUFBLEdBQWEsYUFBYiIsImZpbGUiOiJzZXJ2ZXIvbm9kZS1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuaW1wb3J0IHtsb2dnZXJ9IGZyb20gXCIuL2xvZ2dlclwiXG5pbXBvcnQgY29uY2F0ID0gcmVxdWlyZShcImNvcmUtanMvZm4vYXJyYXkvY29uY2F0XCIpO1xuXG5jb25zdCBCQVNFPSAnL2FwaSdcblxuZXhwb3J0IGludGVyZmFjZSBJU2VydmVyQ29uZmlnIHtcbiAgaG9zdDogc3RyaW5nO1xuICBwb3J0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vZGVTZXJ2ZXIge1xuICBsaXN0ZW4oKTogSU5vZGVTZXJ2ZXI7XG4gIHJlZ2lzdGVyUm91dGVyKGJhc2U6IHN0cmluZywgcm91dGVyOiBleHByZXNzLlJvdXRlcik6IElOb2RlU2VydmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNlcnZlciBpbXBsZW1lbnRzIElOb2RlU2VydmVye1xuXG4gIHByaXZhdGUgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICBwcml2YXRlIGNvbmZpZzogSVNlcnZlckNvbmZpZztcblxuICAvKipcbiAgICogbmV3IGluc3RhbmNlXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHJldHVybnMge0RlZmF1bHRTZXJ2ZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGJvb3RzdHJhcChjb25maWc6IElTZXJ2ZXJDb25maWcpOiBEZWZhdWx0U2VydmVyIHtcbiAgICByZXR1cm4gbmV3IERlZmF1bHRTZXJ2ZXIoY29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVNlcnZlckNvbmZpZykge1xuICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuICAgIHJlcXVpcmUoJy4vY29uZmlnL2V4cHJlc3MnKSh0aGlzLmFwcCk7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICByZWdpc3RlclJvdXRlcihiYXNlOiBzdHJpbmcsIHJvdXRlcjogZXhwcmVzcy5Sb3V0ZXIpOiBJTm9kZVNlcnZlcntcbiAgICBsb2dnZXIuaW5mbyhgUmVnaXN0ZXJpbmcgcm91dGVyIG9uIGJhc2U6ICR7YmFzZX1gKTtcbiAgICAvL25vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVUeXBlc1xuICAgIHRoaXMuYXBwLnVzZShiYXNlLCByb3V0ZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0cyB0aGUgc2VydmVyXG4gICAqL1xuICBsaXN0ZW4gKCl7XG4gICAgbGV0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIGxldCBhcHAgPSB0aGlzLmFwcDtcblxuICAgIC8vbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZVR5cGVzXG4gICAgYXBwLmxpc3RlbihcbiAgICAgIGNvbmZpZy5wb3J0LFxuICAgICAgY29uZmlnLmhvc3QsXG4gICAgICAoKSA9PiBsb2dnZXIuaW5mbyhgRXhwcmVzcyBzZXJ2ZXIgbGlzdGVuaW5nIG9uICR7SlNPTi5zdHJpbmdpZnkoY29uZmlnKX0gbW9kZTogJHthcHAuZ2V0KCdlbnYnKX1gKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
