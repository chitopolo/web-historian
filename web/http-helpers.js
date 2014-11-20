var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var queryString = require('queryString');
// var _ = require('underscore');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, filePath, contentType){
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  fs.exists(filePath, function(exists) {
      if (exists) {
          fs.readFile(filePath, function(error, content) {
              if (error) {
                  res.writeHead(500);
                  res.end();
              }
              else {
                console.log(contentType);
                console.log(filePath);
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.write(content);
                  res.end();
              }
          });
      }
  });
}


var sites = [];

var extend = function(obj) {
   // if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

var actions = {
  'GET': function(request, response){
    // sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
    collectData(request, function(site) {
      archive.addUrlToList(site);
      var path = site.split("=");
      var urlName = path[path.length - 1];
      if(archive.isUrlInList(urlName)) {
        //need to check if urlName is in file somehow!!!!!!!!!!!!!!!!!!!!!
        sendResponse(response, urlName, 302, true);
      } else {
        sendResponse(response, urlName, 302, false);
      }
    });
  },

  'OPTIONS': function(request, response){
    sendResponse(response);

  }
}

exports.doAction = function(request, response) {

  var action = actions[request.method]
  if(action){
    action(request, response);
  }else{
    sendResponse(response, "not Found", 404)
  };
}

var sendResponse = function(response, data, statusCode, toArchive){
    statusCode = statusCode || 200;
    if(toArchive) {
      response.writeHead(statusCode, extend(headers, {'Location': '/loading.html'}));
    }
    else {
      response.writeHead(statusCode, extend(headers, {'Location': '/'}));
    }
    response.end();
  }

var collectData = function(request, callback){
   var data = "";
   request.on('data', function(chunk){
    data+= chunk;
  });

   request.on('end', function(){
    callback(JSON.parse(JSON.stringify(data)));
  });
};
