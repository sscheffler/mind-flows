'use strict';
import express = require('express');
import {json} from 'body-parser';


//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get(function (req, res) {
    res.json({message: 'Will show the endpoints'});
    res.end();
  });

module.exports = router;