var http = require("http");
var httpReq = require("http-request");
var handler = require("./request-handler");
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
