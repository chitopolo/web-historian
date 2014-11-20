var path = require('path');
var httpReq = require("http-request");
var archive = require('../helpers/archive-helpers');
var httpHelper = require('http-helpers.js');
var fs = require('fs');
var queryString = require('queryString');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  //

  var requiredPath = req.url;
  console.log('the request url is: ' + req.url);
  if (requiredPath === '/'){
    requiredPath = '/public/index.html';
  } else {
    requiredPath = '/public' + requiredPath;
  }
  var filePath = __dirname+requiredPath;
  var extname = filePath.split('.').pop();

  // console.log('this is the extArray: '+ extArray);
  // var extname = extArray[extArray.length-1];
  var contentType = 'text/html';

  switch (extname) {
      case 'js':
          contentType = 'text/javascript';
          break;
      case 'css':
          // filePath += '/public/style.css';
          contentType = 'text/css';
          break;
  }

  httpHelper.serveAssets(res,filePath, contentType);

  var reqBody = {
    param1: 'value1',
    param2: 'value2'
  };

  // this serialization also does URL encoding so you won't have to
  reqBody = queryString.stringify(reqBody);

  httpReq.post({
    url: 'http://127.0.0.1:3000',
    reqBody: new Buffer(reqBody),
    headers: {
      // specify how to handle the request, http-request makes no assumptions
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }, 'post.bin', function (err, res) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(res.code, res.headers, res.file);
  });


    // httpReq.post({
    //   url: 'http://127.0.0.1:3000',
    //   reqBody: form
    //   }, function (err, res) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   console.log(res.code, res.headers, res.buffer.toString());
    // });



};
