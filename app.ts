/// <reference path="typings/index.d.ts" />
"use strict";
import {DefaultServer, IServerConfig} from "./server/node-server";
import {logger} from "./server/logger";
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
let config: IServerConfig = appEnv && {port: appEnv.port, host: '0.0.0.0'};

if(config){
  DefaultServer.bootstrap(config)
    .registerRouter('/api/', require('./server/api/'))
    .registerRouter('/api/admin/', require('./server/api/admin/'))
    .registerRouter('/api/user/', require('./server/api/user'))
    .registerRouter('/api/mindflow/', require('./server/api/mind-flow'))
    .registerRouter('/api/concept/', require('./server/api/concept'))
  .listen();
} else {
  logger.error("Config could not be built. No server was started!")
}


