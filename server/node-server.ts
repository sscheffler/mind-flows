"use strict";
import express = require('express');
import {logger} from "./logger"
import concat = require("core-js/fn/array/concat");

const BASE= '/api'

export interface IServerConfig {
  host: string;
  port: number;
}

export interface INodeServer {
  listen(): INodeServer;
  registerRouter(base: string, router: express.Router): INodeServer;
}

export class DefaultServer implements INodeServer{

  private app: express.Application;
  private config: IServerConfig;

  /**
   * new instance
   * @param config
   * @returns {DefaultServer}
   */
  public static bootstrap(config: IServerConfig): DefaultServer {
    return new DefaultServer(config);
  }

  constructor(config: IServerConfig) {
    this.app = express();
    this.config = config;
  }

  registerRouter(base: string, router: express.Router): INodeServer{
    logger.info(`Registering router on base: ${base}`);
    //noinspection TypeScriptValidateTypes
    this.app.use(base, router);
    return this;
  }

  /**
   * starts the server
   */
  listen (){
    let config = this.config;
    let app = this.app;

    app.get('/api', function (req, res) {
      res.write('Two APIs are provided: "/api/insertMessage" and "/api/render"' + "\n"
        + 'When "/api/insertMessage" is called, messages will be written to database' + "\n"
        + 'When "/api/render" is called, the inserted message will be shown');
      res.end();
    });

    //noinspection TypeScriptValidateTypes
    app.listen(
      config.port,
      config.host,
      () => logger.info(`Express server listening on ${JSON.stringify(config)} mode: ${app.get('env')}`));
    return this;
  }
}
