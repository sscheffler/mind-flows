"use strict";
import express = require('express');
import {json} from 'body-parser';


//noinspection TypeScriptValidateTypes
var router = express.Router()
  .use(json());

router.route('/')
  .get(function (req, res) {
    res.json({message: 'Return administrator'});
    res.end();
  });

router.route('/deactivate/:userId/:deactivate')
  .put(function (req, res) {
    res.json({message: 'Will activate / deactivate user'});
    res.end();
  });

module.exports = router;