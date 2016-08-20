"use strict";
import * as winston from "winston";

var logger = new winston.Logger({

  transports: [
    new (winston.transports.Console)({
      level: 'info',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    })
  ],
  levels: {
    fatal: 5,
    error: 4,
    info: 3,
    warn: 2,
    debug: 1,
    trace: 0
  }, colors: {
    fatal: 'blue',
    error: 'red',
    info: 'green',
    warn: 'yellow',
    debug: 'grey',
    trace: 'white'
  }
});

export {logger};