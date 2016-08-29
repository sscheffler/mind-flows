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
    require('./config/express')(this.app);
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

    //noinspection TypeScriptValidateTypes
    app.listen(
      config.port,
      config.host,
      () => logger.info(`Express server listening on ${JSON.stringify(config)} mode: ${app.get('env')}`));
    return this;
  }
}
