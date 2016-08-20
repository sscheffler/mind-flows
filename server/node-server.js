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
        //noinspection TypeScriptValidateTypes
        app.listen(config.port, config.host, function () {
            return logger_1.logger.info("Express server listening on " + JSON.stringify(config) + " mode: " + app.get('env'));
        });
        return this;
    };
    return DefaultServer;
}();
exports.DefaultServer = DefaultServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9ub2RlLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFPLFVBQU8sUUFBVyxTQUFYLENBQWQ7QUFDQSxJQUFBLFdBQUEsUUFBcUIsVUFBckIsQ0FBQTtBQUdBLElBQU0sT0FBTSxNQUFaO0FBWUEsSUFBQSxnQkFBQSxZQUFBO0FBY0UsYUFBQSxhQUFBLENBQVksTUFBWixFQUFpQztBQUMvQixhQUFLLEdBQUwsR0FBVyxTQUFYO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNEO0FBWkQ7Ozs7O0FBS2Msa0JBQUEsU0FBQSxHQUFkLFVBQXdCLE1BQXhCLEVBQTZDO0FBQzNDLGVBQU8sSUFBSSxhQUFKLENBQWtCLE1BQWxCLENBQVA7QUFDRCxLQUZhO0FBU2Qsa0JBQUEsU0FBQSxDQUFBLGNBQUEsR0FBQSxVQUFlLElBQWYsRUFBNkIsTUFBN0IsRUFBbUQ7QUFDakQsaUJBQUEsTUFBQSxDQUFPLElBQVAsQ0FBWSxpQ0FBK0IsSUFBM0M7QUFDQTtBQUNBLGFBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLE1BQW5CO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsS0FMRDtBQU9BOzs7QUFHQSxrQkFBQSxTQUFBLENBQUEsTUFBQSxHQUFBLFlBQUE7QUFDRSxZQUFJLFNBQVMsS0FBSyxNQUFsQjtBQUNBLFlBQUksTUFBTSxLQUFLLEdBQWY7QUFFQTtBQUNBLFlBQUksTUFBSixDQUNFLE9BQU8sSUFEVCxFQUVFLE9BQU8sSUFGVCxFQUdFLFlBQUE7QUFBTSxtQkFBQSxTQUFBLE1BQUEsQ0FBTyxJQUFQLENBQVksaUNBQStCLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBL0IsR0FBcUQsU0FBckQsR0FBK0QsSUFBSSxHQUFKLENBQVEsS0FBUixDQUEzRSxDQUFBO0FBQTRGLFNBSHBHO0FBSUEsZUFBTyxJQUFQO0FBQ0QsS0FWRDtBQVdGLFdBQUEsYUFBQTtBQXhDQSxDQUFBLEVBQUE7QUFBYSxRQUFBLGFBQUEsR0FBYSxhQUFiIiwiZmlsZSI6InNlcnZlci9ub2RlLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQge2xvZ2dlcn0gZnJvbSBcIi4vbG9nZ2VyXCJcbmltcG9ydCBjb25jYXQgPSByZXF1aXJlKFwiY29yZS1qcy9mbi9hcnJheS9jb25jYXRcIik7XG5cbmNvbnN0IEJBU0U9ICcvYXBpJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJ2ZXJDb25maWcge1xuICBob3N0OiBzdHJpbmc7XG4gIHBvcnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTm9kZVNlcnZlciB7XG4gIGxpc3RlbigpOiBJTm9kZVNlcnZlcjtcbiAgcmVnaXN0ZXJSb3V0ZXIoYmFzZTogc3RyaW5nLCByb3V0ZXI6IGV4cHJlc3MuUm91dGVyKTogSU5vZGVTZXJ2ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2VydmVyIGltcGxlbWVudHMgSU5vZGVTZXJ2ZXJ7XG5cbiAgcHJpdmF0ZSBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHByaXZhdGUgY29uZmlnOiBJU2VydmVyQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBuZXcgaW5zdGFuY2VcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcnZlcn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYm9vdHN0cmFwKGNvbmZpZzogSVNlcnZlckNvbmZpZyk6IERlZmF1bHRTZXJ2ZXIge1xuICAgIHJldHVybiBuZXcgRGVmYXVsdFNlcnZlcihjb25maWcpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJU2VydmVyQ29uZmlnKSB7XG4gICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICByZWdpc3RlclJvdXRlcihiYXNlOiBzdHJpbmcsIHJvdXRlcjogZXhwcmVzcy5Sb3V0ZXIpOiBJTm9kZVNlcnZlcntcbiAgICBsb2dnZXIuaW5mbyhgUmVnaXN0ZXJpbmcgcm91dGVyIG9uIGJhc2U6ICR7YmFzZX1gKTtcbiAgICAvL25vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVUeXBlc1xuICAgIHRoaXMuYXBwLnVzZShiYXNlLCByb3V0ZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0cyB0aGUgc2VydmVyXG4gICAqL1xuICBsaXN0ZW4gKCl7XG4gICAgbGV0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIGxldCBhcHAgPSB0aGlzLmFwcDtcblxuICAgIC8vbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZVR5cGVzXG4gICAgYXBwLmxpc3RlbihcbiAgICAgIGNvbmZpZy5wb3J0LFxuICAgICAgY29uZmlnLmhvc3QsXG4gICAgICAoKSA9PiBsb2dnZXIuaW5mbyhgRXhwcmVzcyBzZXJ2ZXIgbGlzdGVuaW5nIG9uICR7SlNPTi5zdHJpbmdpZnkoY29uZmlnKX0gbW9kZTogJHthcHAuZ2V0KCdlbnYnKX1gKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
