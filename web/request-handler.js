var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var requiredPath = req.url;
  console.log('the request url is: ' + req.url);
  if (requiredPath === '/'){
    requiredPath = '/public/index.html';
  } else {
    requiredPath = '/public' + requiredPath;
  }
  var filePath = __dirname+requiredPath;
  var extname = filePath.split('.').pop();

  var contentType;

  switch (extname) {
      case 'html':
          contentType = 'text/html';
          break;
      case 'js':
          contentType = 'text/javascript';
          break;
      case 'css':
          // filePath += '/public/style.css';
          contentType = 'text/css';
          break;
  }

  httpHelper.serveAssets(res,filePath, contentType);
  httpHelper.doAction(req, res);
};
