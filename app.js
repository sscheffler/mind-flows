/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var mongo = process.env.VCAP_SERVICES;
var MongoClient = require('mongodb').MongoClient;

// create a new express server
var app = express();





app.get('/api', function (req, res) {
  res.write('Two APIs are provided: "/api/insertMessage" and "/api/render"' + "\n"
    + 'When "/api/insertMessage" is called, messages will be written to database' + "\n"
    + 'When "/api/render" is called, the inserted message will be shown');
  res.end();	
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var env = appEnv.getServices();
console.log(JSON.stringify(env));
console.log(JSON.stringify(env.mongo.credentials));
var mongo = env.mongo.credentials

console.log(JSON.stringify(mongo));

var conn_str = "";
if (mongo) {
    if (mongo.url) {
      conn_str = 'mongodb://'+mongo.uri+':'+mongo.port;
    } else {
      console.log("No mongo found");
    }  
}


var db; 
MongoClient.connect(conn_str, function(err, database) {
  if(err) throw err;
  db = database;
  console.log('connection established');
}); 


/*app.get('/api/insertMessage', function (req, res) {
  var message = { 'message': 'Hello, Bluemix', 'ts': new Date() };
  if (db && db !== "null" && db !== "undefined") {
    db.collection('messages').insert(message, {safe:true}, function(err){
      if (err) { 
        console.log(err.stack);
        res.write('mongodb message insert failed');
        res.end(); 
      } else {
        res.write('following messages has been inserted into database' + "\n" 
        + JSON.stringify(message));
        res.end();
      }
    });    
  } else {
    res.write('No mongo found');
    res.end();
  } 
});

app.get('/api/render', function (req, res) {
  if (db && db !== "null" && db !== "undefined") {
    // list messages
    db.collection('messages').find({}, {limit:10, sort:[['_id', 'desc']]}, function(err, cursor) {
      if (err) {
        console.log(err.stack); 
        res.write('mongodb message list failed');
        res.end();
      } else {
        cursor.toArray(function(err, items) {
          if (err) {
            console.log(err.stack); 
            res.write('mongodb cursor to array failed');
            res.end();
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            for (i=0; i < items.length; i++) {
              res.write(JSON.stringify(items[i]) + "\n");
            }
            res.end();
          }
        });
      }
    });     
  } else {
    res.write('No mongo found');
    res.end();  
  }
});*/




// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
