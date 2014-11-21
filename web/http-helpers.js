var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var queryString = require('queryString');
var url = require('url')
// var _ = require('underscore');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, filePath, contentType){
  fs.readFile(filePath, function(error, content) {
    if (error) {
      // console.log("there was an error rendering");
      res.writeHead(500);
      res.end();
    }
    else {
      // console.log("there was an NO error rendering");

      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
    }
  });
}


var sites = [];

var extend = function(obj) {
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
      if(archive.isURLArchived(archive.paths.archivedSites + request.url)) {
        console.log('it got in ' + archive.paths.archivedSites  + request.url);
          exports.serveAssets(response, (archive.paths.archivedSites + request.url), {'Content-Type': 'text/html'});
      }
  },
  'POST': function(request, response){
    collectData(request, function(site) {
      archive.addUrlToList(site);
      var path = site.split("=");
      var urlName = path[path.length - 1];

      // console.log(request.url + ' nikkhel ' +urlName);
      // url.resolve(request.url, '/'+urlName);

      if(archive.isUrlInList(urlName)) {
        if(archive.isURLArchived(archive.paths.archivedSites + '/' + urlName)) {
          // console.log(response );
          exports.serveAssets(response, (archive.paths.archivedSites + '/' + urlName), {'Content-Type': 'text/html'});
        } else {
          archive.downloadUrls(urlName);
          sendResponse(response, urlName, 302, true);
        }
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
